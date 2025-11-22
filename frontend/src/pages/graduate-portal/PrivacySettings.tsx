import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Shield, Eye, EyeOff, Lock, Download, Trash2, ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

interface PrivacySettings {
  share_employment_data: boolean;
  share_contact_info: boolean;
  share_with_employers: boolean;
  receive_job_alerts: boolean;
  receive_event_notifications: boolean;
  receive_survey_reminders: boolean;
  allow_alumni_network: boolean;
  profile_visibility: 'public' | 'alumni_only' | 'private';
}

export default function PrivacySettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<PrivacySettings>({
    share_employment_data: true,
    share_contact_info: false,
    share_with_employers: false,
    receive_job_alerts: true,
    receive_event_notifications: true,
    receive_survey_reminders: true,
    allow_alumni_network: true,
    profile_visibility: 'alumni_only',
  });

  useEffect(() => {
    fetchPrivacySettings();
  }, []);

  const fetchPrivacySettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/privacy-settings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSettings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching privacy settings:', error);
      setLoading(false);
    }
  };

  const handleToggle = (key: keyof PrivacySettings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleVisibilityChange = (value: 'public' | 'alumni_only' | 'private') => {
    setSettings({
      ...settings,
      profile_visibility: value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/privacy-settings',
        settings,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Privacy settings updated successfully!');
    } catch (error: any) {
      console.error('Error updating privacy settings:', error);
      alert(error.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const exportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/export-data', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'my-data.json');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data');
    }
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.'
    );

    if (!confirmed) return;

    const doubleConfirm = window.prompt(
      'Type "DELETE" to confirm account deletion:'
    );

    if (doubleConfirm !== 'DELETE') {
      alert('Account deletion cancelled');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/account', {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Your account has been deleted');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/graduate/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Privacy & Data Settings</h1>
                  <p className="text-sm text-muted-foreground">Manage your privacy preferences</p>
                </div>
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Data Sharing */}
        <Card>
          <CardHeader>
            <CardTitle>Data Sharing Preferences</CardTitle>
            <CardDescription>
              Control how your information is shared with the university and third parties
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Share Employment Data</Label>
                <p className="text-sm text-muted-foreground">
                  Allow the university to use your employment data for research and reporting
                </p>
              </div>
              <button
                onClick={() => handleToggle('share_employment_data')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.share_employment_data ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.share_employment_data ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Share Contact Information</Label>
                <p className="text-sm text-muted-foreground">
                  Make your email and phone number visible to other alumni
                </p>
              </div>
              <button
                onClick={() => handleToggle('share_contact_info')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.share_contact_info ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.share_contact_info ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Share with Employers</Label>
                <p className="text-sm text-muted-foreground">
                  Allow potential employers to view your profile through the job board
                </p>
              </div>
              <button
                onClick={() => handleToggle('share_with_employers')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.share_with_employers ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.share_with_employers ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Alumni Network</Label>
                <p className="text-sm text-muted-foreground">
                  Participate in the alumni networking directory
                </p>
              </div>
              <button
                onClick={() => handleToggle('allow_alumni_network')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allow_alumni_network ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allow_alumni_network ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Job Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about new job postings
                </p>
              </div>
              <button
                onClick={() => handleToggle('receive_job_alerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.receive_job_alerts ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.receive_job_alerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Event Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get updates about alumni events and activities
                </p>
              </div>
              <button
                onClick={() => handleToggle('receive_event_notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.receive_event_notifications ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.receive_event_notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Survey Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Receive reminders to complete pending surveys
                </p>
              </div>
              <button
                onClick={() => handleToggle('receive_survey_reminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.receive_survey_reminders ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.receive_survey_reminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Visibility</CardTitle>
            <CardDescription>
              Control who can see your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              onClick={() => handleVisibilityChange('public')}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                settings.profile_visibility === 'public' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 mt-0.5" />
                <div>
                  <Label className="text-base cursor-pointer">Public</Label>
                  <p className="text-sm text-muted-foreground">
                    Anyone can view your profile (name, graduation info, employment status)
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleVisibilityChange('alumni_only')}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                settings.profile_visibility === 'alumni_only' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 mt-0.5" />
                <div>
                  <Label className="text-base cursor-pointer">Alumni Only</Label>
                  <p className="text-sm text-muted-foreground">
                    Only verified alumni can view your profile
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleVisibilityChange('private')}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                settings.profile_visibility === 'private' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <EyeOff className="h-5 w-5 mt-0.5" />
                <div>
                  <Label className="text-base cursor-pointer">Private</Label>
                  <p className="text-sm text-muted-foreground">
                    Only you and administrators can view your profile
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Download or delete your personal data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={exportData}>
              <Download className="mr-2 h-4 w-4" />
              Download My Data
            </Button>
            <p className="text-xs text-muted-foreground px-1">
              Export all your personal data in JSON format
            </p>

            <div className="pt-4 border-t">
              <Button variant="destructive" className="w-full justify-start" onClick={deleteAccount}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete My Account
              </Button>
              <p className="text-xs text-destructive px-1 mt-2">
                ⚠️ Warning: This action is permanent and cannot be undone
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
