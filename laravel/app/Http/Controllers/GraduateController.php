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
        if ($request->has('graduation_year')) {
            $query->where('graduation_year', $request->graduation_year);
        }

        // Filter by program
        if ($request->has('program')) {
            $query->where('program', $request->program);
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

        return response()->json($query->paginate(15));
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
