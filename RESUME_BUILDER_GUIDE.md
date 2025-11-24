# Resume Builder Module - Graduate Portal

## Overview
A professional resume builder module has been added to the Graduate Portal, allowing graduates to create, preview, and download their resumes using a professional Oxford template design.

## Features

### 1. **Oxford Template Design**
- Professional, clean layout inspired by the Oxford resume format
- Classic serif typography (Georgia font)
- Navy blue accent color (#2c5f7f) for headers
- Well-structured sections with clear visual hierarchy
- Print-optimized A4 format (210mm × 297mm)

### 2. **Resume Sections**
- **Personal Information**: Name, address, phone, email
- **Professional Summary**: Brief career overview
- **Work History**: Multiple positions with:
  - Position title, company, location
  - Date ranges (with "Current" option)
  - Multiple bullet-pointed responsibilities per position
- **Skills**: Two-column layout for organized skill presentation
- **Education**: Degree, institution, and graduation year

### 3. **Interactive Features**
- **Live Preview**: Real-time preview of resume as you type
- **Dynamic Forms**: Add/remove work history, skills, and education entries
- **Save/Load**: Save your progress to browser localStorage
- **Toggle Preview**: Show/hide preview panel for focused editing

### 4. **Export Options**
- **Download as PDF**: High-quality PDF export for printing and email
- **Download as Image**: PNG format for quick sharing
- Both exports maintain professional formatting and layout

## Access

### For Graduates:
1. Log in to the Graduate Portal
2. From the Dashboard, click on the **"Resume Builder"** card
3. Or navigate directly to: `/graduate/resume-builder`

### Navigation
The Resume Builder is accessible from:
- Graduate Dashboard (Quick Actions section)
- Direct URL: `https://yourdomain.com/graduate/resume-builder`

## Usage Guide

### Creating Your Resume

1. **Fill in Personal Information**
   - Enter your full name, contact details
   - All fields update the preview in real-time

2. **Write Professional Summary**
   - Brief paragraph about your skills and experience
   - Keep it concise (3-4 sentences)

3. **Add Work History**
   - Click "Add Position" for multiple jobs
   - Fill in position, company, location
   - Add start/end dates (check "Current Position" if applicable)
   - Add responsibilities as bullet points
   - Click "+ Add Responsibility" for more points

4. **List Your Skills**
   - Two-column layout for better organization
   - Add technical skills, soft skills, languages, etc.
   - Click "+ Add Skill" in each column

5. **Enter Education Details**
   - Add degree and major
   - Institution name
   - Graduation year
   - Click "Add Education" for multiple degrees

### Saving Your Work

- Click **"Save Progress"** to save to browser storage
- Click **"Load Saved"** to restore your last saved version
- Data persists until you clear browser data

### Exporting Your Resume

1. **Review** your resume in the preview panel
2. Choose export option:
   - **Download PDF**: Best for applications and printing
   - **Download Image**: Quick sharing on social media or messaging

## Technical Details

### Components
- **ResumeBuilder** (`pages/graduate-portal/ResumeBuilder.tsx`)
  - Main component with form inputs and state management
  - Handles all user interactions and data flow
  
- **OxfordResumeTemplate** (`components/resume/OxfordResumeTemplate.tsx`)
  - Template component for rendering resume layout
  - Uses forwardRef for PDF/image capture

### Dependencies
- **html2canvas**: Captures resume DOM as canvas
- **jspdf**: Converts canvas to PDF format
- Both installed automatically with the module

### Route
```tsx
/graduate/resume-builder
```
Protected route, accessible only to authenticated graduates.

## Styling Features

### Template Characteristics
- **Font**: Georgia (serif) for professional appearance
- **Font Size**: 11pt body text, 13pt section headers, 22pt name
- **Color Scheme**: 
  - Headers: Navy blue (#2c5f7f)
  - Text: Black (#000)
  - Subtle borders for section separation
- **Layout**: 
  - A4 paper size (210mm × 297mm)
  - 12mm padding all around
  - Justified text for professional look

### Responsive Design
- Desktop: Side-by-side form and preview
- Mobile: Stacked layout with collapsible preview
- Preview panel is sticky on desktop for easy reference

## Data Structure

```typescript
interface ResumeData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  professionalSummary: string;
  workHistory: Array<{
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    responsibilities: string[];
  }>;
  skills: {
    column1: string[];
    column2: string[];
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}
```

## Tips for Best Results

### Content Tips
1. **Keep it concise**: One page is ideal
2. **Use action verbs**: "Managed", "Developed", "Implemented"
3. **Quantify achievements**: Include numbers and metrics
4. **Tailor content**: Customize for each job application

### Technical Tips
1. **Save regularly**: Click "Save Progress" after major changes
2. **Preview before export**: Check layout in preview panel
3. **Test downloads**: Try both PDF and image formats
4. **Use Chrome/Edge**: Best compatibility for PDF generation

### Skills Organization
- **Column 1**: Technical/hard skills
- **Column 2**: Soft skills, languages, certifications

### Professional Summary
- Start with your professional title
- Highlight 2-3 key strengths
- Mention years of experience
- End with career objective or value proposition

## Browser Compatibility

### Recommended Browsers
- ✅ Chrome (Best performance)
- ✅ Microsoft Edge
- ✅ Firefox
- ⚠️ Safari (may have minor rendering differences)

### Requirements
- JavaScript enabled
- LocalStorage enabled (for save/load feature)
- Modern browser (ES6+ support)

## Future Enhancements (Planned)

- [ ] Multiple template options (Modern, Minimal, Creative)
- [ ] Auto-fill from graduate profile data
- [ ] Cloud storage for resume data
- [ ] Template customization (colors, fonts)
- [ ] Resume analytics and tips
- [ ] Share resume link feature
- [ ] Export to Word document format

## Support

For issues or questions:
- Navigate to **Support & Feedback** in Graduate Portal
- Submit a support ticket
- Include screenshots if reporting export issues

## Version History

**Version 1.0** (November 2025)
- Initial release
- Oxford template
- PDF and image export
- LocalStorage save/load
- Live preview
- Responsive design

---

**Note**: This is a general-purpose resume builder suitable for all graduates, not specific to any program or major. Customize the content to match your field and experience level.
