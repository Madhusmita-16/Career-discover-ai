import React, { useState } from 'react';
import type { 
  CandidateProfile, 
  WorkExperience, 
  Project, 
  SkillItem, 
  Education, 
  Certification,
  SkillCategory 
} from '../../types/resume';
import { 
  CheckCircle2, 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Wrench, 
  Award, 
  Edit3, 
  Plus, 
  Trash2, 
  X, 
  Save, 
  Sliders, 
  FileText,
  Sparkles
} from 'lucide-react';
import { ProfileEditor } from '../ProfileEditor/ProfileEditor';

interface Props {
  profile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
  onEditSection?: (section: string) => void;
}

export const ProfileBuilder: React.FC<Props> = ({ profile, onSaveProfile }) => {
  const [viewMode, setViewMode] = useState<'overview' | 'editor'>('overview');
  const [activeModal, setActiveModal] = useState<'experience' | 'project' | 'skill' | 'education' | 'cert' | 'personal' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Calculate completeness dynamically
  const p = profile.personalInfo;
  const hasPersonal = Boolean(p.fullName && p.email && p.phone);
  const hasSummary = Boolean(p.summary && p.summary.length > 20);
  const expCount = profile.experiences?.length || 0;
  const projCount = profile.projects?.length || 0;
  const skillCount = profile.skills?.length || 0;
  const eduCount = profile.education?.length || 0;
  const certCount = profile.certifications?.length || 0;

  let completeness = 0;
  if (hasPersonal) completeness += 20;
  if (hasSummary) completeness += 15;
  if (expCount >= 1) completeness += Math.min(25, expCount * 12.5);
  if (projCount >= 1) completeness += Math.min(20, projCount * 10);
  if (skillCount >= 5) completeness += Math.min(10, skillCount * 1);
  if (eduCount >= 1) completeness += 5;
  if (certCount >= 1) completeness += 5;
  completeness = Math.min(100, Math.round(completeness));

  // Deletion Handlers
  const handleDeleteExperience = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = {
      ...profile,
      experiences: profile.experiences.filter(exp => exp.id !== id)
    };
    onSaveProfile(updated);
    showToast('Work experience entry removed successfully.');
  };

  const handleDeleteProject = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = {
      ...profile,
      projects: profile.projects.filter(proj => proj.id !== id)
    };
    onSaveProfile(updated);
    showToast('Engineering project entry removed successfully.');
  };

  const handleDeleteSkill = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = {
      ...profile,
      skills: profile.skills.filter(sk => sk.id !== id)
    };
    onSaveProfile(updated);
    showToast('Skill badge removed.');
  };

  const handleDeleteEducation = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = {
      ...profile,
      education: profile.education.filter(edu => edu.id !== id)
    };
    onSaveProfile(updated);
    showToast('Education entry removed successfully.');
  };

  const handleDeleteCert = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = {
      ...profile,
      certifications: profile.certifications.filter(c => c.id !== id)
    };
    onSaveProfile(updated);
    showToast('Certification entry removed successfully.');
  };

  // Modal Open Handlers
  const handleOpenAddExperience = () => {
    setEditingItem({
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: 'Bangalore, India',
      startDate: '2024-01',
      endDate: 'Present',
      isCurrent: true,
      responsibilities: ['Architected RESTful microservices and integrated REST APIs.']
    });
    setActiveModal('experience');
  };

  const handleOpenEditExperience = (exp: WorkExperience) => {
    setEditingItem({ ...exp });
    setActiveModal('experience');
  };

  const handleSaveExperience = () => {
    if (!editingItem.jobTitle || !editingItem.company) return;
    const exists = profile.experiences.some(e => e.id === editingItem.id);
    const updatedExps = exists
      ? profile.experiences.map(e => e.id === editingItem.id ? editingItem : e)
      : [editingItem, ...profile.experiences];
    onSaveProfile({ ...profile, experiences: updatedExps });
    setActiveModal(null);
    showToast(exists ? 'Work experience updated.' : 'New work experience added.');
  };

  const handleOpenAddProject = () => {
    setEditingItem({
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      techStack: ['Java', 'Spring Boot', 'React'],
      highlights: ['Designed high-throughput REST API endpoints and database models.']
    });
    setActiveModal('project');
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingItem({ ...proj });
    setActiveModal('project');
  };

  const handleSaveProject = () => {
    if (!editingItem.title) return;
    const exists = profile.projects.some(p => p.id === editingItem.id);
    const updatedProjects = exists
      ? profile.projects.map(p => p.id === editingItem.id ? editingItem : p)
      : [editingItem, ...profile.projects];
    onSaveProfile({ ...profile, projects: updatedProjects });
    setActiveModal(null);
    showToast(exists ? 'Project details updated.' : 'New project added.');
  };

  const handleOpenAddSkill = () => {
    setEditingItem({
      id: `sk-${Date.now()}`,
      name: '',
      category: 'Frameworks',
      proficiency: 5
    });
    setActiveModal('skill');
  };

  const handleSaveSkill = () => {
    if (!editingItem.name?.trim()) return;
    const newSkill: SkillItem = {
      id: editingItem.id || `sk-${Date.now()}`,
      name: editingItem.name.trim(),
      category: (editingItem.category as SkillCategory) || 'Frameworks',
      proficiency: 5
    };
    const updatedSkills = [...profile.skills, newSkill];
    onSaveProfile({ ...profile, skills: updatedSkills });
    setActiveModal(null);
    showToast(`Skill "${newSkill.name}" added to profile.`);
  };

  const handleOpenAddEdu = () => {
    setEditingItem({
      id: `edu-${Date.now()}`,
      institution: '',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      location: 'India',
      startDate: '2020-08',
      endDate: '2024-05',
      gpa: '8.8 / 10.0'
    });
    setActiveModal('education');
  };

  const handleOpenEditEdu = (edu: Education) => {
    setEditingItem({ ...edu });
    setActiveModal('education');
  };

  const handleSaveEdu = () => {
    if (!editingItem.degree || !editingItem.institution) return;
    const exists = profile.education.some(e => e.id === editingItem.id);
    const updatedEdu = exists
      ? profile.education.map(e => e.id === editingItem.id ? editingItem : e)
      : [...profile.education, editingItem];
    onSaveProfile({ ...profile, education: updatedEdu });
    setActiveModal(null);
    showToast(exists ? 'Education entry updated.' : 'New education degree added.');
  };

  const handleOpenAddCert = () => {
    setEditingItem({
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      date: '2024-01',
      credentialId: ''
    });
    setActiveModal('cert');
  };

  const handleOpenEditCert = (cert: Certification) => {
    setEditingItem({ ...cert });
    setActiveModal('cert');
  };

  const handleSaveCert = () => {
    if (!editingItem.title) return;
    const exists = profile.certifications.some(c => c.id === editingItem.id);
    const updatedCerts = exists
      ? profile.certifications.map(c => c.id === editingItem.id ? editingItem : c)
      : [...profile.certifications, editingItem];
    onSaveProfile({ ...profile, certifications: updatedCerts });
    setActiveModal(null);
    showToast(exists ? 'Certification updated.' : 'New certification added.');
  };

  const handleOpenEditPersonal = () => {
    setEditingItem({ ...profile.personalInfo });
    setActiveModal('personal');
  };

  const handleSavePersonal = () => {
    onSaveProfile({
      ...profile,
      personalInfo: editingItem
    });
    setActiveModal(null);
    showToast('Personal information & summary saved.');
  };

  return (
    <div className="profile-builder-container fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            right: '24px',
            zIndex: 100,
            background: 'linear-gradient(135deg, #10B981, #059669)',
            color: '#FFFFFF',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            fontSize: '0.88rem'
          }}
          className="fade-in"
        >
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* Header & Mode Selector */}
      <div className="dashboard-greeting-hero" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="greeting-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles color="var(--primary)" size={24} /> Master Profile
          </h1>
          <p className="greeting-sub">
            Your single source of truth for AI resume optimization. Add, edit, or remove technical evidence below.
          </p>
        </div>
        <div style={{ display: 'flex', background: 'var(--bg-surface-secondary)', padding: '4px', borderRadius: '10px', gap: '4px', border: '1px solid var(--border)' }}>
          <button
            onClick={() => setViewMode('overview')}
            className={`btn-secondary ${viewMode === 'overview' ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', border: 'none' }}
          >
            <FileText size={14} /> Profile Cards
          </button>
          <button
            onClick={() => setViewMode('editor')}
            className={`btn-secondary ${viewMode === 'editor' ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', border: 'none' }}
          >
            <Sliders size={14} /> Structured Manager
          </button>
        </div>
      </div>

      {viewMode === 'editor' ? (
        <ProfileEditor profile={profile} onSaveProfile={onSaveProfile} />
      ) : (
        <>
          {/* Profile Completeness Bar */}
          <div className="profile-completeness-banner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>Profile Completeness Score</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.6rem' }}>
                  {completeness >= 90 ? 'All core technical evidence present' : 'Add more experiences, projects or skills for maximum ATS impact'}
                </span>
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: completeness >= 85 ? 'var(--success)' : 'var(--primary)' }}>
                {completeness}%
              </span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${completeness}%` }} />
            </div>
          </div>

          {/* Grid of Section Cards */}
          <div className="profile-sections-grid">
            {/* Personal Info Card */}
            <div className="profile-section-card">
              <div className="section-card-head">
                <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={18} color="var(--primary)" /> Personal Information <CheckCircle2 size={16} color="#16A34A" />
                </span>
                <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={handleOpenEditPersonal}>
                  <Edit3 size={12} /> Edit Info
                </button>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>{p.fullName || 'No name provided'}</strong><br />
                {p.email} • {p.phone}<br />
                {p.location} • <a href={`https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>{p.linkedin}</a>
              </div>
            </div>

            {/* Master Summary Card */}
            <div className="profile-section-card">
              <div className="section-card-head">
                <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={18} color="var(--primary)" /> Professional Summary <CheckCircle2 size={16} color="#16A34A" />
                </span>
                <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={handleOpenEditPersonal}>
                  <Edit3 size={12} /> Edit Summary
                </button>
              </div>
              <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {p.summary || 'Click Edit Summary to add your core engineering summary.'}
              </div>
            </div>

            {/* Work Experience Card */}
            <div className="profile-section-card" style={{ gridColumn: 'span 1' }}>
              <div className="section-card-head">
                <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Briefcase size={18} color="var(--primary)" /> Work Experience ({profile.experiences.length}) <CheckCircle2 size={16} color="#16A34A" />
                </span>
                <button className="btn-primary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }} onClick={handleOpenAddExperience}>
                  <Plus size={12} /> Add Experience
                </button>
              </div>
              {profile.experiences.length === 0 ? (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No work experience added yet. Click "+ Add Experience" above.</p>
              ) : (
                profile.experiences.map(exp => (
                  <div 
                    key={exp.id} 
                    style={{ 
                      marginBottom: '0.75rem', 
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                        {exp.jobTitle} <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>@ {exp.company}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                        {exp.startDate} – {exp.endDate} • {exp.location}
                      </div>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          • {exp.responsibilities[0]}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }} 
                        onClick={() => handleOpenEditExperience(exp)}
                        title="Edit position"
                      >
                        <Edit3 size={12} />
                      </button>
                      <button 
                        style={{ 
                          padding: '0.2rem 0.4rem', 
                          fontSize: '0.7rem', 
                          color: '#DC2626', 
                          background: 'rgba(220, 38, 38, 0.08)',
                          border: '1px solid rgba(220, 38, 38, 0.2)',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }} 
                        onClick={(e) => handleDeleteExperience(exp.id, e)}
                        title="Remove experience"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Engineering Projects Card */}
            <div className="profile-section-card" style={{ gridColumn: 'span 1' }}>
              <div className="section-card-head">
                <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FolderGit2 size={18} color="var(--primary)" /> Engineering Projects ({profile.projects.length}) <CheckCircle2 size={16} color="#16A34A" />
                </span>
                <button className="btn-primary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }} onClick={handleOpenAddProject}>
                  <Plus size={12} /> Add Project
                </button>
              </div>
              {profile.projects.length === 0 ? (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No engineering projects added yet. Click "+ Add Project".</p>
              ) : (
                profile.projects.map(proj => (
                  <div 
                    key={proj.id} 
                    style={{ 
                      marginBottom: '0.75rem', 
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                        {proj.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, margin: '0.2rem 0' }}>
                        Stack: {proj.techStack.join(', ')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {proj.description}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }} 
                        onClick={() => handleOpenEditProject(proj)}
                        title="Edit project"
                      >
                        <Edit3 size={12} />
                      </button>
                      <button 
                        style={{ 
                          padding: '0.2rem 0.4rem', 
                          fontSize: '0.7rem', 
                          color: '#DC2626', 
                          background: 'rgba(220, 38, 38, 0.08)',
                          border: '1px solid rgba(220, 38, 38, 0.2)',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }} 
                        onClick={(e) => handleDeleteProject(proj.id, e)}
                        title="Remove project"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Technical Skills Card */}
            <div className="profile-section-card" style={{ gridColumn: 'span 2' }}>
              <div className="section-card-head">
                <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Wrench size={18} color="var(--primary)" /> Skills Matrix ({profile.skills.length}) <CheckCircle2 size={16} color="#16A34A" />
                </span>
                <button className="btn-primary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }} onClick={handleOpenAddSkill}>
                  <Plus size={12} /> Add Skill
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {profile.skills.map(s => (
                  <span 
                    key={s.id} 
                    className="status-badge badge-matched" 
                    style={{ 
                      fontSize: '0.78rem', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.35rem',
                      padding: '0.3rem 0.6rem' 
                    }}
                  >
                    {s.name}
                    <button 
                      onClick={(e) => handleDeleteSkill(s.id, e)} 
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'var(--primary)', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        marginLeft: '2px'
                      }}
                      title={`Remove skill "${s.name}"`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Certs Card */}
            <div className="profile-section-card" style={{ gridColumn: 'span 2' }}>
              <div className="section-card-head">
                <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GraduationCap size={18} color="var(--primary)" /> Education & Certifications <CheckCircle2 size={16} color="#16A34A" />
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={handleOpenAddEdu}>
                    <Plus size={12} /> Add Education
                  </button>
                  <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={handleOpenAddCert}>
                    <Award size={12} /> Add Certification
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                {/* Education list */}
                <div>
                  <h4 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Education</h4>
                  {profile.education.map(edu => (
                    <div key={edu.id} style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', padding: '0.4rem 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>{edu.degree}</strong> in {edu.fieldOfStudy}<br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{edu.institution} ({edu.startDate} – {edu.endDate})</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        <button className="btn-secondary" style={{ padding: '0.2rem 0.35rem', fontSize: '0.68rem' }} onClick={() => handleOpenEditEdu(edu)}><Edit3 size={11} /></button>
                        <button style={{ padding: '0.2rem 0.35rem', fontSize: '0.68rem', color: '#DC2626', background: 'rgba(220,38,38,0.08)', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={(e) => handleDeleteEducation(edu.id, e)}><Trash2 size={11} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications list */}
                <div>
                  <h4 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Certifications</h4>
                  {profile.certifications.map(c => (
                    <div key={c.id} style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', padding: '0.4rem 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>{c.title}</strong><br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.issuer} • {c.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        <button className="btn-secondary" style={{ padding: '0.2rem 0.35rem', fontSize: '0.68rem' }} onClick={() => handleOpenEditCert(c)}><Edit3 size={11} /></button>
                        <button style={{ padding: '0.2rem 0.35rem', fontSize: '0.68rem', color: '#DC2626', background: 'rgba(220,38,38,0.08)', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={(e) => handleDeleteCert(c.id, e)}><Trash2 size={11} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MODAL DIALOGS FOR ADD/EDIT */}
      {activeModal && editingItem && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          className="fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.75rem',
              width: '100%',
              maxWidth: activeModal === 'personal' || activeModal === 'experience' || activeModal === 'project' ? '640px' : '480px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {activeModal === 'experience' && (editingItem.company ? 'Edit Work Experience' : 'Add Work Experience')}
                {activeModal === 'project' && (editingItem.title ? 'Edit Engineering Project' : 'Add Engineering Project')}
                {activeModal === 'skill' && 'Add Technical Skill Badge'}
                {activeModal === 'education' && 'Add / Edit Education'}
                {activeModal === 'cert' && 'Add / Edit Certification'}
                {activeModal === 'personal' && 'Edit Personal Info & Summary'}
              </h2>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Content */}
            {activeModal === 'experience' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Job Title *</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.jobTitle} onChange={e => setEditingItem({ ...editingItem, jobTitle: e.target.value })} placeholder="e.g. Software Engineer" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Company Name *</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.company} onChange={e => setEditingItem({ ...editingItem, company: e.target.value })} placeholder="e.g. Acme Corp" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Start Date</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.startDate} onChange={e => setEditingItem({ ...editingItem, startDate: e.target.value })} placeholder="2024-01" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>End Date</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.endDate} onChange={e => setEditingItem({ ...editingItem, endDate: e.target.value })} placeholder="Present" />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Responsibilities & Achievements (One per line)</label>
                  <textarea rows={4} style={{ width: '100%' }} value={editingItem.responsibilities?.join('\n') || ''} onChange={e => setEditingItem({ ...editingItem, responsibilities: e.target.value.split('\n').filter(Boolean) })} placeholder="Developed backend APIs using Java Spring Boot..." />
                </div>
                <button className="btn-primary" onClick={handleSaveExperience} style={{ marginTop: '0.5rem' }}>
                  <Save size={16} /> Save Experience
                </button>
              </div>
            )}

            {activeModal === 'project' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Project Title *</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} placeholder="e.g. Microservices Contract Validation Engine" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Tech Stack (Comma Separated)</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.techStack?.join(', ') || ''} onChange={e => setEditingItem({ ...editingItem, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Java, Spring Boot, React, PostgreSQL" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Short Description</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} placeholder="Full stack web app for testing API contracts." />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Key Highlights (One per line)</label>
                  <textarea rows={3} style={{ width: '100%' }} value={editingItem.highlights?.join('\n') || ''} onChange={e => setEditingItem({ ...editingItem, highlights: e.target.value.split('\n').filter(Boolean) })} placeholder="Achieved 99.9% test coverage with JUnit..." />
                </div>
                <button className="btn-primary" onClick={handleSaveProject} style={{ marginTop: '0.5rem' }}>
                  <Save size={16} /> Save Project
                </button>
              </div>
            )}

            {activeModal === 'skill' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Skill Name *</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} placeholder="e.g. Kubernetes, React, GraphQL" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Category</label>
                  <select style={{ width: '100%' }} value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}>
                    <option value="Languages">Languages</option>
                    <option value="Frameworks">Frameworks</option>
                    <option value="Databases">Databases</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Concepts">Concepts</option>
                    <option value="Tools">Tools</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>
                <button className="btn-primary" onClick={handleSaveSkill} style={{ marginTop: '0.5rem' }}>
                  <Save size={16} /> Add Skill to Profile
                </button>
              </div>
            )}

            {activeModal === 'education' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Degree *</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.degree} onChange={e => setEditingItem({ ...editingItem, degree: e.target.value })} placeholder="Bachelor of Technology (B.Tech)" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Field of Study</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.fieldOfStudy} onChange={e => setEditingItem({ ...editingItem, fieldOfStudy: e.target.value })} placeholder="Computer Science & Engineering" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>University / Institution *</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.institution} onChange={e => setEditingItem({ ...editingItem, institution: e.target.value })} placeholder="University Name" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Start Date</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.startDate} onChange={e => setEditingItem({ ...editingItem, startDate: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>End Date</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.endDate} onChange={e => setEditingItem({ ...editingItem, endDate: e.target.value })} />
                  </div>
                </div>
                <button className="btn-primary" onClick={handleSaveEdu} style={{ marginTop: '0.5rem' }}>
                  <Save size={16} /> Save Education
                </button>
              </div>
            )}

            {activeModal === 'cert' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Certification Title *</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} placeholder="AWS Certified Developer" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Issuing Organization</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.issuer} onChange={e => setEditingItem({ ...editingItem, issuer: e.target.value })} placeholder="Amazon Web Services" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Date Issued</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.date} onChange={e => setEditingItem({ ...editingItem, date: e.target.value })} placeholder="2024-03" />
                </div>
                <button className="btn-primary" onClick={handleSaveCert} style={{ marginTop: '0.5rem' }}>
                  <Save size={16} /> Save Certification
                </button>
              </div>
            )}

            {activeModal === 'personal' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Full Name</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.fullName} onChange={e => setEditingItem({ ...editingItem, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Email Address</label>
                    <input type="email" style={{ width: '100%' }} value={editingItem.email} onChange={e => setEditingItem({ ...editingItem, email: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Phone Number</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.phone} onChange={e => setEditingItem({ ...editingItem, phone: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Location</label>
                    <input type="text" style={{ width: '100%' }} value={editingItem.location} onChange={e => setEditingItem({ ...editingItem, location: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>LinkedIn URL</label>
                  <input type="text" style={{ width: '100%' }} value={editingItem.linkedin} onChange={e => setEditingItem({ ...editingItem, linkedin: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Master Professional Summary</label>
                  <textarea rows={4} style={{ width: '100%' }} value={editingItem.summary} onChange={e => setEditingItem({ ...editingItem, summary: e.target.value })} />
                </div>
                <button className="btn-primary" onClick={handleSavePersonal} style={{ marginTop: '0.5rem' }}>
                  <Save size={16} /> Save Personal Info & Summary
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
