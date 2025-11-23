import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Calendar, GraduationCap, Briefcase, Save, X, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GraduatePortalHeader from '@/components/graduate/GraduatePortalHeader';
import axios from 'axios';

interface GraduateProfile {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  program: string;
  major: string;
  degree_level: string;
  graduation_year: string;
  graduation_date: string;
  current_status: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  profile_photo?: string;
  profile_photo_url?: string;
}

export default function GraduateDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<GraduateProfile | null>(null);
  const [formData, setFormData] = useState<Partial<GraduateProfile>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userStr);
      if (user.role !== 'graduate') {
        navigate('/dashboard'); // Redirect non-graduates to admin dashboard
        return;
      }

      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure HTTPS URL for profile photo
      const profileData = response.data;
      if (profileData.profile_photo_url) {
        profileData.profile_photo_url = profileData.profile_photo_url.replace('http://', 'https://');
      }

      setProfile(profileData);
      setFormData(profileData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfile(response.data);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <GraduatePortalHeader 
        title="Graduate Portal"
        subtitle={`Welcome back, ${profile.first_name}!`}
        profile={profile}
        onProfileUpdate={() => setEditing(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Edit Profile Alert */}
          {editing && (
            <Card className="border-blue-500 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Edit Mode Active</h3>
                    <p className="text-sm text-blue-700">Make your changes below and click Save when done.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/graduate/survey')}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Employment Survey
                </CardTitle>
                <CardDescription>
                  Update your current employment status
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/graduate/career-updates')}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Career Updates
                </CardTitle>
                <CardDescription>
                  Log job changes and promotions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/graduate/survey-history')}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                  Survey History
                </CardTitle>
                <CardDescription>
                  Track your completed surveys
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/graduate/privacy')}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building className="mr-2 h-5 w-5 text-primary" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/graduate/resources')}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Alumni Resources
                </CardTitle>
                <CardDescription>
                  Jobs, services, and training programs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/graduate/support')}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Support & Feedback
                </CardTitle>
                <CardDescription>
                  Get help and submit feedback
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic contact and personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="student_id">Student ID</Label>
                  <Input
                    id="student_id"
                    name="student_id"
                    value={formData.student_id || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your educational background and graduation details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Input
                    id="program"
                    name="program"
                    value={formData.program || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major/Specialization</Label>
                  <Input
                    id="major"
                    name="major"
                    value={formData.major || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="degree_level">Degree Level</Label>
                  <Input
                    id="degree_level"
                    name="degree_level"
                    value={formData.degree_level || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduation_date">Graduation Date</Label>
                  <Input
                    id="graduation_date"
                    name="graduation_date"
                    type="date"
                    value={formData.graduation_date || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Your current residential address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
