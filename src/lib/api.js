import axios from 'axios';

// Base URL to be provided later (backend not yet wired up).
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('triofit_session_id');
  if (sessionId) config.headers['X-Session-Id'] = sessionId;
  return config;
});

export const endpoints = {
  createSession: (payload) => api.post('/session', payload),
  getSession: (id) => api.get(`/session/${id}`),
  setStage: (id, stage) => api.post(`/session/${id}/stage`, { stage }),
  limitCheck: (id) => api.get(`/session/${id}/limit-check`),
  recordAnalysis: (id, payload) => api.post(`/session/${id}/record-analysis`, payload),
  proStatus: (id) => api.get(`/session/${id}/pro-status`),

  extract: (payload) => api.post('/extract', payload),
  analysis: (payload) => api.post('/analysis', payload),
  refineQuestions: (payload) => api.post('/refine-questions', payload),
  quickAdvice: (payload) => api.post('/quick-advice', payload),
  chat: (payload) => api.post('/chat', payload),

  getMessages: (sessionId) => api.get(`/messages/${sessionId}`),
  postMessage: (payload) => api.post('/messages', payload),
  getHistory: (sessionId) => api.get(`/history/${sessionId}`),

  suggestTemplates: (payload) => api.post('/templates/suggest', payload),
  sendTemplate: (payload) => api.post('/templates/send', payload),

  upload: (formData) =>
    api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),

  storeInterest: (payload) => api.post('/store-interest', payload),

  wardrobe: (formData) =>
    api.post('/wardrobe', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  measurements: (formData) =>
    api.post('/measurements', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default api;
