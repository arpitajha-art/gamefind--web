import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Courses from './pages/courses';
import Topics from './pages/topics';
import Flashcards from './pages/flashcards';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/course/:id" element={<Topics />} />
        <Route path="/topic/:id" element={<Flashcards />} />
      </Routes>
    </BrowserRouter>
  );
}