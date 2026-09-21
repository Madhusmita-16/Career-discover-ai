import React, { useState } from 'react';
import type { CandidateProfile, WorkExperience, Project, SkillItem } from '../../types/resume';
import { User, Briefcase, GraduationCap, FolderGit2, Wrench, Award, Plus, Trash2, Save, Download } from 'lucide-react';
import { exportProfileJSON } from '../../services/storageService';

interface Props {
  profile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
}

export const ProfileEditor: React.FC<Props> = ({ profile, onSaveProfile }) => {
  const [activeSubTab, setActiveSubTab] = useState<'personal' | 'experience' | 'projects' | 'skills' | 'education' | 'certs'>('personal');
  const [currentProfile, setCurrentProfile] = useState<CandidateProfile>(profile);
  const [saveToast, setSaveToast] = useState<string>('');

  const handlePersonalChange = (field: string, value: string) => {
    setCurrentProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSaveProfile(currentProfile);
    setSaveToast('Master Candidate Profile saved successfully to LocalStorage!');
    setTimeout(() => setSaveToast(''), 4000);
  };

  // Add items
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: 'Software Engineer',
      company: 'New Company',
      location: 'Bangalore',
      startDate: '2024-01',
      endDate: 'Present',
      isCurrent: true,
      responsibilities: ['Developed backend APIs using Spring Boot and SQL databases.']
    };
    setCurrentProfile(prev => ({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
  };

  const handleDeleteExperience = (id: string) => {
    setCurrentProfile(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Web Application Project',
      description: 'Full stack project built with React and Java Spring Boot.',
      techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
      highlights: ['Designed REST API contract endpoints and database schemas.']
    };
    setCurrentProfile(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const handleDeleteProject = (id: string) => {
    setCurrentProfile(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleAddSkill = () => {
    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: 'New Technical Skill',
      category: 'Frameworks',
      proficiency: 4
    };
    setCurrentProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const handleDeleteSkill = (id: string) => {
    setCurrentProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: 'University / Institute',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science',
      location: 'India',
      startDate: '2020-08',
      endDate: '2024-05',
      gpa: '8.5 / 10.0'
    };
    setCurrentProfile(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const handleDeleteEducation = (id: string) => {
    setCurrentProfile(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const handleAddCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: 'New Professional Certification',
      issuer: 'Certification Body',
      date: '2024-01',
      credentialId: 'CERT-12345'
    };
    setCurrentProfile(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const handleDeleteCert = (id: string) => {
    setCurrentProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  return (
    <div className="profile-editor-container fade-in">
      {/* Header */}
      <div className="profile-editor-header">
        <div>
          <h1 className="editor-title">Candidate Profile Manager (Single Source of Truth)</h1>
          <p className="editor-subtitle">
            Maintain your reusable engineering profile. The AI Engine reads this data to craft tailored resumes for target job descriptions without inventing false qualifications.
          </p>
        </div>
        <div className="editor-header-actions">
          <button className="secondary-action-btn" onClick={() => exportProfileJSON(currentProfile)}>
            <Download size={16} /> Export Profile JSON
          </button>
          <button className="primary-action-btn" onClick={handleSave}>
            <Save size={16} /> Save Profile Changes
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="status-toast alert-success fade-in">
          {saveToast}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="profile-tabs-bar">
        <button className={`sub-tab ${activeSubTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveSubTab('personal')}>
          <User size={16} /> Personal Info & Summary
        </button>
        <button className={`sub-tab ${activeSubTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveSubTab('experience')}>
          <Briefcase size={16} /> Work Experience ({currentProfile.experiences.length})
        </button>
        <button className={`sub-tab ${activeSubTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveSubTab('projects')}>
          <FolderGit2 size={16} /> Projects ({currentProfile.projects.length})
        </button>
        <button className={`sub-tab ${activeSubTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveSubTab('skills')}>
          <Wrench size={16} /> Technical Skills ({currentProfile.skills.length})
        </button>
        <button className={`sub-tab ${activeSubTab === 'education' ? 'active' : ''}`} onClick={() => setActiveSubTab('education')}>
          <GraduationCap size={16} /> Education ({currentProfile.education.length})
        </button>
        <button className={`sub-tab ${activeSubTab === 'certs' ? 'active' : ''}`} onClick={() => setActiveSubTab('certs')}>
          <Award size={16} /> Certifications ({currentProfile.certifications.length})
        </button>
      </div>

      {/* Tab 1: Personal Info */}
      {activeSubTab === 'personal' && (
        <div className="tab-pane-card fade-in">
          <h2 className="pane-title">Personal Contact & Professional Value Proposition</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={currentProfile.personalInfo.fullName} onChange={e => handlePersonalChange('fullName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={currentProfile.personalInfo.email} onChange={e => handlePersonalChange('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" value={currentProfile.personalInfo.phone} onChange={e => handlePersonalChange('phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Location (City, Country)</label>
              <input type="text" value={currentProfile.personalInfo.location} onChange={e => handlePersonalChange('location', e.target.value)} />
            </div>
            <div className="form-group">
              <label>LinkedIn Profile URL</label>
              <input type="text" value={currentProfile.personalInfo.linkedin} onChange={e => handlePersonalChange('linkedin', e.target.value)} />
            </div>
            <div className="form-group">
              <label>GitHub Profile URL</label>
              <input type="text" value={currentProfile.personalInfo.github} onChange={e => handlePersonalChange('github', e.target.value)} />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Master Professional Summary</label>
            <textarea rows={4} value={currentProfile.personalInfo.summary} onChange={e => handlePersonalChange('summary', e.target.value)} />
          </div>
        </div>
      )}

      {/* Tab 2: Work Experience */}
      {activeSubTab === 'experience' && (
        <div className="tab-pane-card fade-in">
          <div className="pane-header-row">
            <h2 className="pane-title">Work Experience & Internship History</h2>
            <button className="add-btn" onClick={handleAddExperience}><Plus size={16} /> Add Position</button>
          </div>
          {currentProfile.experiences.map((exp, idx) => (
            <div key={exp.id} className="item-edit-box">
              <div className="box-header">
                <h3>Role #{idx + 1}: {exp.jobTitle} @ {exp.company}</h3>
                <button className="delete-icon-btn" onClick={() => handleDeleteExperience(exp.id)}><Trash2 size={16} /></button>
              </div>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Job Title</label>
                  <input type="text" value={exp.jobTitle} onChange={e => {
                    const val = e.target.value;
                    setCurrentProfile(prev => ({
                      ...prev,
                      experiences: prev.experiences.map(ex => ex.id === exp.id ? { ...ex, jobTitle: val } : ex)
                    }));
                  }} />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" value={exp.company} onChange={e => {
                    const val = e.target.value;
                    setCurrentProfile(prev => ({
                      ...prev,
                      experiences: prev.experiences.map(ex => ex.id === exp.id ? { ...ex, company: val } : ex)
                    }));
                  }} />
                </div>
                <div className="form-group">
                  <label>Dates (Start – End)</label>
                  <input type="text" value={`${exp.startDate} – ${exp.endDate}`} onChange={e => {
                    const parts = e.target.value.split('–');
                    setCurrentProfile(prev => ({
                      ...prev,
                      experiences: prev.experiences.map(ex => ex.id === exp.id ? { ...ex, startDate: parts[0]?.trim() || '2024', endDate: parts[1]?.trim() || 'Present' } : ex)
                    }));
                  }} />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Responsibilities & Bullet Points (One per line)</label>
                <textarea rows={4} value={exp.responsibilities.join('\n')} onChange={e => {
                  const bullets = e.target.value.split('\n').filter(b => b.trim());
                  setCurrentProfile(prev => ({
                    ...prev,
                    experiences: prev.experiences.map(ex => ex.id === exp.id ? { ...ex, responsibilities: bullets } : ex)
                  }));
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Projects */}
      {activeSubTab === 'projects' && (
        <div className="tab-pane-card fade-in">
          <div className="pane-header-row">
            <h2 className="pane-title">Featured Engineering Projects</h2>
            <button className="add-btn" onClick={handleAddProject}><Plus size={16} /> Add Project</button>
          </div>
          {currentProfile.projects.map((proj, idx) => (
            <div key={proj.id} className="item-edit-box">
              <div className="box-header">
                <h3>Project #{idx + 1}: {proj.title}</h3>
                <button className="delete-icon-btn" onClick={() => handleDeleteProject(proj.id)}><Trash2 size={16} /></button>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Project Title</label>
                  <input type="text" value={proj.title} onChange={e => {
                    const val = e.target.value;
                    setCurrentProfile(prev => ({
                      ...prev,
                      projects: prev.projects.map(p => p.id === proj.id ? { ...p, title: val } : p)
                    }));
                  }} />
                </div>
                <div className="form-group">
                  <label>Tech Stack (Comma Separated)</label>
                  <input type="text" value={proj.techStack.join(', ')} onChange={e => {
                    const stack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setCurrentProfile(prev => ({
                      ...prev,
                      projects: prev.projects.map(p => p.id === proj.id ? { ...p, techStack: stack } : p)
                    }));
                  }} />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Short Description</label>
                <input type="text" value={proj.description} onChange={e => {
                  const val = e.target.value;
                  setCurrentProfile(prev => ({
                    ...prev,
                    projects: prev.projects.map(p => p.id === proj.id ? { ...p, description: val } : p)
                  }));
                }} />
              </div>
              <div className="form-group full-width">
                <label>Key Highlights & Achievements (One per line)</label>
                <textarea rows={3} value={proj.highlights.join('\n')} onChange={e => {
                  const h = e.target.value.split('\n').filter(l => l.trim());
                  setCurrentProfile(prev => ({
                    ...prev,
                    projects: prev.projects.map(p => p.id === proj.id ? { ...p, highlights: h } : p)
                  }));
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Skills */}
      {activeSubTab === 'skills' && (
        <div className="tab-pane-card fade-in">
          <div className="pane-header-row">
            <h2 className="pane-title">Categorized Technical Skills Matrix</h2>
            <button className="add-btn" onClick={handleAddSkill}><Plus size={16} /> Add Skill</button>
          </div>
          <div className="skills-manager-grid">
            {currentProfile.skills.map((sk) => (
              <div key={sk.id} className="skill-edit-chip">
                <input 
                  type="text" 
                  className="skill-input-name" 
                  value={sk.name} 
                  onChange={e => {
                    const val = e.target.value;
                    setCurrentProfile(prev => ({
                      ...prev,
                      skills: prev.skills.map(s => s.id === sk.id ? { ...s, name: val } : s)
                    }));
                  }} 
                />
                <select 
                  className="skill-select-cat"
                  value={sk.category}
                  onChange={e => {
                    const cat = e.target.value as any;
                    setCurrentProfile(prev => ({
                      ...prev,
                      skills: prev.skills.map(s => s.id === sk.id ? { ...s, category: cat } : s)
                    }));
                  }}
                >
                  <option value="Languages">Languages</option>
                  <option value="Frameworks">Frameworks</option>
                  <option value="Databases">Databases</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Concepts">Concepts</option>
                  <option value="Tools">Tools</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
                <button className="skill-del-btn" onClick={() => handleDeleteSkill(sk.id)}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Education */}
      {activeSubTab === 'education' && (
        <div className="tab-pane-card fade-in">
          <div className="pane-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="pane-title">Education History</h2>
            <button className="add-btn" onClick={handleAddEducation}><Plus size={16} /> Add Education</button>
          </div>
          <div className="education-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentProfile.education.map((edu, idx) => (
              <div key={edu.id} className="item-edit-box" style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Degree #{idx + 1}: {edu.degree}</h3>
                  <button className="delete-icon-btn" onClick={() => handleDeleteEducation(edu.id)} style={{ color: 'var(--error)', background: 'transparent', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
                <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Degree</label>
                    <input type="text" value={edu.degree} onChange={e => {
                      const val = e.target.value;
                      setCurrentProfile(prev => ({
                        ...prev,
                        education: prev.education.map(ed => ed.id === edu.id ? { ...ed, degree: val } : ed)
                      }));
                    }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Field of Study</label>
                    <input type="text" value={edu.fieldOfStudy} onChange={e => {
                      const val = e.target.value;
                      setCurrentProfile(prev => ({
                        ...prev,
                        education: prev.education.map(ed => ed.id === edu.id ? { ...ed, fieldOfStudy: val } : ed)
                      }));
                    }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>University / Institution</label>
                    <input type="text" value={edu.institution} onChange={e => {
                      const val = e.target.value;
                      setCurrentProfile(prev => ({
                        ...prev,
                        education: prev.education.map(ed => ed.id === edu.id ? { ...ed, institution: val } : ed)
                      }));
                    }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Location & GPA</label>
                    <input type="text" value={`${edu.location} | GPA: ${edu.gpa || 'N/A'}`} onChange={e => {
                      const parts = e.target.value.split('|');
                      setCurrentProfile(prev => ({
                        ...prev,
                        education: prev.education.map(ed => ed.id === edu.id ? { ...ed, location: parts[0]?.trim() || ed.location, gpa: parts[1]?.replace(/GPA:/i, '')?.trim() || ed.gpa } : ed)
                      }));
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Certifications */}
      {activeSubTab === 'certs' && (
        <div className="tab-pane-card fade-in">
          <div className="pane-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="pane-title">Professional Certifications</h2>
            <button className="add-btn" onClick={handleAddCert}><Plus size={16} /> Add Certification</button>
          </div>
          <div className="education-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentProfile.certifications.map((cert, idx) => (
              <div key={cert.id} className="item-edit-box" style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Cert #{idx + 1}: {cert.title}</h3>
                  <button className="delete-icon-btn" onClick={() => handleDeleteCert(cert.id)} style={{ color: 'var(--error)', background: 'transparent', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
                <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Certification Title</label>
                    <input type="text" value={cert.title} onChange={e => {
                      const val = e.target.value;
                      setCurrentProfile(prev => ({
                        ...prev,
                        certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, title: val } : c)
                      }));
                    }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Issuing Organization</label>
                    <input type="text" value={cert.issuer} onChange={e => {
                      const val = e.target.value;
                      setCurrentProfile(prev => ({
                        ...prev,
                        certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, issuer: val } : c)
                      }));
                    }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Date Issued</label>
                    <input type="text" value={cert.date} onChange={e => {
                      const val = e.target.value;
                      setCurrentProfile(prev => ({
                        ...prev,
                        certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, date: val } : c)
                      }));
                    }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Credential ID / URL</label>
                    <input type="text" value={cert.credentialId || ''} onChange={e => {
                      const val = e.target.value;
                      setCurrentProfile(prev => ({
                        ...prev,
                        certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, credentialId: val } : c)
                      }));
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
