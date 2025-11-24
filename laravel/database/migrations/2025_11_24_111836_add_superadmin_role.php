<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Modify the enum to include super_admin
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'graduate', 'super_admin') DEFAULT 'graduate'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove super_admin from enum
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'graduate') DEFAULT 'graduate'");
    }
};
