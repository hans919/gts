import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileDown, Image as ImageIcon, Save, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GraduatePortalHeader from '@/components/graduate/GraduatePortalHeader';
import OxfordResumeTemplate from '@/components/resume/OxfordResumeTemplate';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumeData {
  // Personal Information
  fullName: string;
  address: string;
  phone: string;
  email: string;

  // Professional Summary
  professionalSummary: string;

  // Work History
  workHistory: Array<{
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    responsibilities: string[];
  }>;

  // Skills
  skills: {
    column1: string[];
    column2: string[];
  };

  // Education
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    professionalSummary: '',
    workHistory: [
      {
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        responsibilities: ['']
      }
    ],
    skills: {
      column1: [''],
      column2: ['']
    },
    education: [
      {
        degree: '',
        institution: '',
        year: ''
      }
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  const handleWorkHistoryChange = (index: number, field: string, value: any) => {
    const newWorkHistory = [...resumeData.workHistory];
    newWorkHistory[index] = { ...newWorkHistory[index], [field]: value };
    setResumeData({ ...resumeData, workHistory: newWorkHistory });
  };

  const handleResponsibilityChange = (workIndex: number, respIndex: number, value: string) => {
    const newWorkHistory = [...resumeData.workHistory];
    newWorkHistory[workIndex].responsibilities[respIndex] = value;
    setResumeData({ ...resumeData, workHistory: newWorkHistory });
  };

  const addResponsibility = (workIndex: number) => {
    const newWorkHistory = [...resumeData.workHistory];
    newWorkHistory[workIndex].responsibilities.push('');
    setResumeData({ ...resumeData, workHistory: newWorkHistory });
  };

  const removeResponsibility = (workIndex: number, respIndex: number) => {
    const newWorkHistory = [...resumeData.workHistory];
    newWorkHistory[workIndex].responsibilities.splice(respIndex, 1);
    setResumeData({ ...resumeData, workHistory: newWorkHistory });
  };

  const addWorkHistory = () => {
    setResumeData({
      ...resumeData,
      workHistory: [
        ...resumeData.workHistory,
        {
          position: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          responsibilities: ['']
        }
      ]
    });
  };

  const removeWorkHistory = (index: number) => {
    const newWorkHistory = resumeData.workHistory.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, workHistory: newWorkHistory });
  };

  const handleSkillChange = (column: 'column1' | 'column2', index: number, value: string) => {
    const newSkills = { ...resumeData.skills };
    newSkills[column][index] = value;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const addSkill = (column: 'column1' | 'column2') => {
    const newSkills = { ...resumeData.skills };
    newSkills[column].push('');
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const removeSkill = (column: 'column1' | 'column2', index: number) => {
    const newSkills = { ...resumeData.skills };
    newSkills[column].splice(index, 1);
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { degree: '', institution: '', year: '' }]
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: newEducation });
  };

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    try {
      const element = resumeRef.current;
      
      // Capture the resume as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.fullName || 'Resume'}_CV.pdf`);

      toast({
        title: "Success!",
        description: "Resume downloaded as PDF",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsImage = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    try {
      const element = resumeRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${resumeData.fullName || 'Resume'}_CV.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast({
            title: "Success!",
            description: "Resume downloaded as image",
          });
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveResume = () => {
    // Save to localStorage
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast({
      title: "Saved!",
      description: "Resume data saved successfully",
    });
  };

  const loadResume = () => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      setResumeData(JSON.parse(saved));
      toast({
        title: "Loaded!",
        description: "Resume data loaded successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GraduatePortalHeader 
        title="Resume Builder" 
        subtitle="Create your professional resume with Oxford template"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/graduate/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Save your progress or download your resume</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button onClick={saveResume} variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>
                <Button onClick={loadResume} variant="outline">
                  Load Saved
                </Button>
                <Button onClick={downloadAsPDF} disabled={isGenerating}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={downloadAsImage} disabled={isGenerating}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Download Image
                </Button>
                <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
                  {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={resumeData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Jasmine Thomas"
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    value={resumeData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="19 Jamieson Walk, Glasgow G12 1RJ"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={resumeData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="967654323"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="jasmine.thomas@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  value={resumeData.professionalSummary}
                  onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
                  placeholder="Self-motivated professional with comprehensive experience..."
                />
              </CardContent>
            </Card>

            {/* Work History */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Work History</CardTitle>
                  <Button onClick={addWorkHistory} size="sm">Add Position</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.workHistory.map((work, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">Position {index + 1}</h4>
                      {resumeData.workHistory.length > 1 && (
                        <Button onClick={() => removeWorkHistory(index)} size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Position Title"
                        value={work.position}
                        onChange={(e) => handleWorkHistoryChange(index, 'position', e.target.value)}
                      />
                      <Input
                        placeholder="Company Name"
                        value={work.company}
                        onChange={(e) => handleWorkHistoryChange(index, 'company', e.target.value)}
                      />
                      <Input
                        placeholder="Location"
                        value={work.location}
                        onChange={(e) => handleWorkHistoryChange(index, 'location', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Start Date</Label>
                          <Input
                            placeholder="MM/YYYY"
                            value={work.startDate}
                            onChange={(e) => handleWorkHistoryChange(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">End Date</Label>
                          <Input
                            placeholder="MM/YYYY or Current"
                            value={work.endDate}
                            onChange={(e) => handleWorkHistoryChange(index, 'endDate', e.target.value)}
                            disabled={work.isCurrent}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={work.isCurrent}
                          onChange={(e) => handleWorkHistoryChange(index, 'isCurrent', e.target.checked)}
                          className="rounded"
                        />
                        <Label className="text-sm">Current Position</Label>
                      </div>
                      <div>
                        <Label className="text-sm mb-2 block">Responsibilities</Label>
                        {work.responsibilities.map((resp, respIndex) => (
                          <div key={respIndex} className="flex gap-2 mb-2">
                            <Input
                              placeholder="• Responsibility description"
                              value={resp}
                              onChange={(e) => handleResponsibilityChange(index, respIndex, e.target.value)}
                            />
                            {work.responsibilities.length > 1 && (
                              <Button
                                onClick={() => removeResponsibility(index, respIndex)}
                                size="sm"
                                variant="ghost"
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button onClick={() => addResponsibility(index)} size="sm" variant="outline">
                          + Add Responsibility
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add your professional skills (two columns)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Column 1</Label>
                    {resumeData.skills.column1.map((skill, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Skill"
                          value={skill}
                          onChange={(e) => handleSkillChange('column1', index, e.target.value)}
                        />
                        {resumeData.skills.column1.length > 1 && (
                          <Button
                            onClick={() => removeSkill('column1', index)}
                            size="sm"
                            variant="ghost"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button onClick={() => addSkill('column1')} size="sm" variant="outline">
                      + Add Skill
                    </Button>
                  </div>
                  <div>
                    <Label className="mb-2 block">Column 2</Label>
                    {resumeData.skills.column2.map((skill, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Skill"
                          value={skill}
                          onChange={(e) => handleSkillChange('column2', index, e.target.value)}
                        />
                        {resumeData.skills.column2.length > 1 && (
                          <Button
                            onClick={() => removeSkill('column2', index)}
                            size="sm"
                            variant="ghost"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button onClick={() => addSkill('column2')} size="sm" variant="outline">
                      + Add Skill
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Education</CardTitle>
                  <Button onClick={addEducation} size="sm">Add Education</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">Education {index + 1}</h4>
                      {resumeData.education.length > 1 && (
                        <Button onClick={() => removeEducation(index)} size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Degree and Major (e.g., Bachelor of Science: Computer Science)"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      />
                      <Input
                        placeholder="Institution (e.g., University of Glasgow)"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      />
                      <Input
                        placeholder="Year (e.g., 2020)"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>This is how your resume will look</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4">
                  <div className="bg-gray-100 p-2 sm:p-4 overflow-y-auto overflow-x-hidden flex justify-center items-start" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    <div className="bg-white shadow-xl" style={{ transform: 'scale(0.45)', transformOrigin: 'top center', width: '210mm', minHeight: '297mm' }}>
                      <OxfordResumeTemplate data={resumeData} ref={resumeRef} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
