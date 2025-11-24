<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Graduate;

class GraduateController extends Controller
{
    public function index(Request $request)
    {
        $query = Graduate::with(['user', 'currentEmployment']);

        // Filter by graduation year
        if ($request->has('graduation_year') && $request->graduation_year !== '') {
            $query->where('graduation_year', $request->graduation_year);
        }

        // Filter by program (department)
        if ($request->has('program') && $request->program !== '') {
            $query->where('program', $request->program);
        }

        // Filter by major
        if ($request->has('major') && $request->major !== '') {
            $query->where('major', $request->major);
        }

        // Filter by employment status - check both employments table and employment_surveys table
        if ($request->has('employment_status') && $request->employment_status !== '') {
            $query->where(function($q) use ($request) {
                // Check in employments table
                $q->whereHas('employments', function($subQ) use ($request) {
                    $subQ->where('employment_status', $request->employment_status)
                         ->where('is_current', true);
                })
                // OR check in employment_surveys table
                ->orWhereExists(function($subQ) use ($request) {
                    $subQ->select(\DB::raw(1))
                         ->from('employment_surveys')
                         ->whereColumn('employment_surveys.graduate_id', 'graduates.id')
                         ->where('employment_surveys.employment_status', $request->employment_status);
                });
            });
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%");
            });
        }

        // Get paginated results
        $graduates = $query->paginate(15);

        // Add latest employment survey data to each graduate
        $graduates->getCollection()->transform(function ($graduate) {
            $latestSurvey = \DB::table('employment_surveys')
                ->where('graduate_id', $graduate->id)
                ->orderBy('created_at', 'desc')
                ->first();
            
            $graduate->latest_employment_survey = $latestSurvey;
            return $graduate;
        });

        return response()->json($graduates);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'student_id' => 'required|string|unique:graduates',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:graduates',
            'phone' => 'nullable|string',
            'alternative_email' => 'nullable|email',
            'alternative_phone' => 'nullable|string',
            'program' => 'required|string',
            'major' => 'required|string',
            'graduation_year' => 'required|integer',
            'degree_level' => 'required|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'gpa' => 'nullable|numeric|min:0|max:4'
        ]);

        $graduate = Graduate::create($validated);

        return response()->json($graduate->load('user'), 201);
    }

    public function show(Graduate $graduate)
    {
        return response()->json($graduate->load(['user', 'employments', 'surveyResponses']));
    }

    public function update(Request $request, Graduate $graduate)
    {
        $validated = $request->validate([
            'student_id' => 'sometimes|string|unique:graduates,student_id,' . $graduate->id,
            'first_name' => 'sometimes|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:graduates,email,' . $graduate->id,
            'phone' => 'nullable|string',
            'alternative_email' => 'nullable|email',
            'alternative_phone' => 'nullable|string',
            'program' => 'sometimes|string',
            'major' => 'sometimes|string',
            'graduation_year' => 'sometimes|integer',
            'degree_level' => 'sometimes|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'gpa' => 'nullable|numeric|min:0|max:4'
        ]);

        $graduate->update($validated);

        return response()->json($graduate->load('user'));
    }

    public function destroy(Graduate $graduate)
    {
        $graduate->delete();

        return response()->json(['message' => 'Graduate deleted successfully']);
    }

    public function employments(Graduate $graduate)
    {
        return response()->json($graduate->employments);
    }

    public function surveyResponses(Graduate $graduate)
    {
        return response()->json($graduate->surveyResponses()->with('survey')->get());
    }

    public function export(Request $request)
    {
        $query = Graduate::with(['currentEmployment']);

        // Apply same filters as index method
        if ($request->has('graduation_year') && $request->graduation_year !== '') {
            $query->where('graduation_year', $request->graduation_year);
        }

        if ($request->has('program') && $request->program !== '') {
            $query->where('program', $request->program);
        }

        if ($request->has('major') && $request->major !== '') {
            $query->where('major', $request->major);
        }

        if ($request->has('employment_status') && $request->employment_status !== '') {
            $query->where(function($q) use ($request) {
                $q->whereHas('employments', function($subQ) use ($request) {
                    $subQ->where('employment_status', $request->employment_status)
                         ->where('is_current', true);
                })
                ->orWhereExists(function($subQ) use ($request) {
                    $subQ->select(\DB::raw(1))
                         ->from('employment_surveys')
                         ->whereColumn('employment_surveys.graduate_id', 'graduates.id')
                         ->where('employment_surveys.employment_status', $request->employment_status);
                });
            });
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%");
            });
        }

        // Get all filtered graduates (no pagination for export)
        $graduates = $query->get();

        // Add latest employment survey data
        $graduates->transform(function ($graduate) {
            $latestSurvey = \DB::table('employment_surveys')
                ->where('graduate_id', $graduate->id)
                ->orderBy('created_at', 'desc')
                ->first();
            
            $graduate->latest_employment_survey = $latestSurvey;
            return $graduate;
        });

        // Generate CSV
        $csvData = [];
        
        // CSV Headers
        $csvData[] = [
            'Student ID',
            'First Name',
            'Last Name',
            'Email',
            'Phone',
            'Program',
            'Major',
            'Degree Level',
            'Graduation Year',
            'Employment Status',
            'Company Name',
            'Job Title',
            'Monthly Salary',
            'City',
            'Country',
        ];

        // CSV Rows
        foreach ($graduates as $graduate) {
            $employmentStatus = '';
            $companyName = '';
            $jobTitle = '';
            $monthlySalary = '';

            // Priority: latest employment survey, then current employment
            if ($graduate->latest_employment_survey) {
                $employmentStatus = $graduate->latest_employment_survey->employment_status ?? '';
                $companyName = $graduate->latest_employment_survey->company_name ?? '';
                $jobTitle = $graduate->latest_employment_survey->job_title ?? '';
                $monthlySalary = $graduate->latest_employment_survey->monthly_salary ?? '';
            } elseif ($graduate->currentEmployment) {
                $employmentStatus = $graduate->currentEmployment->employment_status ?? '';
                $companyName = $graduate->currentEmployment->company_name ?? '';
                $jobTitle = $graduate->currentEmployment->job_title ?? '';
                $monthlySalary = $graduate->currentEmployment->monthly_salary ?? '';
            }

            $csvData[] = [
                $graduate->student_id ?? '',
                $graduate->first_name ?? '',
                $graduate->last_name ?? '',
                $graduate->email ?? '',
                $graduate->phone ?? '',
                $graduate->program ?? '',
                $graduate->major ?? '',
                $graduate->degree_level ?? '',
                $graduate->graduation_year ?? '',
                $employmentStatus,
                $companyName,
                $jobTitle,
                $monthlySalary,
                $graduate->city ?? '',
                $graduate->country ?? '',
            ];
        }

        // Create CSV content
        $callback = function() use ($csvData) {
            $file = fopen('php://output', 'w');
            foreach ($csvData as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        };

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="graduates_export.csv"',
        ];

        return response()->stream($callback, 200, $headers);
    }
}
