<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Graduate;
use Illuminate\Support\Facades\Auth;

class GraduateProfileController extends Controller
{
    /**
     * Get authenticated graduate's profile
     */
    public function show(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied. Only graduates can access this resource.'
            ], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            // If no graduate record exists, create a basic profile from user data
            $nameParts = explode(' ', $user->name ?? '');
            $firstName = $user->first_name ?? ($nameParts[0] ?? '');
            $lastName = $user->last_name ?? (isset($nameParts[1]) ? $nameParts[1] : '');
            
            $graduate = Graduate::create([
                'email' => $user->email,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'student_id' => $user->student_id ?? 'N/A',
                'program' => 'Not specified',
                'graduation_year' => date('Y'),
            ]);
        }

        return response()->json($graduate);
    }

    /**
     * Update authenticated graduate's profile
     */
    public function update(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied. Only graduates can access this resource.'
            ], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json([
                'message' => 'Graduate profile not found'
            ], 404);
        }

        $validated = $request->validate([
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'program' => 'nullable|string|max:100',
            'major' => 'nullable|string|max:100',
        ]);

        $graduate->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $graduate
        ]);
    }

    /**
     * Get graduate's employment surveys
     */
    public function getSurveys(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied.'
            ], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json([
                'message' => 'Graduate profile not found'
            ], 404);
        }

        $surveys = \DB::table('employment_surveys')
            ->where('graduate_id', $graduate->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'surveys' => $surveys,
            'has_pending' => $surveys->isEmpty()
        ]);
    }

    /**
     * Submit employment survey
     */
    public function submitSurvey(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied.'
            ], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json([
                'message' => 'Graduate profile not found'
            ], 404);
        }

        $validated = $request->validate([
            'employment_status' => 'required|string|max:100',
            'company_name' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:100',
            'job_type' => 'nullable|string|max:50',
            'start_date' => 'nullable|date',
            'monthly_salary' => 'nullable|numeric',
            'salary_currency' => 'nullable|string|max:10',
            'job_location_city' => 'nullable|string|max:100',
            'job_location_country' => 'nullable|string|max:100',
            'is_related_to_course' => 'nullable|string|max:100',
            'job_finding_duration_months' => 'nullable|string|max:50',
            'job_finding_method' => 'nullable|string|max:255',
            'skills_acquired_in_college' => 'nullable|string',
            'additional_trainings' => 'nullable|string',
            'job_satisfaction' => 'nullable|string|max:50',
            'career_goals' => 'nullable|string',
            'further_education_plans' => 'nullable|string|max:100',
            'comments' => 'nullable|string',
        ]);

        $survey = \DB::table('employment_surveys')->insert([
            'graduate_id' => $graduate->id,
            'employment_status' => $validated['employment_status'],
            'company_name' => $validated['company_name'] ?? null,
            'job_title' => $validated['job_title'] ?? null,
            'industry' => $validated['industry'] ?? null,
            'job_type' => $validated['job_type'] ?? null,
            'start_date' => $validated['start_date'] ?? null,
            'monthly_salary' => $validated['monthly_salary'] ?? null,
            'salary_currency' => $validated['salary_currency'] ?? 'PHP',
            'job_location_city' => $validated['job_location_city'] ?? null,
            'job_location_country' => $validated['job_location_country'] ?? null,
            'is_related_to_course' => $validated['is_related_to_course'] ?? null,
            'job_finding_duration_months' => $validated['job_finding_duration_months'] ?? null,
            'job_finding_method' => $validated['job_finding_method'] ?? null,
            'skills_acquired_in_college' => $validated['skills_acquired_in_college'] ?? null,
            'additional_trainings' => $validated['additional_trainings'] ?? null,
            'job_satisfaction' => $validated['job_satisfaction'] ?? null,
            'career_goals' => $validated['career_goals'] ?? null,
            'further_education_plans' => $validated['further_education_plans'] ?? null,
            'comments' => $validated['comments'] ?? null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Survey submitted successfully'
        ], 201);
    }

    /**
     * Get graduate's career updates
     */
    public function getCareerUpdates(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied.'
            ], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json([
                'message' => 'Graduate profile not found'
            ], 404);
        }

        $updates = \DB::table('career_updates')
            ->where('graduate_id', $graduate->id)
            ->orderBy('effective_date', 'desc')
            ->get();

        return response()->json($updates);
    }

    /**
     * Add career update
     */
    public function addCareerUpdate(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied.'
            ], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json([
                'message' => 'Graduate profile not found'
            ], 404);
        }

        $validated = $request->validate([
            'update_type' => 'required|string|max:100',
            'company_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'description' => 'required|string',
            'effective_date' => 'required|date',
        ]);

        $id = \DB::table('career_updates')->insertGetId([
            'graduate_id' => $graduate->id,
            'update_type' => $validated['update_type'],
            'company_name' => $validated['company_name'],
            'job_title' => $validated['job_title'],
            'description' => $validated['description'],
            'effective_date' => $validated['effective_date'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $careerUpdate = \DB::table('career_updates')->where('id', $id)->first();

        return response()->json($careerUpdate, 201);
    }

    /**
     * Get graduate notifications
     */
    public function getNotifications(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        $notifications = \DB::table('notifications')
            ->where('graduate_id', $graduate->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }

    /**
     * Mark notification as read
     */
    public function markNotificationRead(Request $request, $id)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        \DB::table('notifications')
            ->where('id', $id)
            ->where('graduate_id', $graduate->id)
            ->update(['read' => true, 'updated_at' => now()]);

        return response()->json(['message' => 'Notification marked as read']);
    }

    /**
     * Delete notification
     */
    public function deleteNotification(Request $request, $id)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        \DB::table('notifications')
            ->where('id', $id)
            ->where('graduate_id', $graduate->id)
            ->delete();

        return response()->json(['message' => 'Notification deleted']);
    }

    /**
     * Get survey history
     */
    public function getSurveyHistory(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        // Get completed employment surveys
        $completedSurveys = \DB::table('employment_surveys')
            ->where('graduate_id', $graduate->id)
            ->orderBy('created_at', 'desc')
            ->get();

        // Get active surveys from admin (surveys table)
        $activeSurveys = \DB::table('surveys')
            ->where('status', 'active')
            ->where(function($query) use ($graduate) {
                $query->whereNull('target_graduation_year')
                      ->orWhere('target_graduation_year', $graduate->graduation_year);
            })
            ->where(function($query) use ($graduate) {
                $query->whereNull('target_program')
                      ->orWhere('target_program', $graduate->program);
            })
            ->where(function($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now());
            })
            ->get();

        // Get survey responses to check which surveys are already completed
        $surveyResponses = \DB::table('survey_responses')
            ->where('graduate_id', $graduate->id)
            ->get();

        $completedSurveyIds = $surveyResponses->pluck('survey_id')->toArray();

        // Get completed admin surveys with details
        $completedAdminSurveys = \DB::table('surveys')
            ->whereIn('id', $completedSurveyIds)
            ->get();

        // Filter pending surveys (active surveys not yet completed)
        $pendingSurveys = $activeSurveys->filter(function($survey) use ($completedSurveyIds) {
            return !in_array($survey->id, $completedSurveyIds);
        })->map(function($survey) {
            return [
                'id' => $survey->id,
                'title' => $survey->title,
                'description' => $survey->description,
                'due_date' => $survey->end_date,
            ];
        })->values();

        $totalSurveys = $activeSurveys->count() + 1; // +1 for employment survey
        $completed = $completedSurveys->count() + count($completedSurveyIds);
        $pending = $totalSurveys - $completed;

        $stats = [
            'total' => $totalSurveys,
            'completed' => $completed,
            'pending' => max(0, $pending),
            'completion_rate' => $totalSurveys > 0 ? round(($completed / $totalSurveys) * 100) : 0,
        ];

        // Merge employment surveys and admin surveys
        $allCompletedSurveys = collect();

        // Add employment surveys
        foreach ($completedSurveys as $survey) {
            $allCompletedSurveys->push([
                'id' => $survey->id,
                'survey_type' => 'Employment Survey',
                'status' => 'completed',
                'created_at' => $survey->created_at,
                'employment_status' => $survey->employment_status,
                'company_name' => $survey->company_name,
                'job_title' => $survey->job_title,
            ]);
        }

        // Add admin surveys
        foreach ($completedAdminSurveys as $survey) {
            $response = $surveyResponses->firstWhere('survey_id', $survey->id);
            $allCompletedSurveys->push([
                'id' => $survey->id,
                'survey_type' => $survey->title,
                'status' => 'completed',
                'created_at' => $response->submitted_at ?? $response->created_at,
                'employment_status' => null,
                'company_name' => null,
                'job_title' => null,
            ]);
        }

        return response()->json([
            'stats' => $stats,
            'pending' => $pendingSurveys,
            'completed' => $allCompletedSurveys->sortByDesc('created_at')->values(),
        ]);
    }

    /**
     * Get privacy settings
     */
    public function getPrivacySettings(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        // Mock data - in production, fetch from privacy_settings table
        $settings = [
            'share_employment_data' => true,
            'share_contact_info' => false,
            'share_with_employers' => false,
            'receive_job_alerts' => true,
            'receive_event_notifications' => true,
            'receive_survey_reminders' => true,
            'allow_alumni_network' => true,
            'profile_visibility' => 'alumni_only',
        ];

        return response()->json($settings);
    }

    /**
     * Update privacy settings
     */
    public function updatePrivacySettings(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'share_employment_data' => 'boolean',
            'share_contact_info' => 'boolean',
            'share_with_employers' => 'boolean',
            'receive_job_alerts' => 'boolean',
            'receive_event_notifications' => 'boolean',
            'receive_survey_reminders' => 'boolean',
            'allow_alumni_network' => 'boolean',
            'profile_visibility' => 'in:public,alumni_only,private',
        ]);

        // In production, save to privacy_settings table
        return response()->json(['message' => 'Privacy settings updated successfully']);
    }

    /**
     * Export graduate data
     */
    public function exportData(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        $data = [
            'profile' => $graduate,
            'surveys' => \DB::table('employment_surveys')->where('graduate_id', $graduate->id)->get(),
            'career_updates' => \DB::table('career_updates')->where('graduate_id', $graduate->id)->get(),
        ];

        return response()->json($data)
            ->header('Content-Type', 'application/json')
            ->header('Content-Disposition', 'attachment; filename="my-data.json"');
    }

    /**
     * Delete graduate account
     */
    public function deleteAccount(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if ($graduate) {
            \DB::table('employment_surveys')->where('graduate_id', $graduate->id)->delete();
            \DB::table('career_updates')->where('graduate_id', $graduate->id)->delete();
            $graduate->delete();
        }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }

    /**
     * Get job postings
     */
    public function getJobs(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        $jobs = \DB::table('jobs')
            ->select('jobs.*', \DB::raw('CASE WHEN job_bookmarks.id IS NOT NULL THEN 1 ELSE 0 END as bookmarked'))
            ->leftJoin('job_bookmarks', function($join) use ($graduate) {
                $join->on('jobs.id', '=', 'job_bookmarks.job_id')
                     ->where('job_bookmarks.graduate_id', '=', $graduate->id);
            })
            ->orderBy('posted_date', 'desc')
            ->get();

        return response()->json($jobs);
    }

    /**
     * Toggle job bookmark
     */
    public function toggleJobBookmark(Request $request, $id)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();
        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        $bookmark = \DB::table('job_bookmarks')
            ->where('graduate_id', $graduate->id)
            ->where('job_id', $id)
            ->first();

        if ($bookmark) {
            \DB::table('job_bookmarks')
                ->where('graduate_id', $graduate->id)
                ->where('job_id', $id)
                ->delete();
            $bookmarked = false;
        } else {
            \DB::table('job_bookmarks')->insert([
                'graduate_id' => $graduate->id,
                'job_id' => $id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $bookmarked = true;
        }

        return response()->json(['message' => 'Bookmark toggled', 'bookmarked' => $bookmarked]);
    }

    /**
     * Get career services
     */
    public function getCareerServices(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $services = \DB::table('career_services')
            ->orderBy('name')
            ->get();

        return response()->json($services);
    }

    /**
     * Get training programs
     */
    public function getTrainingPrograms(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $programs = \DB::table('training_programs')
            ->orderBy('title')
            ->get();

        return response()->json($programs);
    }

    /**
     * Get support tickets
     */
    public function getSupportTickets(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        $tickets = \DB::table('support_tickets')
            ->where('graduate_id', $graduate->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($tickets);
    }

    /**
     * Create support ticket
     */
    public function createSupportTicket(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'category' => 'required|in:technical,account,survey,career,feedback,other',
            'priority' => 'required|in:low,medium,high',
            'description' => 'required|string',
        ]);

        $ticketId = \DB::table('support_tickets')->insertGetId([
            'graduate_id' => $graduate->id,
            'subject' => $validated['subject'],
            'category' => $validated['category'],
            'priority' => $validated['priority'],
            'status' => 'open',
            'description' => $validated['description'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Support ticket created successfully',
            'ticket_id' => $ticketId,
        ], 201);
    }

    /**
     * Submit survey response
     */
    public function submitSurveyResponse(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json(['message' => 'Graduate profile not found'], 404);
        }

        $validated = $request->validate([
            'survey_id' => 'required|exists:surveys,id',
            'answers' => 'required|array',
        ]);

        // Check if already submitted
        $existingResponse = \DB::table('survey_responses')
            ->where('graduate_id', $graduate->id)
            ->where('survey_id', $validated['survey_id'])
            ->first();

        if ($existingResponse) {
            return response()->json([
                'message' => 'You have already submitted this survey'
            ], 400);
        }

        $responseId = \DB::table('survey_responses')->insertGetId([
            'survey_id' => $validated['survey_id'],
            'graduate_id' => $graduate->id,
            'responses' => json_encode($validated['answers']),
            'is_complete' => true,
            'submitted_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Survey response submitted successfully',
            'response_id' => $responseId,
        ], 201);
    }

    /**
     * Upload profile photo
     */
    public function uploadProfilePhoto(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied.'
            ], 403);
        }

        $request->validate([
            'profile_photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $graduate = Graduate::where('email', $user->email)->first();

        if (!$graduate) {
            return response()->json([
                'message' => 'Graduate profile not found'
            ], 404);
        }

        // Delete old photo if exists
        if ($graduate->profile_photo && \Storage::disk('public')->exists($graduate->profile_photo)) {
            \Storage::disk('public')->delete($graduate->profile_photo);
        }

        // Store new photo
        $path = $request->file('profile_photo')->store('profile-photos', 'public');
        
        $graduate->profile_photo = $path;
        $graduate->save();

        // Return full URL with HTTPS for production
        $fullUrl = url('storage/' . $path);
        $fullUrl = str_replace('http://', 'https://', $fullUrl);

        return response()->json([
            'message' => 'Profile photo uploaded successfully',
            'profile_photo' => $path,
            'profile_photo_url' => $fullUrl,
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'graduate') {
            return response()->json([
                'message' => 'Access denied.'
            ], 403);
        }

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        // Check if current password matches
        if (!\Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 400);
        }

        // Update password
        $user->password = \Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully',
        ]);
    }
}
