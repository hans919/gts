import { forwardRef } from 'react';

interface WorkHistory {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface ResumeData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  professionalSummary: string;
  workHistory: WorkHistory[];
  skills: {
    column1: string[];
    column2: string[];
  };
  education: Education[];
}

interface OxfordResumeTemplateProps {
  data: ResumeData;
}

const OxfordResumeTemplate = forwardRef<HTMLDivElement, OxfordResumeTemplateProps>(
  ({ data }, ref) => {
    return (
      <div 
        ref={ref} 
        className="bg-white p-12 w-[210mm] min-h-[297mm] mx-auto"
        style={{ 
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '11pt',
          lineHeight: '1.4',
          color: '#000'
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-6 pb-4" style={{ borderBottom: '3px solid #2c5f7f' }}>
          <h1 
            className="font-bold mb-2" 
            style={{ 
              fontSize: '22pt', 
              color: '#2c5f7f',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
            {data.fullName || 'Your Name'}
          </h1>
          <div className="text-sm" style={{ color: '#333' }}>
            {data.address && <span>{data.address}</span>}
            {data.address && (data.phone || data.email) && <span className="mx-2">♦</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.phone && data.email && <span className="mx-2">♦</span>}
            {data.email && <span>{data.email}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {data.professionalSummary && (
          <div className="mb-6">
            <h2 
              className="font-bold mb-2 pb-1" 
              style={{ 
                fontSize: '13pt',
                color: '#2c5f7f',
                borderBottom: '1px solid #2c5f7f',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              Professional Summary
            </h2>
            <p className="text-justify" style={{ textAlign: 'justify' }}>
              {data.professionalSummary}
            </p>
          </div>
        )}

        {/* Work History */}
        {data.workHistory.some(w => w.position || w.company) && (
          <div className="mb-6">
            <h2 
              className="font-bold mb-3 pb-1" 
              style={{ 
                fontSize: '13pt',
                color: '#2c5f7f',
                borderBottom: '1px solid #2c5f7f',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              Work History
            </h2>
            {data.workHistory.map((work, index) => (
              work.position || work.company ? (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <strong style={{ fontSize: '11pt' }}>
                        {work.position || 'Position Title'}
                      </strong>
                      {work.startDate && (
                        <span className="ml-3" style={{ fontSize: '10pt' }}>
                          {work.startDate} - {work.isCurrent ? 'Current' : work.endDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-2" style={{ fontStyle: 'italic', fontSize: '10pt' }}>
                    {work.company && <span>{work.company}</span>}
                    {work.company && work.location && <span>, </span>}
                    {work.location && <span>{work.location}</span>}
                  </div>
                  {work.responsibilities.filter(r => r.trim()).length > 0 && (
                    <ul className="ml-6" style={{ listStyleType: 'disc' }}>
                      {work.responsibilities
                        .filter(resp => resp.trim())
                        .map((resp, idx) => (
                          <li key={idx} className="mb-1">
                            {resp}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ) : null
            ))}
          </div>
        )}

        {/* Skills */}
        {(data.skills.column1.some(s => s.trim()) || data.skills.column2.some(s => s.trim())) && (
          <div className="mb-6">
            <h2 
              className="font-bold mb-3 pb-1" 
              style={{ 
                fontSize: '13pt',
                color: '#2c5f7f',
                borderBottom: '1px solid #2c5f7f',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <ul className="ml-6" style={{ listStyleType: 'disc' }}>
                {data.skills.column1
                  .filter(skill => skill.trim())
                  .map((skill, index) => (
                    <li key={index} className="mb-1">
                      {skill}
                    </li>
                  ))}
              </ul>
              <ul className="ml-6" style={{ listStyleType: 'disc' }}>
                {data.skills.column2
                  .filter(skill => skill.trim())
                  .map((skill, index) => (
                    <li key={index} className="mb-1">
                      {skill}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.some(e => e.degree || e.institution) && (
          <div className="mb-6">
            <h2 
              className="font-bold mb-3 pb-1" 
              style={{ 
                fontSize: '13pt',
                color: '#2c5f7f',
                borderBottom: '1px solid #2c5f7f',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              Education
            </h2>
            {data.education.map((edu, index) => (
              edu.degree || edu.institution ? (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <strong style={{ fontSize: '11pt' }}>
                      {edu.degree || 'Degree: Major'}
                    </strong>
                    {edu.year && (
                      <span style={{ fontSize: '10pt' }}>{edu.year}</span>
                    )}
                  </div>
                  {edu.institution && (
                    <div style={{ fontStyle: 'italic', fontSize: '10pt' }}>
                      {edu.institution}
                    </div>
                  )}
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>
    );
  }
);

OxfordResumeTemplate.displayName = 'OxfordResumeTemplate';

export default OxfordResumeTemplate;
