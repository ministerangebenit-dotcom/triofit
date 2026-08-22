import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import ChatBackground from '../components/chat/ChatBackground';
import SideMenu from '../components/shared/SideMenu';
import ProModal from '../components/shared/ProModal';
import StarRatingModal from '../components/shared/StarRatingModal';
import LangToggle from '../components/shared/LangToggle';
import ThemeToggle from '../components/shared/ThemeToggle';
import ShareCard from '../components/shared/ShareCard';

import SituationInput from '../components/ui/SituationInput';
import ConfirmSummary from '../components/ui/ConfirmSummary';
import ProcessingSequence from '../components/ui/ProcessingSequence';
import AnalysisMessage from '../components/ui/AnalysisMessage';
import RefineQuestions from '../components/ui/RefineQuestions';
import QuickAdvice from '../components/ui/QuickAdvice';
import WaitingForStylist from '../components/ui/WaitingForStylist';
import OutfitCard from '../components/ui/OutfitCard';

import { endpoints } from '../lib/api';
import { useLang } from '../lib/i18n';

// Stage machine: situation -> confirm -> processing -> analysis -> (refine | quick) -> outfits -> chat
const STAGES = {
  SITUATION: 'situation',
  CONFIRM: 'confirm',
  PROCESSING: 'processing',
  ANALYSIS: 'analysis',
  REFINE: 'refine',
  WAITING: 'waiting',
  OUTFITS: 'outfits',
  QUICK: 'quick',
  CHAT: 'chat',
};

export default function Conversation() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const [stage, setStage] = useState(STAGES.SITUATION);
  const [messages, setMessages] = useState([]);
  const [rawSituation, setRawSituation] = useState('');
  const [summary, setSummary] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const scrollRef = useRef(null);

  const name = localStorage.getItem('triofit_name') || '';
  const goal = localStorage.getItem('triofit_goal') || 'authority';

  useEffect(() => {
    // Returning user: restore prior session if present.
    const sessionId = localStorage.getItem('triofit_session_id');
    if (sessionId) {
      endpoints
        .getHistory(sessionId)
        .then((res) => {
          if (res.data?.messages?.length) {
            setMessages(res.data.messages);
            setStage(STAGES.CHAT);
          }
        })
        .catch(() => {
          // No backend yet — fall through to fresh onboarding.
        });
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, stage]);

  const pushMessage = (role, content, type = 'text') => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role, content, type }]);
  };

  const handleSituationSubmit = async (text) => {
    setRawSituation(text);
    pushMessage('user', text);
    try {
      const res = await endpoints.extract({ text, goal, name });
      setSummary(res.data?.summary || text);
    } catch {
      setSummary(text);
    }
    setStage(STAGES.CONFIRM);
  };

  const handleConfirm = async (finalSummary) => {
    setSummary(finalSummary);
    setStage(STAGES.PROCESSING);
  };

  const handleProcessingComplete = async () => {
    try {
      const res = await endpoints.analysis({ summary, goal, name });
      setAnalysis(
        res.data?.analysis || {
          impression: '—',
          strengths: [],
          cautions: [],
          traits: [],
        }
      );
    } catch {
      setAnalysis({ impression: '—', strengths: [], cautions: [], traits: [] });
    }
    setStage(STAGES.ANALYSIS);
  };

  const handleRefine = async () => {
    setStage(STAGES.REFINE);
  };

  const handleQuickAdvice = async () => {
    setStage(STAGES.QUICK);
  };

  const handleRefineComplete = async (answers) => {
    setStage(STAGES.WAITING);
    try {
      const res = await endpoints.chat({ summary, goal, answers, type: 'outfits' });
      setOutfits(res.data?.outfits || []);
    } catch {
      setOutfits([]);
    }
    setStage(STAGES.OUTFITS);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    pushMessage('user', text);
    setChatInput('');
    try {
      const res = await endpoints.chat({ message: text, goal, name });
      pushMessage('assistant', res.data?.reply || '...');
    } catch {
      pushMessage('assistant', "I'm having trouble connecting right now.");
    }
  };

  return (
    <div className="app-shell min-h-screen flex flex-col relative">
      <ChatBackground variant="neutral" />

      <header className="flex items-center justify-between px-4 py-3 glass sticky top-0 z-30">
        <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="text-xl">
          ☰
        </button>
        <div className="font-display text-lg" style={{ color: 'var(--gold)' }}>
          TRIOFIT
        </div>
        <div className="flex gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
              m.role === 'user' ? 'self-end' : 'self-start glass'
            }`}
            style={
              m.role === 'user'
                ? { background: 'var(--gold)', color: '#111' }
                : undefined
            }
          >
            {m.content}
          </motion.div>
        ))}

        {stage === STAGES.SITUATION && <SituationInput onSubmit={handleSituationSubmit} />}

        {stage === STAGES.CONFIRM && (
          <ConfirmSummary summary={summary} onConfirm={handleConfirm} onEdit={handleConfirm} />
        )}

        {stage === STAGES.PROCESSING && (
          <ProcessingSequence durationMs={30000} onComplete={handleProcessingComplete} />
        )}

        {stage === STAGES.ANALYSIS && analysis && (
          <>
            <AnalysisMessage
              analysis={analysis}
              onRefine={handleRefine}
              onQuickAdvice={handleQuickAdvice}
            />
            <ShareCard
              score={analysis.traits?.[0]?.value ?? 0}
              topTrait={analysis.traits?.[0]?.label ?? ''}
              name={name}
            />
          </>
        )}

        {stage === STAGES.REFINE && (
          <RefineQuestions
            questions={
              analysis?.refineQuestions || [
                {
                  id: 'q1',
                  text: 'What setting is this for?',
                  options: ['Indoor', 'Outdoor', 'Mixed'],
                },
                {
                  id: 'q2',
                  text: "What's your budget range?",
                  options: ['Low', 'Medium', 'High'],
                },
              ]
            }
            onComplete={handleRefineComplete}
          />
        )}

        {stage === STAGES.WAITING && <WaitingForStylist />}

        {stage === STAGES.OUTFITS && (
          <div className="flex flex-col gap-4">
            {outfits.length === 0 && (
              <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
                No outfits yet — connect the backend to see live recommendations.
              </p>
            )}
            {outfits.map((o, i) => (
              <OutfitCard key={i} outfit={o} />
            ))}
            <button
              onClick={() => setStage(STAGES.CHAT)}
              className="py-3 rounded-xl font-semibold glass"
            >
              Continue chatting
            </button>
          </div>
        )}

        {stage === STAGES.QUICK && (
          <QuickAdvice
            tips={
              analysis?.quickTips || [
                'Keep your posture open and relaxed.',
                'Choose one statement piece, not several.',
                'Match your color palette to the setting.',
              ]
            }
          />
        )}
      </main>

      {stage === STAGES.CHAT && (
        <div className="sticky bottom-0 px-4 py-3 glass flex gap-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
            placeholder={t.situationPlaceholder}
            className="flex-1 bg-transparent outline-none px-2"
          />
          <button aria-label="Voice" className="w-9 h-9 rounded-full glass">
            🎙️
          </button>
          <button
            onClick={handleChatSend}
            className="px-4 py-2 rounded-xl font-semibold"
            style={{ background: 'var(--gold)', color: '#111' }}
          >
            {t.send}
          </button>
        </div>
      )}

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ProModal open={proOpen} onClose={() => setProOpen(false)} />
      <StarRatingModal open={ratingOpen} onClose={() => setRatingOpen(false)} />
    </div>
  );
}
