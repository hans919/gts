<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Graduate;

class TestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Admin User',
                'email' => 'admin@test.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        echo "✅ Admin user created: admin@test.com / password123\n";

        // Create Graduate User
        $graduateUser = User::updateOrCreate(
            ['email' => 'graduate@test.com'],
            [
                'name' => 'Juan Dela Cruz',
                'email' => 'graduate@test.com',
                'password' => Hash::make('password123'),
                'role' => 'graduate',
                'email_verified_at' => now(),
            ]
        );

        // Create Graduate Profile
        $graduate = Graduate::updateOrCreate(
            ['email' => 'graduate@test.com'],
            [
                'user_id' => $graduateUser->id,
                'student_id' => '2024-00001',
                'first_name' => 'Juan',
                'last_name' => 'Dela Cruz',
                'email' => 'graduate@test.com',
                'phone' => '+63 912 345 6789',
                'date_of_birth' => '2000-01-15',
                'program' => 'Bachelor of Science in Information Technology',
                'major' => 'Web Development',
                'degree_level' => 'Bachelor',
                'graduation_year' => 2024,
                'graduation_date' => '2024-05-15',
                'current_status' => 'Employed',
                'address' => '123 Main Street',
                'city' => 'Manila',
                'state' => 'Metro Manila',
                'postal_code' => '1000',
                'country' => 'Philippines',
            ]
        );

        echo "✅ Graduate user created: graduate@test.com / password123\n";
        echo "✅ Graduate profile created: Student ID 2024-00001\n";
    }
}
