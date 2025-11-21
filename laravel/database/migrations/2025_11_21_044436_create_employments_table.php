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
        Schema::create('employments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('graduate_id')->constrained()->onDelete('cascade');
            $table->string('company_name');
            $table->string('job_title');
            $table->enum('employment_status', ['employed', 'self-employed', 'unemployed', 'pursuing_higher_education', 'other']);
            $table->enum('job_type', ['full-time', 'part-time', 'contract', 'internship', 'freelance'])->nullable();
            $table->text('job_description')->nullable();
            $table->string('industry')->nullable();
            $table->decimal('monthly_salary', 10, 2)->nullable();
            $table->string('salary_currency')->default('USD');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(true);
            $table->enum('job_relevance', ['highly_relevant', 'relevant', 'somewhat_relevant', 'not_relevant'])->nullable();
            $table->text('skills_used')->nullable(); // JSON or comma-separated
            $table->integer('job_satisfaction')->nullable(); // 1-5 scale
            $table->string('company_location')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employments');
    }
};
