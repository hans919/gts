<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Survey extends Model
{
    protected $fillable = [
        'title',
        'description',
        'questions',
        'start_date',
        'end_date',
        'status',
        'target_graduation_year',
        'target_program',
        'is_anonymous'
    ];

    protected $casts = [
        'questions' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_anonymous' => 'boolean'
    ];

    public function responses(): HasMany
    {
        return $this->hasMany(SurveyResponse::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active')
            ->where('start_date', '<=', now())
            ->where(function($q) {
                $q->whereNull('end_date')
                  ->orWhere('end_date', '>=', now());
            });
    }
}
