<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Graduate;
use App\Models\Employment;
use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function dashboard(Request $request)
    {
        // Build base query with filters
        $graduatesQuery = Graduate::query();
        
        if ($request->has('graduation_year') && $request->graduation_year) {
            $graduatesQuery->where('graduation_year', $request->graduation_year);
        }
        
        if ($request->has('program') && $request->program) {
            $graduatesQuery->where('program', $request->program);
        }
        
        if ($request->has('major') && $request->major) {
            $graduatesQuery->where('major', 'like', '%' . $request->major . '%');
        }
        
        $graduateIds = $graduatesQuery->pluck('id');
        $totalGraduates = $graduatesQuery->count();
        
        // Count employed from both employments and employment_surveys tables
        $employedFromEmploymentsQuery = Employment::where('is_current', true)
            ->where('employment_status', 'employed')
            ->whereIn('graduate_id', $graduateIds);
            
        $employedFromSurveysQuery = DB::table('employment_surveys')
            ->where('employment_status', 'employed')
            ->whereIn('graduate_id', $graduateIds);
            
        if ($request->has('employment_status') && $request->employment_status) {
            $employedFromEmploymentsQuery->where('employment_status', $request->employment_status);
            $employedFromSurveysQuery->where('employment_status', $request->employment_status);
        }
            
        $employedFromEmployments = $employedFromEmploymentsQuery->count();
        $employedFromSurveys = $employedFromSurveysQuery->count();
        $employedCount = max($employedFromEmployments, $employedFromSurveys);
        
        // Calculate average salary from both tables
        $avgSalaryEmployments = Employment::where('is_current', true)
            ->where('employment_status', 'employed')
            ->whereIn('graduate_id', $graduateIds)
            ->whereNotNull('monthly_salary')
            ->avg('monthly_salary');
            
        $avgSalarySurveys = DB::table('employment_surveys')
            ->where('employment_status', 'employed')
            ->whereIn('graduate_id', $graduateIds)
            ->whereNotNull('monthly_salary')
            ->avg('monthly_salary');
            
        $averageSalary = $avgSalarySurveys ?: $avgSalaryEmployments ?: 0;
        
        // Survey response rate from employment_surveys
        $surveysSubmitted = DB::table('employment_surveys')->whereIn('graduate_id', $graduateIds)->count();
        $surveyResponseRate = $totalGraduates > 0 ? round(($surveysSubmitted / $totalGraduates) * 100, 1) : 0;

        // Employment stats for chart - from employment_surveys table
        $employmentStatsQuery = DB::table('employment_surveys')
            ->whereIn('graduate_id', $graduateIds)
            ->select('employment_status', DB::raw('count(*) as count'))
            ->groupBy('employment_status');
            
        if ($request->has('employment_status') && $request->employment_status) {
            $employmentStatsQuery->where('employment_status', $request->employment_status);
        }
            
        $employmentStats = $employmentStatsQuery->get();

        // If no survey data, fall back to employments table
        if ($employmentStats->isEmpty()) {
            $employmentStatsQuery = Employment::where('is_current', true)
                ->whereIn('graduate_id', $graduateIds)
                ->select('employment_status', DB::raw('count(*) as count'))
                ->groupBy('employment_status');
                
            if ($request->has('employment_status') && $request->employment_status) {
                $employmentStatsQuery->where('employment_status', $request->employment_status);
            }
                
            $employmentStats = $employmentStatsQuery->get();
        }

        // Get recent graduates with all necessary fields
        $recentGraduatesQuery = Graduate::select([
                'id',
                'first_name',
                'last_name',
                'email',
                'program',
                'graduation_year',
                'created_at'
            ]);
            
        if ($request->has('graduation_year') && $request->graduation_year) {
            $recentGraduatesQuery->where('graduation_year', $request->graduation_year);
        }
        
        if ($request->has('program') && $request->program) {
            $recentGraduatesQuery->where('program', $request->program);
        }
        
        if ($request->has('major') && $request->major) {
            $recentGraduatesQuery->where('major', 'like', '%' . $request->major . '%');
        }
            
        $recentGraduates = $recentGraduatesQuery->latest()
            ->take(5)
            ->get();

        // Count surveys
        $totalSurveys = Survey::count();
        $activeSurveys = Survey::where('status', 'active')->count();
        $totalResponses = SurveyResponse::where('is_complete', true)->count();

        return response()->json([
            'total_graduates' => $totalGraduates,
            'employed_count' => $employedCount,
            'average_salary' => round($averageSalary, 2),
            'survey_response_rate' => $surveyResponseRate,
            'employment_stats' => $employmentStats,
            'recent_graduates' => $recentGraduates,
            'total_surveys' => $totalSurveys,
            'active_surveys' => $activeSurveys,
            'total_responses' => $totalResponses,
        ]);
    }

    public function employmentStatus()
    {
        // Get data from employment_surveys table (more recent data)
        $data = DB::table('employment_surveys')
            ->select('employment_status as status', DB::raw('count(*) as count'))
            ->groupBy('employment_status')
            ->get();

        // If no survey data, fall back to employments table
        if ($data->isEmpty()) {
            $data = Employment::where('is_current', true)
                ->select('employment_status as status', DB::raw('count(*) as count'))
                ->groupBy('employment_status')
                ->get();
        }

        return response()->json($data);
    }

    public function jobRelevance()
    {
        $data = Employment::where('is_current', true)
            ->whereNotNull('job_relevance')
            ->select('job_relevance', DB::raw('count(*) as count'))
            ->groupBy('job_relevance')
            ->get();

        return response()->json($data);
    }

    public function salaryDistribution()
    {
        // Get data from employment_surveys table (more recent data)
        $data = DB::table('employment_surveys')
            ->whereNotNull('monthly_salary')
            ->where('monthly_salary', '>', 0)
            ->select(
                DB::raw('CASE 
                    WHEN monthly_salary < 30000 THEN "Below 30k"
                    WHEN monthly_salary >= 30000 AND monthly_salary < 50000 THEN "30k-50k"
                    WHEN monthly_salary >= 50000 AND monthly_salary < 75000 THEN "50k-75k"
                    WHEN monthly_salary >= 75000 AND monthly_salary < 100000 THEN "75k-100k"
                    ELSE "Above 100k"
                END as `range`'),
                DB::raw('count(*) as count'),
                DB::raw('AVG(monthly_salary) as average')
            )
            ->groupBy('range')
            ->orderByRaw('FIELD(`range`, "Below 30k", "30k-50k", "50k-75k", "75k-100k", "Above 100k")')
            ->get();

        // If no survey data, fall back to employments table
        if ($data->isEmpty()) {
            $data = Employment::where('is_current', true)
                ->whereNotNull('monthly_salary')
                ->where('monthly_salary', '>', 0)
                ->select(
                    DB::raw('CASE 
                        WHEN monthly_salary < 30000 THEN "Below 30k"
                        WHEN monthly_salary >= 30000 AND monthly_salary < 50000 THEN "30k-50k"
                        WHEN monthly_salary >= 50000 AND monthly_salary < 75000 THEN "50k-75k"
                        WHEN monthly_salary >= 75000 AND monthly_salary < 100000 THEN "75k-100k"
                        ELSE "Above 100k"
                    END as `range`'),
                    DB::raw('count(*) as count'),
                    DB::raw('AVG(monthly_salary) as average')
                )
                ->groupBy('range')
                ->orderByRaw('FIELD(`range`, "Below 30k", "30k-50k", "50k-75k", "75k-100k", "Above 100k")')
                ->get();
        }

        return response()->json($data);
    }

    public function industryDistribution()
    {
        $data = Employment::where('is_current', true)
            ->whereNotNull('industry')
            ->select('industry', DB::raw('count(*) as count'))
            ->groupBy('industry')
            ->orderByDesc('count')
            ->take(10)
            ->get();

        return response()->json($data);
    }

    public function programOutcomes()
    {
        $data = Graduate::select('program', 'degree_level')
            ->selectRaw('COUNT(*) as total_graduates')
            ->selectRaw('SUM(CASE WHEN employments.is_current = 1 AND employments.employment_status = "employed" THEN 1 ELSE 0 END) as employed_count')
            ->selectRaw('AVG(employments.monthly_salary) as avg_salary')
            ->leftJoin('employments', function($join) {
                $join->on('graduates.id', '=', 'employments.graduate_id')
                     ->where('employments.is_current', '=', 1);
            })
            ->groupBy('program', 'degree_level')
            ->get();

        return response()->json($data);
    }

    public function surveyCompletion()
    {
        $data = Survey::select('surveys.id', 'surveys.title', 'surveys.status')
            ->selectRaw('COUNT(DISTINCT survey_responses.id) as total_responses')
            ->selectRaw('SUM(CASE WHEN survey_responses.is_complete = 1 THEN 1 ELSE 0 END) as completed_responses')
            ->leftJoin('survey_responses', 'surveys.id', '=', 'survey_responses.survey_id')
            ->groupBy('surveys.id', 'surveys.title', 'surveys.status')
            ->get();

        return response()->json($data);
    }

    public function graduatesByYear(Request $request)
    {
        $query = Graduate::query();
        
        if ($request->has('graduation_year') && $request->graduation_year) {
            $query->where('graduation_year', $request->graduation_year);
        }
        
        if ($request->has('program') && $request->program) {
            $query->where('program', $request->program);
        }
        
        if ($request->has('major') && $request->major) {
            $query->where('major', 'like', '%' . $request->major . '%');
        }
        
        // Apply employment status filter if provided
        if ($request->has('employment_status') && $request->employment_status) {
            $query->whereHas('employments', function($q) use ($request) {
                $q->where('is_current', true)
                  ->where('employment_status', $request->employment_status);
            })->orWhereHas('employmentSurveys', function($q) use ($request) {
                $q->where('employment_status', $request->employment_status);
            });
        }
        
        $data = $query->select('graduation_year', DB::raw('count(*) as count'))
            ->groupBy('graduation_year')
            ->orderBy('graduation_year', 'desc')
            ->get();

        return response()->json($data);
    }
}
