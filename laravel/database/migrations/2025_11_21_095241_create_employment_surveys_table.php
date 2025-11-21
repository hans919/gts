<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employment_surveys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('graduate_id')->constrained('graduates')->onDelete('cascade');
            $table->string('employment_status', 100);
            $table->string('company_name')->nullable();
            $table->string('job_title')->nullable();
            $table->string('industry', 100)->nullable();
            $table->string('job_type', 50)->nullable();
            $table->date('start_date')->nullable();
            $table->decimal('monthly_salary', 10, 2)->nullable();
            $table->string('salary_currency', 10)->default('PHP');
            $table->string('job_location_city', 100)->nullable();
            $table->string('job_location_country', 100)->nullable();
            $table->string('is_related_to_course', 100)->nullable();
            $table->string('job_finding_duration_months', 50)->nullable();
            $table->string('job_finding_method')->nullable();
            $table->text('skills_acquired_in_college')->nullable();
            $table->text('additional_trainings')->nullable();
            $table->string('job_satisfaction', 50)->nullable();
            $table->text('career_goals')->nullable();
            $table->string('further_education_plans', 100)->nullable();
            $table->text('comments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employment_surveys');
    }
};
