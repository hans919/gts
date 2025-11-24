<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin User
        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@sjcb.edu.ph'],
            [
                'name' => 'Super Administrator',
                'email' => 'superadmin@sjcb.edu.ph',
                'password' => Hash::make('SuperAdmin@2025'),
                'role' => 'super_admin',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('✅ Super Admin user created: superadmin@sjcb.edu.ph');
        $this->command->warn('⚠️  Default Password: SuperAdmin@2025 (CHANGE IMMEDIATELY!)');
    }
}
