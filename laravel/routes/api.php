<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GraduateController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\SurveyResponseController;
use App\Http\Controllers\EmploymentController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AuthController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

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
});
