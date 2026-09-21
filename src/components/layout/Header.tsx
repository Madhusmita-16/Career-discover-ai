import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Command, 
  FilePlus 
} from 'lucide-react';

interface Props {
  userName: string;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenCommandPalette: () => void;
  onCreateNewResume: () => void;
  onToggleLandingMode: () => void;
}

export const Header: React.FC<Props> = ({
  userName,
  darkMode,
  setDarkMode,
  onOpenCommandPalette,
  onCreateNewResume
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="app-header">
      {/* Search Input Trigger Bar */}
      <div 
        className="header-search" 
        onClick={onOpenCommandPalette}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        title="Search jobs, skills, events (Ctrl + K)"
      >
        <Search size={16} style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flex: 1 }}>
          Search jobs, companies, skills, events...
        </span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '2px',
          padding: '2px 6px',
          borderRadius: '4px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--text-muted)'
        }}>
          <Command size={10} /> K
        </span>
      </div>

      {/* Header Right Action Group */}
      <div className="header-right">
        {/* Quick Action Buttons */}
        <button 
          className="btn-secondary"
          onClick={onCreateNewResume}
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', gap: '0.4rem' }}
        >
          <FilePlus size={15} /> Analyze Job
        </button>

        {/* Theme Switcher */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.45rem',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={17} style={{ color: '#F59E0B' }} /> : <Moon size={17} style={{ color: '#6366F1' }} />}
        </button>

        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.45rem',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Notifications"
          >
            <Bell size={17} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)'
            }} />
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '120%',
              right: 0,
              width: '320px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 60,
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Mark all read</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ fontSize: '0.8rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--bg-main)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Interview Confirmation</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>ABC Tech — Tomorrow at 10:30 AM</div>
                </div>
                <div style={{ fontSize: '0.8rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--bg-main)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>New Matching Job</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>Software Engineer @ Stripe (94% Match)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="user-profile-badge">
          <div className="avatar-circle">
            {userName.charAt(0)}
          </div>
          <span className="user-name">{userName}</span>
        </div>
      </div>
    </header>
  );
};
