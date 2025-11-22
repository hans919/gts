<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GraduateController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\SurveyResponseController;
use App\Http\Controllers\EmploymentController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GraduateProfileController;
use App\Http\Controllers\AdminResourcesController;

// Public routes - Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Graduate routes
    Route::apiResource('graduates', GraduateController::class);
    Route::get('graduates/{graduate}/employments', [GraduateController::class, 'employments']);
    Route::get('graduates/{graduate}/survey-responses', [GraduateController::class, 'surveyResponses']);

    // Survey routes
    Route::apiResource('surveys', SurveyController::class);
    Route::get('surveys/{survey}/responses', [SurveyController::class, 'responses']);
    Route::post('surveys/{survey}/duplicate', [SurveyController::class, 'duplicate']);

    // Survey Response routes
    Route::apiResource('survey-responses', SurveyResponseController::class);
    Route::post('survey-responses/{surveyResponse}/submit', [SurveyResponseController::class, 'submit']);

    // Employment routes
    Route::apiResource('employments', EmploymentController::class);

    // Analytics routes
    Route::prefix('analytics')->group(function () {
        Route::get('/dashboard', [AnalyticsController::class, 'dashboard']);
        Route::get('/employment-status', [AnalyticsController::class, 'employmentStatus']);
        Route::get('/job-relevance', [AnalyticsController::class, 'jobRelevance']);
        Route::get('/salary-distribution', [AnalyticsController::class, 'salaryDistribution']);
        Route::get('/industry-distribution', [AnalyticsController::class, 'industryDistribution']);
        Route::get('/program-outcomes', [AnalyticsController::class, 'programOutcomes']);
        Route::get('/survey-completion', [AnalyticsController::class, 'surveyCompletion']);
        Route::get('/graduates-by-year', [AnalyticsController::class, 'graduatesByYear']);
    });

    // Admin Resources Management routes
    Route::prefix('admin')->group(function () {
        // Jobs Management
        Route::get('/jobs', [AdminResourcesController::class, 'getJobs']);
        Route::post('/jobs', [AdminResourcesController::class, 'createJob']);
        Route::put('/jobs/{id}', [AdminResourcesController::class, 'updateJob']);
        Route::delete('/jobs/{id}', [AdminResourcesController::class, 'deleteJob']);
        
        // Career Services Management
        Route::get('/career-services', [AdminResourcesController::class, 'getCareerServices']);
        Route::post('/career-services', [AdminResourcesController::class, 'createCareerService']);
        Route::put('/career-services/{id}', [AdminResourcesController::class, 'updateCareerService']);
        Route::delete('/career-services/{id}', [AdminResourcesController::class, 'deleteCareerService']);
        
        // Training Programs Management
        Route::get('/training-programs', [AdminResourcesController::class, 'getTrainingPrograms']);
        Route::post('/training-programs', [AdminResourcesController::class, 'createTrainingProgram']);
        Route::put('/training-programs/{id}', [AdminResourcesController::class, 'updateTrainingProgram']);
        Route::delete('/training-programs/{id}', [AdminResourcesController::class, 'deleteTrainingProgram']);
        
        // Support Tickets Management
        Route::get('/support-tickets', [AdminResourcesController::class, 'getSupportTickets']);
        Route::put('/support-tickets/{id}', [AdminResourcesController::class, 'updateTicketStatus']);
        Route::delete('/support-tickets/{id}', [AdminResourcesController::class, 'deleteTicket']);
        
        // Employment Surveys Management
        Route::get('/employment-surveys', [AdminResourcesController::class, 'getEmploymentSurveys']);
        Route::delete('/employment-surveys/{id}', [AdminResourcesController::class, 'deleteEmploymentSurvey']);
    });

    // Graduate Portal routes (for authenticated graduates)
    Route::prefix('graduate')->group(function () {
        Route::get('/profile', [GraduateProfileController::class, 'show']);
        Route::put('/profile', [GraduateProfileController::class, 'update']);
        Route::get('/surveys', [GraduateProfileController::class, 'getSurveys']);
        Route::post('/surveys', [GraduateProfileController::class, 'submitSurvey']);
        Route::get('/career-updates', [GraduateProfileController::class, 'getCareerUpdates']);
        Route::post('/career-updates', [GraduateProfileController::class, 'addCareerUpdate']);
        
        // Notifications
        Route::get('/notifications', [GraduateProfileController::class, 'getNotifications']);
        Route::put('/notifications/{id}/read', [GraduateProfileController::class, 'markNotificationRead']);
        Route::delete('/notifications/{id}', [GraduateProfileController::class, 'deleteNotification']);
        
        // Survey History
        Route::get('/survey-history', [GraduateProfileController::class, 'getSurveyHistory']);
        
        // Privacy Settings
        Route::get('/privacy-settings', [GraduateProfileController::class, 'getPrivacySettings']);
        Route::put('/privacy-settings', [GraduateProfileController::class, 'updatePrivacySettings']);
        Route::get('/export-data', [GraduateProfileController::class, 'exportData']);
        Route::delete('/account', [GraduateProfileController::class, 'deleteAccount']);
        
        // Alumni Resources
        Route::get('/jobs', [GraduateProfileController::class, 'getJobs']);
        Route::post('/jobs/{id}/bookmark', [GraduateProfileController::class, 'toggleJobBookmark']);
        Route::get('/career-services', [GraduateProfileController::class, 'getCareerServices']);
        Route::get('/training-programs', [GraduateProfileController::class, 'getTrainingPrograms']);
        
        // Support & Feedback
        Route::get('/support-tickets', [GraduateProfileController::class, 'getSupportTickets']);
        Route::post('/support-tickets', [GraduateProfileController::class, 'createSupportTicket']);
        
        // Survey Response
        Route::post('/submit-survey-response', [GraduateProfileController::class, 'submitSurveyResponse']);
        
        // Settings
        Route::post('/profile-photo', [GraduateProfileController::class, 'uploadProfilePhoto']);
        Route::put('/change-password', [GraduateProfileController::class, 'changePassword']);
    });
});
