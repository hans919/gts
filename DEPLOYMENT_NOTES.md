# Deployment Notes for Profile Photo Fix

## Issue
Profile photos were not displaying correctly in the graduate dashboard header because:
1. Frontend was using hardcoded localhost URL
2. Backend wasn't returning the full URL for the profile photo

## Changes Made

### Backend (Laravel)
1. **Graduate Model** (`app/Models/Graduate.php`)
   - Added `profile_photo_url` to `$appends` array
   - Created `getProfilePhotoUrlAttribute()` accessor that returns full URL

2. **GraduateProfileController** (`app/Http/Controllers/GraduateProfileController.php`)
   - Modified `uploadProfilePhoto()` method to return both `profile_photo` path and `profile_photo_url` full URL

### Frontend (React)
1. **GraduateDashboard.tsx**
   - Updated interface to include `profile_photo_url?: string`
   - Changed header to use `profile.profile_photo_url` instead of manually constructing URL

2. **GraduateSettings.tsx**
   - Updated to use `profile_photo_url` from API response
   - Stores both path and URL in localStorage

## Required Server Setup

**IMPORTANT**: You need to run this command on your Hostinger server:

```bash
cd /path/to/your/laravel/app
php artisan storage:link
```

This creates a symbolic link from `public/storage` to `storage/app/public`, which allows the uploaded profile photos to be accessible via the web.

## How to Deploy on Hostinger

1. SSH into your Hostinger server
2. Navigate to your Laravel application directory
3. Pull the latest changes: `git pull origin main`
4. Create the storage link (if not already created):
   ```bash
   php artisan storage:link
   ```
5. Verify the link exists:
   ```bash
   ls -la public/storage
   ```
   You should see it's a symlink pointing to `../storage/app/public`

## Testing
1. Log in to the graduate portal
2. Go to Settings
3. Upload a profile photo
4. The photo should immediately appear in:
   - The Settings page preview
   - The header profile dropdown (after page reload)

## API Response Format

### GET /api/graduate/profile
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "profile_photo": "profile-photos/abc123.jpg",
  "profile_photo_url": "https://lightsteelblue-locust-816886.hostingersite.com/storage/profile-photos/abc123.jpg",
  ...
}
```

### POST /api/graduate/profile-photo
```json
{
  "message": "Profile photo uploaded successfully",
  "profile_photo": "profile-photos/abc123.jpg",
  "profile_photo_url": "https://lightsteelblue-locust-816886.hostingersite.com/storage/profile-photos/abc123.jpg"
}
```
