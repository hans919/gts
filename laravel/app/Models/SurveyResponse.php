<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SurveyResponse extends Model
{
    protected $fillable = [
        'survey_id',
        'graduate_id',
        'responses',
        'submitted_at',
        'is_complete'
    ];

    protected $casts = [
        'responses' => 'array',
        'submitted_at' => 'datetime',
        'is_complete' => 'boolean'
    ];

    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    public function graduate(): BelongsTo
    {
        return $this->belongsTo(Graduate::class);
    }
}
