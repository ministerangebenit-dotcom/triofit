import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';

const STRINGS = {
  en: {
    headline: 'How will you be seen?',
    subtitle: "Know exactly how you'll be perceived before you walk into the room.",
    cta: 'Get started',
    goalTitle: 'Why are you here today?',
    goals: {
      job: 'Get a job',
      date: 'Impress on a date',
      wealth: 'Look wealthier',
      wedding: 'Wedding',
      authority: 'Build authority',
      brand: 'Personal branding',
    },
    nameTitle: 'What should we call you?',
    namePlaceholder: 'Your first name',
    continue: 'Continue',
    situationPlaceholder: 'Tell us about the situation and how you want to be seen...',
    send: 'Send',
    confirmTitle: "Here's what I understood",
    confirmYes: "That's right",
    confirmEdit: 'Edit',
    processing: [
      'Reading your situation...',
      'Building your perception profile...',
      'Analyzing social signals...',
      'Almost there...',
    ],
    analysisImpression: 'Predicted impression',
    analysisStrengths: 'Strengths',
    analysisCautions: 'Watch out for',
    refineCta: 'Get outfit recommendations',
    quickCta: 'Just give me quick advice',
    shareResult: 'Share your result',
    openMaps: 'Open in Maps',
    menu: {
      about: 'About TRIOFIT',
      registerStore: 'Register Your Store',
      yourFits: 'YourFits',
      memorial: 'In Memoriam',
      wardrobe: 'Wardrobe Analysis',
      measurements: 'Body Measurements',
    },
    wardrobeTitle: 'Wardrobe Analysis',
    wardrobeUpload: 'Upload a photo of your clothing',
    analyze: 'Analyze',
    measurementsTitle: 'Body Measurements',
    measurementsUpload: 'Upload a full-body photo',
  },
  fr: {
    headline: 'Comment serez-vous perçu(e) ?',
    subtitle: 'Sachez exactement comment vous serez perçu(e) avant même d\'entrer dans la pièce.',
    cta: 'Commencer',
    goalTitle: "Pourquoi êtes-vous ici aujourd'hui ?",
    goals: {
      job: 'Décrocher un emploi',
      date: 'Impressionner un rendez-vous',
      wealth: 'Paraître plus aisé(e)',
      wedding: 'Mariage',
      authority: "Renforcer l'autorité",
      brand: 'Image personnelle',
    },
    nameTitle: 'Comment devons-nous vous appeler ?',
    namePlaceholder: 'Votre prénom',
    continue: 'Continuer',
    situationPlaceholder: 'Parlez-nous de la situation et de l\'image que vous voulez donner...',
    send: 'Envoyer',
    confirmTitle: "Voici ce que j'ai compris",
    confirmYes: "C'est exact",
    confirmEdit: 'Modifier',
    processing: [
      'Lecture de votre situation...',
      'Construction de votre profil de perception...',
      'Analyse des signaux sociaux...',
      'Presque terminé...',
    ],
    analysisImpression: 'Impression prédite',
    analysisStrengths: 'Points forts',
    analysisCautions: 'Points de vigilance',
    refineCta: 'Recevoir des recommandations de tenues',
    quickCta: 'Donnez-moi juste un conseil rapide',
    shareResult: 'Partager votre résultat',
    openMaps: 'Ouvrir dans Maps',
    menu: {
      about: 'À propos de TRIOFIT',
      registerStore: 'Enregistrer votre boutique',
      yourFits: 'YourFits',
      memorial: 'In Memoriam',
      wardrobe: 'Analyse de garde-robe',
      measurements: 'Mesures corporelles',
    },
    wardrobeTitle: 'Analyse de garde-robe',
    wardrobeUpload: 'Téléchargez une photo de vos vêtements',
    analyze: 'Analyser',
    measurementsTitle: 'Mesures corporelles',
    measurementsUpload: 'Téléchargez une photo en pied',
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('triofit_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('triofit_lang', lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'en' ? 'fr' : 'en'));
  const t = STRINGS[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
