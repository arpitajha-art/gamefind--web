import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Courses from './pages/Courses';
import Topics from './pages/Topics';
import Flashcards from './pages/Flashcards';
import Login from './pages/Login';

function RequireAuth({ children }) {
  const user = localStorage.getItem('gamefind_user');
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Courses /></RequireAuth>} />
        <Route path="/course/:id" element={<RequireAuth><Topics /></RequireAuth>} />
        <Route path="/topic/:id" element={<RequireAuth><Flashcards /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}