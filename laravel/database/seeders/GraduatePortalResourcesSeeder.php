<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GraduatePortalResourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Jobs
        \DB::table('jobs')->insert([
            [
                'title' => 'Software Engineer',
                'company' => 'Tech Corp Philippines',
                'location' => 'Manila, Philippines',
                'type' => 'Full-time',
                'salary_range' => '₱40,000 - ₱60,000',
                'description' => 'We are looking for experienced software engineers to join our growing development team. Must have strong knowledge in PHP, Laravel, React, and modern web technologies.',
                'external_link' => 'https://example.com/jobs/software-engineer',
                'posted_date' => now()->subDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Data Analyst',
                'company' => 'Analytics Inc',
                'location' => 'Quezon City, Philippines',
                'type' => 'Full-time',
                'salary_range' => '₱35,000 - ₱50,000',
                'description' => 'Seeking data analysts with strong analytical skills. Experience with SQL, Python, and data visualization tools required.',
                'external_link' => 'https://example.com/jobs/data-analyst',
                'posted_date' => now()->subDays(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Marketing Coordinator',
                'company' => 'Brand Solutions Co.',
                'location' => 'Makati, Philippines',
                'type' => 'Full-time',
                'salary_range' => '₱30,000 - ₱45,000',
                'description' => 'Looking for a creative marketing coordinator to manage social media campaigns and digital marketing strategies.',
                'external_link' => 'https://example.com/jobs/marketing-coordinator',
                'posted_date' => now()->subDays(3),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Web Developer Intern',
                'company' => 'StartUp Hub',
                'location' => 'Remote',
                'type' => 'Internship',
                'salary_range' => '₱15,000 - ₱20,000',
                'description' => 'Internship opportunity for web development students. Learn modern frameworks and gain real-world experience.',
                'external_link' => 'https://example.com/jobs/web-dev-intern',
                'posted_date' => now()->subDays(1),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed Career Services
        \DB::table('career_services')->insert([
            [
                'name' => 'Career Counseling Center',
                'description' => 'Professional career guidance and counseling services for alumni. Schedule one-on-one sessions with career advisors.',
                'contact_email' => 'careers@university.edu',
                'contact_phone' => '(02) 123-4567',
                'website' => 'https://university.edu/careers',
                'category' => 'Counseling',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Resume Review Service',
                'description' => 'Get your resume reviewed by career experts. Receive feedback and suggestions to improve your CV.',
                'contact_email' => 'resume@university.edu',
                'contact_phone' => '(02) 123-4568',
                'website' => 'https://university.edu/resume',
                'category' => 'Career Development',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Interview Preparation Workshop',
                'description' => 'Practice interview skills with mock interviews and expert feedback. Learn how to ace your job interviews.',
                'contact_email' => 'interview@university.edu',
                'contact_phone' => '(02) 123-4569',
                'website' => 'https://university.edu/interview-prep',
                'category' => 'Career Development',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed Training Programs
        \DB::table('training_programs')->insert([
            [
                'title' => 'Digital Marketing Masterclass',
                'provider' => 'University Extension',
                'description' => 'Comprehensive training on modern digital marketing strategies including SEO, social media marketing, content creation, and analytics.',
                'duration' => '8 weeks',
                'schedule' => 'Saturdays, 9:00 AM - 5:00 PM',
                'registration_link' => 'https://university.edu/training/digital-marketing',
                'category' => 'Marketing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Data Science Bootcamp',
                'provider' => 'Tech Academy',
                'description' => 'Intensive bootcamp covering data analysis, machine learning, Python programming, and data visualization tools.',
                'duration' => '12 weeks',
                'schedule' => 'Weekdays, 6:00 PM - 9:00 PM',
                'registration_link' => 'https://techacademy.com/data-science',
                'category' => 'Technology',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Project Management Professional (PMP) Prep',
                'provider' => 'Professional Institute',
                'description' => 'Prepare for PMP certification with comprehensive training covering all knowledge areas and best practices.',
                'duration' => '6 weeks',
                'schedule' => 'Saturdays & Sundays, 1:00 PM - 5:00 PM',
                'registration_link' => 'https://profinstitute.com/pmp',
                'category' => 'Management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Web Development Full Stack',
                'provider' => 'Code Academy',
                'description' => 'Learn full-stack web development from scratch. Covers HTML, CSS, JavaScript, React, Node.js, and databases.',
                'duration' => '16 weeks',
                'schedule' => 'Flexible online learning',
                'registration_link' => 'https://codeacademy.com/fullstack',
                'category' => 'Technology',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        echo "Graduate portal resources seeded successfully!\n";
    }
}
