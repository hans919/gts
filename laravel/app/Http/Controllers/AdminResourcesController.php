<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminResourcesController extends Controller
{
    // ============ JOBS MANAGEMENT ============
    
    public function getJobs(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $jobs = DB::table('jobs')->orderBy('posted_date', 'desc')->get();
        return response()->json($jobs);
    }

    public function createJob(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'salary_range' => 'nullable|string|max:100',
            'description' => 'required|string',
            'external_link' => 'nullable|url',
        ]);

        $id = DB::table('jobs')->insertGetId([
            'title' => $validated['title'],
            'company' => $validated['company'],
            'location' => $validated['location'],
            'type' => $validated['type'],
            'salary_range' => $validated['salary_range'] ?? null,
            'description' => $validated['description'],
            'external_link' => $validated['external_link'] ?? null,
            'posted_date' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create notification for all graduates
        $graduates = DB::table('graduates')->pluck('id');
        foreach ($graduates as $graduateId) {
            DB::table('notifications')->insert([
                'graduate_id' => $graduateId,
                'type' => 'job',
                'title' => 'New Job Posted',
                'message' => 'A new job opportunity "' . $validated['title'] . '" at ' . $validated['company'] . ' has been posted.',
                'read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $job = DB::table('jobs')->where('id', $id)->first();
        return response()->json($job, 201);
    }

    public function updateJob(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'salary_range' => 'nullable|string|max:100',
            'description' => 'required|string',
            'external_link' => 'nullable|url',
        ]);

        DB::table('jobs')->where('id', $id)->update([
            'title' => $validated['title'],
            'company' => $validated['company'],
            'location' => $validated['location'],
            'type' => $validated['type'],
            'salary_range' => $validated['salary_range'] ?? null,
            'description' => $validated['description'],
            'external_link' => $validated['external_link'] ?? null,
            'updated_at' => now(),
        ]);

        $job = DB::table('jobs')->where('id', $id)->first();
        return response()->json($job);
    }

    public function deleteJob(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        DB::table('jobs')->where('id', $id)->delete();
        return response()->json(['message' => 'Job deleted successfully']);
    }

    // ============ CAREER SERVICES MANAGEMENT ============
    
    public function getCareerServices(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $services = DB::table('career_services')->orderBy('name')->get();
        return response()->json($services);
    }

    public function createCareerService(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'contact_email' => 'required|email',
            'contact_phone' => 'nullable|string|max:50',
            'website' => 'nullable|url',
            'category' => 'required|string|max:100',
        ]);

        $id = DB::table('career_services')->insertGetId([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'contact_email' => $validated['contact_email'],
            'contact_phone' => $validated['contact_phone'] ?? null,
            'website' => $validated['website'] ?? null,
            'category' => $validated['category'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create notification for all graduates
        $graduates = DB::table('graduates')->pluck('id');
        foreach ($graduates as $graduateId) {
            DB::table('notifications')->insert([
                'graduate_id' => $graduateId,
                'type' => 'event',
                'title' => 'New Career Service Available',
                'message' => 'A new career service "' . $validated['name'] . '" is now available.',
                'read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $service = DB::table('career_services')->where('id', $id)->first();
        return response()->json($service, 201);
    }

    public function updateCareerService(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'contact_email' => 'required|email',
            'contact_phone' => 'nullable|string|max:50',
            'website' => 'nullable|url',
            'category' => 'required|string|max:100',
        ]);

        DB::table('career_services')->where('id', $id)->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'contact_email' => $validated['contact_email'],
            'contact_phone' => $validated['contact_phone'] ?? null,
            'website' => $validated['website'] ?? null,
            'category' => $validated['category'],
            'updated_at' => now(),
        ]);

        $service = DB::table('career_services')->where('id', $id)->first();
        return response()->json($service);
    }

    public function deleteCareerService(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        DB::table('career_services')->where('id', $id)->delete();
        return response()->json(['message' => 'Career service deleted successfully']);
    }

    // ============ TRAINING PROGRAMS MANAGEMENT ============
    
    public function getTrainingPrograms(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $programs = DB::table('training_programs')->orderBy('title')->get();
        return response()->json($programs);
    }

    public function createTrainingProgram(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'provider' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|string|max:100',
            'schedule' => 'required|string|max:255',
            'registration_link' => 'nullable|url',
            'category' => 'required|string|max:100',
        ]);

        $id = DB::table('training_programs')->insertGetId([
            'title' => $validated['title'],
            'provider' => $validated['provider'],
            'description' => $validated['description'],
            'duration' => $validated['duration'],
            'schedule' => $validated['schedule'],
            'registration_link' => $validated['registration_link'] ?? null,
            'category' => $validated['category'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create notification for all graduates
        $graduates = DB::table('graduates')->pluck('id');
        foreach ($graduates as $graduateId) {
            DB::table('notifications')->insert([
                'graduate_id' => $graduateId,
                'type' => 'event',
                'title' => 'New Training Program Available',
                'message' => 'A new training program "' . $validated['title'] . '" by ' . $validated['provider'] . ' is now available.',
                'read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $program = DB::table('training_programs')->where('id', $id)->first();
        return response()->json($program, 201);
    }

    public function updateTrainingProgram(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'provider' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|string|max:100',
            'schedule' => 'required|string|max:255',
            'registration_link' => 'nullable|url',
            'category' => 'required|string|max:100',
        ]);

        DB::table('training_programs')->where('id', $id)->update([
            'title' => $validated['title'],
            'provider' => $validated['provider'],
            'description' => $validated['description'],
            'duration' => $validated['duration'],
            'schedule' => $validated['schedule'],
            'registration_link' => $validated['registration_link'] ?? null,
            'category' => $validated['category'],
            'updated_at' => now(),
        ]);

        $program = DB::table('training_programs')->where('id', $id)->first();
        return response()->json($program);
    }

    public function deleteTrainingProgram(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        DB::table('training_programs')->where('id', $id)->delete();
        return response()->json(['message' => 'Training program deleted successfully']);
    }

    // ============ SUPPORT TICKETS MANAGEMENT ============
    
    public function getSupportTickets(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $tickets = DB::table('support_tickets')
            ->join('graduates', 'support_tickets.graduate_id', '=', 'graduates.id')
            ->select('support_tickets.*', 'graduates.first_name', 'graduates.last_name', 'graduates.email')
            ->orderBy('support_tickets.created_at', 'desc')
            ->get();

        return response()->json($tickets);
    }

    public function updateTicketStatus(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,resolved,closed',
            'admin_response' => 'nullable|string',
        ]);

        $updateData = [
            'status' => $validated['status'],
            'updated_at' => now(),
        ];

        if (isset($validated['admin_response'])) {
            $updateData['admin_response'] = $validated['admin_response'];
            $updateData['responded_at'] = now();
        }

        DB::table('support_tickets')->where('id', $id)->update($updateData);

        $ticket = DB::table('support_tickets')->where('id', $id)->first();
        return response()->json($ticket);
    }

    public function deleteTicket(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        DB::table('support_tickets')->where('id', $id)->delete();
        return response()->json(['message' => 'Support ticket deleted successfully']);
    }

    // ============ EMPLOYMENT SURVEYS MANAGEMENT ============
    
    public function getEmploymentSurveys(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        $surveys = DB::table('employment_surveys')
            ->join('graduates', 'employment_surveys.graduate_id', '=', 'graduates.id')
            ->select(
                'employment_surveys.*',
                'graduates.first_name',
                'graduates.last_name',
                'graduates.email',
                'graduates.student_id',
                'graduates.program',
                'graduates.major',
                'graduates.graduation_year'
            )
            ->orderBy('employment_surveys.created_at', 'desc')
            ->get();

        return response()->json($surveys);
    }

    public function deleteEmploymentSurvey(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied.'], 403);
        }

        DB::table('employment_surveys')->where('id', $id)->delete();
        return response()->json(['message' => 'Employment survey deleted successfully']);
    }
}
