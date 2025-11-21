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
        Schema::create('privacy_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->boolean('share_employment_data')->default(true);
            $table->boolean('share_contact_info')->default(false);
            $table->boolean('share_with_employers')->default(false);
            $table->boolean('receive_job_alerts')->default(true);
            $table->boolean('receive_event_notifications')->default(true);
            $table->boolean('receive_survey_reminders')->default(true);
            $table->boolean('allow_alumni_network')->default(true);
            $table->enum('profile_visibility', ['public', 'alumni_only', 'private'])->default('alumni_only');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('privacy_settings');
    }
};
