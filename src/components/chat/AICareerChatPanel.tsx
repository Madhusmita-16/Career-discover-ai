import React, { useState } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  BookOpen,
  X,
  MessageSquare
} from 'lucide-react';
import type { CandidateProfile, JobDescriptionData, ChatMessage } from '../../types/resume';
import { getRAGAnswer } from '../../services/careerRAGAgent';

interface Props {
  profile: CandidateProfile;
  currentJd?: JobDescriptionData;
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
}

export const AICareerChatPanel: React.FC<Props> = ({ 
  profile, 
  currentJd,
  isDrawer = false,
  onCloseDrawer
}) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello ${profile.personalInfo.fullName || 'Madhu'}! I am CareerDiscoverAI — your job search co-pilot. Ask me anything about job search, resume tailoring, skill gaps, or interview preparation.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const aiMsg = getRAGAnswer(input, profile, currentJd);
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  const suggestQuery = (q: string) => {
    setInput(q);
  };

  return (
    <div 
      className="career-chat-container"
      style={isDrawer ? {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '400px',
        backgroundColor: 'var(--bg-card)',
        borderLeft: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column'
      } : {
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            padding: '0.45rem',
            borderRadius: '8px',
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            color: '#6366F1'
          }}>
            <MessageSquare size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>Career AI Co-Pilot</h3>
          </div>
        </div>
        {isDrawer && onCloseDrawer && (
          <button 
            onClick={onCloseDrawer}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Context Badge Cards Bar */}
      <div style={{
        padding: '0.65rem 1.25rem',
        backgroundColor: 'var(--bg-main)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          24 Saved Jobs
        </span>
        <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          5 Applications
        </span>
        <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          ATS Score: 89
        </span>
      </div>

      {/* Suggested Questions Pills */}
      <div style={{
        padding: '0.75rem 1.25rem',
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <button 
          onClick={() => suggestQuery('Which jobs should I apply to today?')}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            fontSize: '0.78rem',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          Find jobs for me
        </button>
        <button 
          onClick={() => suggestQuery('What are my biggest skill gaps?')}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            fontSize: '0.78rem',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          Skill gap analysis
        </button>
        <button 
          onClick={() => suggestQuery('How should I improve my resume for Java roles?')}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            fontSize: '0.78rem',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          Improve my resume
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.map(msg => (
          <div 
            key={msg.id} 
            style={{
              display: 'flex',
              gap: '0.65rem',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {msg.sender === 'assistant' && (
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: '#6366F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bot size={15} />
              </div>
            )}

            <div style={{
              maxWidth: '82%',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-main)',
              color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
              fontSize: '0.88rem',
              lineHeight: 1.5
            }}>
              <div style={{ fontSize: '0.72rem', opacity: 0.75, marginBottom: '0.2rem' }}>
                {msg.sender === 'user' ? 'You' : 'CareerDiscoverAI'} · {msg.timestamp}
              </div>
              <div>{msg.text}</div>

              {msg.references && msg.references.length > 0 && (
                <div style={{
                  marginTop: '0.5rem',
                  paddingTop: '0.4rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.72rem',
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <BookOpen size={11} /> Sources: {msg.references.join(' • ')}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={15} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        <input 
          type="text"
          placeholder="Ask me anything about your job search..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '0.6rem 0.85rem',
            fontSize: '0.88rem',
            borderRadius: '8px'
          }}
        />
        <button 
          className="btn-primary"
          onClick={handleSend}
          disabled={!input.trim()}
          style={{ padding: '0.6rem 0.85rem', borderRadius: '8px' }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
