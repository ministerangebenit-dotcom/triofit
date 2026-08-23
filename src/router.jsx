import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import GoalScreen from './pages/GoalScreen';
import NameEntry from './pages/NameEntry';
import Conversation from './pages/Conversation';
import About from './pages/About';
import RegisterStore from './pages/RegisterStore';
import YourFits from './pages/YourFits';
import Memorial from './pages/Memorial';
import Wardrobe from './pages/Wardrobe';
import Measurements from './pages/Measurements';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/goal" element={<GoalScreen />} />
      <Route path="/name" element={<NameEntry />} />
      <Route path="/chat" element={<Conversation />} />
      <Route path="/about" element={<About />} />
      <Route path="/register-store" element={<RegisterStore />} />
      <Route path="/your-fits" element={<YourFits />} />
      <Route path="/memorial" element={<Memorial />} />
      <Route path="/wardrobe" element={<Wardrobe />} />
      <Route path="/measurements" element={<Measurements />} />
    </Routes>
  );
}
