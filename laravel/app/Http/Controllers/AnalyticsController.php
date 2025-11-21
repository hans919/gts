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
    public function dashboard()
    {
        $totalGraduates = Graduate::count();
        $totalSurveys = Survey::count();
        $activeSurveys = Survey::where('status', 'active')->count();
        $totalResponses = SurveyResponse::where('is_complete', true)->count();
        
        $employmentStats = Employment::where('is_current', true)
            ->select('employment_status', DB::raw('count(*) as count'))
            ->groupBy('employment_status')
            ->get();

        $recentGraduates = Graduate::with('currentEmployment')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'total_graduates' => $totalGraduates,
            'total_surveys' => $totalSurveys,
            'active_surveys' => $activeSurveys,
            'total_responses' => $totalResponses,
            'employment_stats' => $employmentStats,
            'recent_graduates' => $recentGraduates
        ]);
    }

    public function employmentStatus()
    {
        $data = Employment::where('is_current', true)
            ->select('employment_status', DB::raw('count(*) as count'))
            ->groupBy('employment_status')
            ->get();

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
        $data = Employment::where('is_current', true)
            ->whereNotNull('monthly_salary')
            ->select(
                DB::raw('CASE 
                    WHEN monthly_salary < 30000 THEN "Below 30k"
                    WHEN monthly_salary >= 30000 AND monthly_salary < 50000 THEN "30k-50k"
                    WHEN monthly_salary >= 50000 AND monthly_salary < 75000 THEN "50k-75k"
                    WHEN monthly_salary >= 75000 AND monthly_salary < 100000 THEN "75k-100k"
                    ELSE "Above 100k"
                END as salary_range'),
                DB::raw('count(*) as count'),
                DB::raw('AVG(monthly_salary) as average')
            )
            ->groupBy('salary_range')
            ->get();

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

    public function graduatesByYear()
    {
        $data = Graduate::select('graduation_year', DB::raw('count(*) as count'))
            ->groupBy('graduation_year')
            ->orderBy('graduation_year', 'desc')
            ->get();

        return response()->json($data);
    }
}
