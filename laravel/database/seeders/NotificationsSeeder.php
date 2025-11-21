<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $graduate = \DB::table('graduates')->where('email', 'graduate@test.com')->first();
        
        if (!$graduate) {
            echo "Graduate not found!\n";
            return;
        }

        \DB::table('notifications')->insert([
            [
                'graduate_id' => $graduate->id,
                'type' => 'survey',
                'title' => 'Employment Survey Reminder',
                'message' => 'Please complete your annual employment survey by December 31, 2025',
                'priority' => 'high',
                'read' => false,
                'action_url' => '/graduate/survey',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'graduate_id' => $graduate->id,
                'type' => 'announcement',
                'title' => 'New Job Postings Available',
                'message' => '4 new job opportunities have been added to the alumni resources section',
                'priority' => 'medium',
                'read' => false,
                'action_url' => '/graduate/resources',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'graduate_id' => $graduate->id,
                'type' => 'event',
                'title' => 'Alumni Career Fair 2025',
                'message' => 'Join us for the annual alumni career fair on January 15, 2025',
                'priority' => 'medium',
                'read' => true,
                'action_url' => '/graduate/resources',
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(3),
            ],
            [
                'graduate_id' => $graduate->id,
                'type' => 'reminder',
                'title' => 'Update Your Profile',
                'message' => 'Keep your professional profile up to date with your latest achievements',
                'priority' => 'low',
                'read' => false,
                'action_url' => '/graduate/dashboard',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
        ]);

        echo "Notifications created successfully!\n";
    }
}
