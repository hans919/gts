import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Settings() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue="Admin User"
                placeholder="Enter your name"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                This is your public display name. It can be your real name or a pseudonym.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@test.com"
                placeholder="Enter your email"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                We'll send notifications to this email address.
              </p>
            </div>

            <Button>Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Email notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications for new graduates
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-input"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Survey alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when surveys are completed
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-input"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Weekly reports</div>
                  <div className="text-sm text-muted-foreground">
                    Receive a weekly analytics digest
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Change password</div>
                <div className="text-sm text-muted-foreground">
                  Update your account password
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Two-factor authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>
              Configure system-wide settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="academic_year">Academic Year</Label>
              <select
                id="academic_year"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option>2024-2025</option>
                <option>2023-2024</option>
                <option>2022-2023</option>
              </select>
              <p className="text-[0.8rem] text-muted-foreground">
                Select the current academic year for reports
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="survey_duration">Default Survey Duration (days)</Label>
              <Input
                id="survey_duration"
                type="number"
                defaultValue="30"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Default duration for new surveys
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
