<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Graduate extends Model
{
    protected $fillable = [
        'user_id',
        'student_id',
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'phone',
        'alternative_email',
        'alternative_phone',
        'program',
        'major',
        'graduation_year',
        'degree_level',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'gpa'
    ];

    protected $casts = [
        'graduation_year' => 'integer',
        'gpa' => 'decimal:2'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function employments(): HasMany
    {
        return $this->hasMany(Employment::class);
    }

    public function surveyResponses(): HasMany
    {
        return $this->hasMany(SurveyResponse::class);
    }

    public function currentEmployment()
    {
        return $this->hasOne(Employment::class)->where('is_current', true);
    }
}
