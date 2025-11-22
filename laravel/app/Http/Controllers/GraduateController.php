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
}
