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
        Schema::table('graduates', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable()->after('alternative_phone');
            $table->date('graduation_date')->nullable()->after('graduation_year');
            $table->string('current_status')->nullable()->after('graduation_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('graduates', function (Blueprint $table) {
            $table->dropColumn(['date_of_birth', 'graduation_date', 'current_status']);
        });
    }
};
