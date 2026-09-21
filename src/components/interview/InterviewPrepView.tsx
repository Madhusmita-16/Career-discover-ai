import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import type { CandidateProfile, JobDescriptionData, InterviewQuestion } from '../../types/resume';
import { generateInterviewQuestions, evaluateMockResponse } from '../../services/interviewPrepAgent';

interface Props {
  profile: CandidateProfile;
  currentJd: JobDescriptionData;
}

export const InterviewPrepView: React.FC<Props> = ({ profile, currentJd }) => {
  const [questions] = useState<InterviewQuestion[]>(() => generateInterviewQuestions(currentJd, profile));
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: string;
    keyMatched: string[];
    missingConcepts: string[];
  } | null>(null);

  const activeQ = questions[activeIdx];

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    const res = evaluateMockResponse(activeQ, userAnswer);
    setEvaluation(res);
  };

  const handleNext = () => {
    setEvaluation(null);
    setUserAnswer('');
    setActiveIdx((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="interview-prep-container">
      <div className="prep-header">
        <h2>AI Interview Preparation Center</h2>
        <p>Mock technical, behavioral, and system design evaluation for <strong>{currentJd.jobTitle}</strong>.</p>
      </div>

      <div className="prep-main-grid">
        {/* Left Column: Interactive Interview Simulator */}
        <div className="prep-panel">
          <div className="q-progress-bar">
            <span>Question {activeIdx + 1} of {questions.length}</span>
            <span className={`q-category-tag ${activeQ.category}`}>{activeQ.category.toUpperCase()}</span>
          </div>

          <div className="question-box">
            <h3 className="question-text">{activeQ.question}</h3>
          </div>

          {!evaluation ? (
            <div className="answer-entry-box">
              <label>Your Answer:</label>
              <textarea
                rows={6}
                placeholder="Type your response here... (e.g. explain core concepts, STAR method, or architecture tradeoffs)"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="answer-textarea"
              />
              <button 
                className="btn-primary margin-top"
                onClick={handleEvaluate}
                disabled={!userAnswer.trim()}
              >
                <Sparkles size={16} /> Evaluate Response with AI
              </button>
            </div>
          ) : (
            <div className="evaluation-result-box">
              <div className="score-header">
                <span className="score-num">{evaluation.score} / 100</span>
                <span className="score-label">AI Score</span>
              </div>

              <p className="feedback-text">{evaluation.feedback}</p>

              <div className="concepts-grid">
                <div>
                  <h4 className="text-green"><CheckCircle2 size={16} /> Key Concepts Covered</h4>
                  <ul>
                    {evaluation.keyMatched.map((c, i) => <li key={i}>{c}</li>)}
                    {evaluation.keyMatched.length === 0 && <li>None detected</li>}
                  </ul>
                </div>

                <div>
                  <h4 className="text-orange"><AlertCircle size={16} /> Recommended Terms to Include</h4>
                  <ul>
                    {evaluation.missingConcepts.map((c, i) => <li key={i}>{c}</li>)}
                    {evaluation.missingConcepts.length === 0 && <li>Covered all key terms!</li>}
                  </ul>
                </div>
              </div>

              <div className="sample-answer-accordion margin-top">
                <h4>Sample Strong Answer:</h4>
                <p>{activeQ.sampleAnswer}</p>
              </div>

              <div className="eval-actions">
                <button className="btn-secondary" onClick={() => setEvaluation(null)}>
                  <RotateCcw size={14} /> Retry Answer
                </button>
                <button className="btn-primary" onClick={handleNext}>
                  Next Question
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Questions List & Focus Topics */}
        <div className="prep-panel">
          <div className="panel-header">
            <h3><BookOpen size={18} /> Interview Questions List</h3>
          </div>

          <div className="questions-nav-list">
            {questions.map((q, idx) => (
              <div 
                key={q.id} 
                className={`q-nav-item ${idx === activeIdx ? 'active' : ''}`}
                onClick={() => {
                  setActiveIdx(idx);
                  setEvaluation(null);
                  setUserAnswer('');
                }}
              >
                <div className="q-nav-num">Q{idx + 1}</div>
                <div className="q-nav-title">{q.question}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
