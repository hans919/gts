<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmploymentSurvey extends Model
{
    protected $fillable = [
        'graduate_id',
        'employment_status',
        'company_name',
        'job_title',
        'industry',
        'job_type',
        'start_date',
        'monthly_salary',
        'salary_currency',
        'job_location_city',
        'job_location_country',
        'is_related_to_course',
        'job_finding_duration_months',
        'job_finding_method',
        'skills_acquired_in_college',
        'additional_trainings',
        'job_satisfaction',
        'career_goals',
        'further_education_plans',
        'comments',
    ];

    protected $casts = [
        'start_date' => 'date',
        'monthly_salary' => 'decimal:2',
    ];

    public function graduate(): BelongsTo
    {
        return $this->belongsTo(Graduate::class);
    }
}
