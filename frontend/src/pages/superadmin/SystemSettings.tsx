import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Settings,
  Mail,
  FileText,
  Sliders,
  Key,
  Save,
  Globe,
  Server,
  Shield,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import api from '@/services/api';

interface SystemSettings {
  general: {
    app_name: string;
    app_url: string;
    timezone: string;
    items_per_page: number;
  };
  email: {
    from_name: string;
    from_address: string;
    smtp_host: string;
    smtp_port: number;
    smtp_encryption: string;
  };
  email_templates: {
    welcome_subject: string;
    welcome_body: string;
    password_reset_subject: string;
    password_reset_body: string;
    notification_subject: string;
    notification_body: string;
  };
  application: {
    max_upload_size: number;
    allowed_file_types: string[];
    session_timeout: number;
    password_min_length: number;
    enable_2fa: boolean;
    enable_email_verification: boolean;
  };
  api_keys: {
    google_client_id: string;
    google_client_secret: string;
    facebook_app_id: string;
    facebook_app_secret: string;
    smtp_api_key: string;
  };
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/superadmin/settings');
      setSettings(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (section: keyof SystemSettings) => {
    if (!settings) return;

    try {
      setSaving(true);
      await api.put('/superadmin/settings', {
        section,
        settings: settings[section],
      });

      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateGeneralSetting = (key: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [key]: value,
      },
    });
  };

  const updateEmailSetting = (key: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      email: {
        ...settings.email,
        [key]: value,
      },
    });
  };

  const updateEmailTemplate = (key: string, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      email_templates: {
        ...settings.email_templates,
        [key]: value,
      },
    });
  };

  const updateApplicationSetting = (key: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      application: {
        ...settings.application,
        [key]: value,
      },
    });
  };

  const updateApiKey = (key: string, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      api_keys: {
        ...settings.api_keys,
        [key]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Settings className="h-8 w-8" />
          System Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure system-wide settings, email templates, and API integrations
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="application" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            Application
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Modify basic system configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app_name">Application Name</Label>
                  <Input
                    id="app_name"
                    value={settings.general.app_name}
                    onChange={(e) => updateGeneralSetting('app_name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app_url">Application URL</Label>
                  <Input
                    id="app_url"
                    value={settings.general.app_url}
                    onChange={(e) => updateGeneralSetting('app_url', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={settings.general.timezone}
                    onChange={(e) => updateGeneralSetting('timezone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="items_per_page">Items Per Page</Label>
                  <Input
                    id="items_per_page"
                    type="number"
                    value={settings.general.items_per_page}
                    onChange={(e) => updateGeneralSetting('items_per_page', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSection('general')}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save General Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure SMTP and email sender settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from_name">From Name</Label>
                  <Input
                    id="from_name"
                    value={settings.email.from_name}
                    onChange={(e) => updateEmailSetting('from_name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from_address">From Email Address</Label>
                  <Input
                    id="from_address"
                    type="email"
                    value={settings.email.from_address}
                    onChange={(e) => updateEmailSetting('from_address', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    value={settings.email.smtp_host}
                    onChange={(e) => updateEmailSetting('smtp_host', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp_port">SMTP Port</Label>
                    <Input
                      id="smtp_port"
                      type="number"
                      value={settings.email.smtp_port}
                      onChange={(e) => updateEmailSetting('smtp_port', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp_encryption">Encryption</Label>
                    <Input
                      id="smtp_encryption"
                      value={settings.email.smtp_encryption}
                      onChange={(e) => updateEmailSetting('smtp_encryption', e.target.value)}
                      placeholder="tls, ssl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSection('email')}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Email Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Email Templates
              </CardTitle>
              <CardDescription>
                Customize email notification templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {/* Welcome Email */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Welcome Email</h3>
                  <div className="space-y-2">
                    <Label htmlFor="welcome_subject">Subject</Label>
                    <Input
                      id="welcome_subject"
                      value={settings.email_templates.welcome_subject}
                      onChange={(e) => updateEmailTemplate('welcome_subject', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="welcome_body">Body</Label>
                    <Textarea
                      id="welcome_body"
                      value={settings.email_templates.welcome_body}
                      onChange={(e) => updateEmailTemplate('welcome_body', e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-gray-500">Use {'{name}'} for user's name</p>
                  </div>
                </div>

                {/* Password Reset Email */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Password Reset Email</h3>
                  <div className="space-y-2">
                    <Label htmlFor="password_reset_subject">Subject</Label>
                    <Input
                      id="password_reset_subject"
                      value={settings.email_templates.password_reset_subject}
                      onChange={(e) => updateEmailTemplate('password_reset_subject', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password_reset_body">Body</Label>
                    <Textarea
                      id="password_reset_body"
                      value={settings.email_templates.password_reset_body}
                      onChange={(e) => updateEmailTemplate('password_reset_body', e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-gray-500">Use {'{link}'} for reset link</p>
                  </div>
                </div>

                {/* Notification Email */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Notification Email</h3>
                  <div className="space-y-2">
                    <Label htmlFor="notification_subject">Subject</Label>
                    <Input
                      id="notification_subject"
                      value={settings.email_templates.notification_subject}
                      onChange={(e) => updateEmailTemplate('notification_subject', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notification_body">Body</Label>
                    <Textarea
                      id="notification_body"
                      value={settings.email_templates.notification_body}
                      onChange={(e) => updateEmailTemplate('notification_body', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSection('email_templates')}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Email Templates'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Application Constants */}
        <TabsContent value="application">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5" />
                Application Constants
              </CardTitle>
              <CardDescription>
                Configure application limits and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max_upload_size">Max Upload Size (MB)</Label>
                  <Input
                    id="max_upload_size"
                    type="number"
                    value={settings.application.max_upload_size}
                    onChange={(e) => updateApplicationSetting('max_upload_size', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowed_file_types">Allowed File Types</Label>
                  <Input
                    id="allowed_file_types"
                    value={settings.application.allowed_file_types.join(', ')}
                    onChange={(e) => updateApplicationSetting('allowed_file_types', e.target.value.split(',').map(t => t.trim()))}
                    placeholder="pdf, doc, docx, jpg, png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session_timeout"
                    type="number"
                    value={settings.application.session_timeout}
                    onChange={(e) => updateApplicationSetting('session_timeout', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_min_length">Minimum Password Length</Label>
                  <Input
                    id="password_min_length"
                    type="number"
                    value={settings.application.password_min_length}
                    onChange={(e) => updateApplicationSetting('password_min_length', parseInt(e.target.value))}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-500">
                      Enable 2FA for enhanced security
                    </p>
                  </div>
                  <Switch
                    checked={settings.application.enable_2fa}
                    onCheckedChange={(checked) => updateApplicationSetting('enable_2fa', checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Verification
                    </Label>
                    <p className="text-sm text-gray-500">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.application.enable_email_verification}
                    onCheckedChange={(checked) => updateApplicationSetting('enable_email_verification', checked)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSection('application')}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Application Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys & Integrations
              </CardTitle>
              <CardDescription>
                Manage third-party API keys and service integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {/* Google OAuth */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Google OAuth
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="google_client_id">Client ID</Label>
                    <Input
                      id="google_client_id"
                      type="password"
                      value={settings.api_keys.google_client_id}
                      onChange={(e) => updateApiKey('google_client_id', e.target.value)}
                      placeholder="Enter Google Client ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="google_client_secret">Client Secret</Label>
                    <Input
                      id="google_client_secret"
                      type="password"
                      value={settings.api_keys.google_client_secret}
                      onChange={(e) => updateApiKey('google_client_secret', e.target.value)}
                      placeholder="Enter Google Client Secret"
                    />
                  </div>
                </div>

                {/* Facebook OAuth */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Facebook OAuth
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="facebook_app_id">App ID</Label>
                    <Input
                      id="facebook_app_id"
                      type="password"
                      value={settings.api_keys.facebook_app_id}
                      onChange={(e) => updateApiKey('facebook_app_id', e.target.value)}
                      placeholder="Enter Facebook App ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook_app_secret">App Secret</Label>
                    <Input
                      id="facebook_app_secret"
                      type="password"
                      value={settings.api_keys.facebook_app_secret}
                      onChange={(e) => updateApiKey('facebook_app_secret', e.target.value)}
                      placeholder="Enter Facebook App Secret"
                    />
                  </div>
                </div>

                {/* SMTP API Key */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    SMTP Service
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="smtp_api_key">API Key</Label>
                    <Input
                      id="smtp_api_key"
                      type="password"
                      value={settings.api_keys.smtp_api_key}
                      onChange={(e) => updateApiKey('smtp_api_key', e.target.value)}
                      placeholder="Enter SMTP API Key"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSection('api_keys')}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save API Keys'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
