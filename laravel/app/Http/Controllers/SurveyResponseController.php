<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SurveyResponse;

class SurveyResponseController extends Controller
{
    public function index(Request $request)
    {
        $query = SurveyResponse::with(['survey', 'graduate']);

        if ($request->has('survey_id')) {
            $query->where('survey_id', $request->survey_id);
        }

        if ($request->has('graduate_id')) {
            $query->where('graduate_id', $request->graduate_id);
        }

        if ($request->has('is_complete')) {
            $query->where('is_complete', $request->is_complete);
        }

        return response()->json($query->latest()->paginate(15));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'survey_id' => 'required|exists:surveys,id',
            'graduate_id' => 'required|exists:graduates,id',
            'responses' => 'required|array',
            'is_complete' => 'boolean'
        ]);

        $surveyResponse = SurveyResponse::create($validated);

        return response()->json($surveyResponse->load(['survey', 'graduate']), 201);
    }

    public function show(SurveyResponse $surveyResponse)
    {
        return response()->json($surveyResponse->load(['survey', 'graduate']));
    }

    public function update(Request $request, SurveyResponse $surveyResponse)
    {
        $validated = $request->validate([
            'responses' => 'sometimes|array',
            'is_complete' => 'boolean'
        ]);

        $surveyResponse->update($validated);

        return response()->json($surveyResponse->load(['survey', 'graduate']));
    }

    public function destroy(SurveyResponse $surveyResponse)
    {
        $surveyResponse->delete();

        return response()->json(['message' => 'Survey response deleted successfully']);
    }

    public function submit(Request $request, SurveyResponse $surveyResponse)
    {
        $surveyResponse->update([
            'is_complete' => true,
            'submitted_at' => now()
        ]);

        return response()->json($surveyResponse);
    }
}
