<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employment;

class EmploymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Employment::with('graduate');

        if ($request->has('graduate_id')) {
            $query->where('graduate_id', $request->graduate_id);
        }

        if ($request->has('employment_status')) {
            $query->where('employment_status', $request->employment_status);
        }

        if ($request->has('is_current')) {
            $query->where('is_current', $request->is_current);
        }

        return response()->json($query->latest()->paginate(15));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'graduate_id' => 'required|exists:graduates,id',
            'company_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'employment_status' => 'required|in:employed,self-employed,unemployed,pursuing_higher_education,other',
            'job_type' => 'nullable|in:full-time,part-time,contract,internship,freelance',
            'job_description' => 'nullable|string',
            'industry' => 'nullable|string',
            'monthly_salary' => 'nullable|numeric',
            'salary_currency' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
            'job_relevance' => 'nullable|in:highly_relevant,relevant,somewhat_relevant,not_relevant',
            'skills_used' => 'nullable|string',
            'job_satisfaction' => 'nullable|integer|min:1|max:5',
            'company_location' => 'nullable|string'
        ]);

        // If this is a current employment, set all other employments for this graduate to not current
        if ($validated['is_current'] ?? false) {
            Employment::where('graduate_id', $validated['graduate_id'])
                ->update(['is_current' => false]);
        }

        $employment = Employment::create($validated);

        return response()->json($employment->load('graduate'), 201);
    }

    public function show(Employment $employment)
    {
        return response()->json($employment->load('graduate'));
    }

    public function update(Request $request, Employment $employment)
    {
        $validated = $request->validate([
            'company_name' => 'sometimes|string|max:255',
            'job_title' => 'sometimes|string|max:255',
            'employment_status' => 'sometimes|in:employed,self-employed,unemployed,pursuing_higher_education,other',
            'job_type' => 'nullable|in:full-time,part-time,contract,internship,freelance',
            'job_description' => 'nullable|string',
            'industry' => 'nullable|string',
            'monthly_salary' => 'nullable|numeric',
            'salary_currency' => 'nullable|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
            'job_relevance' => 'nullable|in:highly_relevant,relevant,somewhat_relevant,not_relevant',
            'skills_used' => 'nullable|string',
            'job_satisfaction' => 'nullable|integer|min:1|max:5',
            'company_location' => 'nullable|string'
        ]);

        // If this is being set to current employment
        if (isset($validated['is_current']) && $validated['is_current']) {
            Employment::where('graduate_id', $employment->graduate_id)
                ->where('id', '!=', $employment->id)
                ->update(['is_current' => false]);
        }

        $employment->update($validated);

        return response()->json($employment->load('graduate'));
    }

    public function destroy(Employment $employment)
    {
        $employment->delete();

        return response()->json(['message' => 'Employment record deleted successfully']);
    }
}
