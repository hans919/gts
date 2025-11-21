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

        // Create notifications for graduates if survey is active
        if ($validated['status'] === 'active') {
            $graduates = \DB::table('graduates');
            
            if (!empty($validated['target_graduation_year'])) {
                $graduates->where('graduation_year', $validated['target_graduation_year']);
            }
            
            if (!empty($validated['target_program'])) {
                $graduates->where('program', $validated['target_program']);
            }
            
            $graduateIds = $graduates->pluck('id');
            
            foreach ($graduateIds as $graduateId) {
                \DB::table('notifications')->insert([
                    'graduate_id' => $graduateId,
                    'type' => 'survey',
                    'title' => 'New Survey Available',
                    'message' => 'A new survey "' . $validated['title'] . '" is now available for you to complete.',
                    'read' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

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

        $oldStatus = $survey->status;
        $survey->update($validated);

        // Create notifications if survey is newly activated
        if (isset($validated['status']) && $validated['status'] === 'active' && $oldStatus !== 'active') {
            $graduates = \DB::table('graduates');
            
            if (!empty($survey->target_graduation_year)) {
                $graduates->where('graduation_year', $survey->target_graduation_year);
            }
            
            if (!empty($survey->target_program)) {
                $graduates->where('program', $survey->target_program);
            }
            
            $graduateIds = $graduates->pluck('id');
            
            foreach ($graduateIds as $graduateId) {
                \DB::table('notifications')->insert([
                    'graduate_id' => $graduateId,
                    'type' => 'survey',
                    'title' => 'New Survey Available',
                    'message' => 'A new survey "' . $survey->title . '" is now available for you to complete.',
                    'read' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return response()->json($survey);
    }

    public function destroy(Survey $survey)
    {
        $survey->delete();

        return response()->json(['message' => 'Survey deleted successfully']);
    }

    public function responses(Survey $survey)
    {
        $responses = \DB::table('survey_responses')
            ->join('graduates', 'survey_responses.graduate_id', '=', 'graduates.id')
            ->where('survey_responses.survey_id', $survey->id)
            ->select(
                'survey_responses.id',
                'survey_responses.graduate_id',
                'survey_responses.responses',
                'survey_responses.submitted_at',
                'graduates.first_name',
                'graduates.last_name',
                'graduates.email'
            )
            ->get()
            ->map(function($response) {
                return [
                    'id' => $response->id,
                    'graduate_id' => $response->graduate_id,
                    'graduate_name' => $response->first_name . ' ' . $response->last_name,
                    'graduate_email' => $response->email,
                    'responses' => json_decode($response->responses, true),
                    'submitted_at' => $response->submitted_at,
                ];
            });

        return response()->json($responses);
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
