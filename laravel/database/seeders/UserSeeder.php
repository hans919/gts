<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
        ]);

        // Create graduate user
        \App\Models\User::create([
            'name' => 'John Doe',
            'email' => 'john@test.com',
            'password' => bcrypt('password123'),
            'role' => 'graduate',
        ]);

        echo "✓ Admin user created: admin@test.com / password123\n";
        echo "✓ Graduate user created: john@test.com / password123\n";
    }
}
