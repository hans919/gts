import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, GraduationCap, Mail, Lock, Info, Eye, EyeOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        const redirectPath = user.role === 'graduate' ? '/graduate/dashboard' : '/dashboard';
        navigate(redirectPath, { replace: true });
      } catch (error) {
        // Invalid user data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://lightsteelblue-locust-816886.hostingersite.com/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect based on user role - use replace to prevent back navigation
      const userRole = response.data.user.role;
      if (userRole === 'graduate') {
        navigate('/graduate/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true }); // Admin, staff, or other roles
      }
    } catch (err: any) {
      console.error('Login error:', err.response?.data);
      
      // Handle validation errors
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const errorMessages = Object.keys(errors)
          .map(key => errors[key].join(', '))
          .join('\n');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Graduate Tracer System
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Use your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-destructive">Error</p>
                      <pre className="text-sm text-destructive/90 whitespace-pre-wrap mt-1">
                        {error}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@test.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Test Credentials Card */}
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Role-Based Access</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground mb-3">
              Login redirects based on your role:
            </p>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground min-w-[70px]">Admin:</span>
              <div className="flex-1">
                <p className="text-xs">→ Admin Dashboard</p>
                <p className="font-mono text-xs text-muted-foreground">admin@sjcb.edu.ph / admin123</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground min-w-[70px]">Graduate:</span>
              <div className="flex-1">
                <p className="text-xs">→ Graduate Portal</p>
                <p className="font-mono text-xs text-muted-foreground">hans@gmail.com / hans1234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a 
              href="/register" 
              className="text-primary hover:underline font-medium"
            >
              Register as Graduate
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-primary hover:underline font-medium"
          >
            Terms of Service
          </button>
          {' '}and{' '}
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            className="text-primary hover:underline font-medium"
          >
            Privacy Policy
          </button>
        </p>
      </div>

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-3xl max-h-[80vh] flex flex-col">
            <CardHeader className="flex-shrink-0 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Terms of Service</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTerms(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto flex-1 space-y-4 py-6">
              <div className="space-y-4">
                <section>
                  <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
                  <p className="text-sm text-muted-foreground">
                    By accessing and using the SJCB Graduate Tracer System ("the System"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use the System.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">2. Use License</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Permission is granted to temporarily access and use the System for personal, non-commercial purposes subject to the restrictions set in these terms:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li>You must not modify or copy the materials</li>
                    <li>You must not use the materials for any commercial purpose</li>
                    <li>You must not attempt to reverse engineer any software contained in the System</li>
                    <li>You must not remove any copyright or proprietary notations from the materials</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">3. Account Responsibilities</h3>
                  <p className="text-sm text-muted-foreground">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify the System administrators of any unauthorized use of your account.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">4. Data Accuracy</h3>
                  <p className="text-sm text-muted-foreground">
                    You agree to provide accurate, current, and complete information when registering and updating your profile. False or misleading information may result in account termination.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">5. Survey Participation</h3>
                  <p className="text-sm text-muted-foreground">
                    Graduates are expected to participate in employment tracer surveys as part of the institution's quality assurance and improvement initiatives. Survey responses help improve academic programs and career services.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">6. Prohibited Activities</h3>
                  <p className="text-sm text-muted-foreground mb-2">You must not:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Impersonate another person or entity</li>
                    <li>Submit false, misleading, or fraudulent information</li>
                    <li>Attempt to gain unauthorized access to the System</li>
                    <li>Interfere with the proper functioning of the System</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">7. Intellectual Property</h3>
                  <p className="text-sm text-muted-foreground">
                    All content, trademarks, and data on this System, including but not limited to software, databases, text, graphics, icons, and hyperlinks, are the property of SJCB or its content suppliers and are protected by applicable laws.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">8. Limitation of Liability</h3>
                  <p className="text-sm text-muted-foreground">
                    SJCB shall not be liable for any damages arising out of or in connection with the use or inability to use the System, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">9. Modifications to Terms</h3>
                  <p className="text-sm text-muted-foreground">
                    SJCB reserves the right to revise these terms at any time. By using the System, you agree to be bound by the current version of these Terms of Service.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">10. Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    For questions about these Terms of Service, please contact the System Administrator at admin@sjcb.edu.ph
                  </p>
                </section>
              </div>
            </CardContent>
            <div className="flex-shrink-0 border-t p-4">
              <Button onClick={() => setShowTerms(false)} className="w-full">
                I Understand
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-3xl max-h-[80vh] flex flex-col">
            <CardHeader className="flex-shrink-0 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Privacy Policy</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPrivacy(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto flex-1 space-y-4 py-6">
              <div className="space-y-4">
                <section>
                  <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li><strong>Personal Information:</strong> Name, student ID, email address, phone number, date of birth</li>
                    <li><strong>Academic Information:</strong> Program, major, degree level, graduation year</li>
                    <li><strong>Employment Information:</strong> Current employment status, company name, job title, salary range</li>
                    <li><strong>Survey Responses:</strong> Feedback and responses to employment tracer surveys</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li>Track graduate employment outcomes and career progression</li>
                    <li>Improve academic programs and career services</li>
                    <li>Generate statistical reports and analytics (anonymized data)</li>
                    <li>Send notifications about surveys, job opportunities, and career resources</li>
                    <li>Verify your identity and prevent fraud</li>
                    <li>Comply with legal obligations and institutional requirements</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">3. Data Sharing and Disclosure</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li><strong>With CHED and Regulatory Bodies:</strong> For compliance with tracer study requirements</li>
                    <li><strong>With Institutional Stakeholders:</strong> Department heads, program coordinators for program improvement</li>
                    <li><strong>Aggregated Data:</strong> Anonymous statistical data for research and reporting</li>
                    <li><strong>With Your Consent:</strong> When you explicitly authorize sharing (e.g., with potential employers)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    We do not sell or rent your personal information to third parties.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
                  <p className="text-sm text-muted-foreground">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and access controls.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
                    <li><strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
                    <li><strong>Data Portability:</strong> Export your data in a structured format</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">6. Data Retention</h3>
                  <p className="text-sm text-muted-foreground">
                    We retain your information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law or institutional policy. Graduate employment data is typically retained for research and historical purposes.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">7. Cookies and Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies and similar technologies to maintain your session, remember your preferences, and analyze system usage. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">8. Children's Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    This System is intended for use by graduates who are at least 18 years old. We do not knowingly collect information from individuals under 18.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">9. Changes to Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    We may update this Privacy Policy periodically. We will notify you of significant changes via email or system notification. Your continued use of the System constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">10. Contact Us</h3>
                  <p className="text-sm text-muted-foreground">
                    For questions about this Privacy Policy or to exercise your data rights, please contact:
                  </p>
                  <div className="text-sm text-muted-foreground mt-2 ml-4">
                    <p><strong>Data Protection Officer</strong></p>
                    <p>Email: dpo@sjcb.edu.ph</p>
                    <p>Phone: (123) 456-7890</p>
                  </div>
                </section>

                <section className="border-t pt-4 mt-4">
                  <p className="text-xs text-muted-foreground italic">
                    This Privacy Policy is compliant with the Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules and regulations.
                  </p>
                  <p className="text-xs text-muted-foreground italic mt-2">
                    Last Updated: November 22, 2025
                  </p>
                </section>
              </div>
            </CardContent>
            <div className="flex-shrink-0 border-t p-4">
              <Button onClick={() => setShowPrivacy(false)} className="w-full">
                I Understand
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
