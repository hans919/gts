<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;

class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $query = Survey::withCount('responses');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('active') && $request->active) {
            $query->active();
        }

        return response()->json($query->latest()->paginate(15));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'status' => 'required|in:draft,active,closed',
            'target_graduation_year' => 'nullable|string',
            'target_program' => 'nullable|string',
            'is_anonymous' => 'boolean'
        ]);

        $survey = Survey::create($validated);

        return response()->json($survey, 201);
    }

    public function show(Survey $survey)
    {
        return response()->json($survey->load('responses'));
    }

    public function update(Request $request, Survey $survey)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'sometimes|array',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date|after:start_date',
            'status' => 'sometimes|in:draft,active,closed',
            'target_graduation_year' => 'nullable|string',
            'target_program' => 'nullable|string',
            'is_anonymous' => 'boolean'
        ]);

        $survey->update($validated);

        return response()->json($survey);
    }

    public function destroy(Survey $survey)
    {
        $survey->delete();

        return response()->json(['message' => 'Survey deleted successfully']);
    }

    public function responses(Survey $survey)
    {
        return response()->json($survey->responses()->with('graduate')->get());
    }

    public function duplicate(Survey $survey)
    {
        $newSurvey = $survey->replicate();
        $newSurvey->title = $survey->title . ' (Copy)';
        $newSurvey->status = 'draft';
        $newSurvey->save();

        return response()->json($newSurvey, 201);
    }
}
