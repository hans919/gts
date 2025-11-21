<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employment extends Model
{
    protected $fillable = [
        'graduate_id',
        'company_name',
        'job_title',
        'employment_status',
        'job_type',
        'job_description',
        'industry',
        'monthly_salary',
        'salary_currency',
        'start_date',
        'end_date',
        'is_current',
        'job_relevance',
        'skills_used',
        'job_satisfaction',
        'company_location'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'monthly_salary' => 'decimal:2',
        'job_satisfaction' => 'integer'
    ];

    public function graduate(): BelongsTo
    {
        return $this->belongsTo(Graduate::class);
    }
}
