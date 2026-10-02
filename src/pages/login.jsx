import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function Login() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      });
      const user = await res.json();
      localStorage.setItem('gamefind_user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, textAlign: 'center' }}>
      <h1>Gamefind 🎮</h1>
      <p style={{ color: '#666', marginBottom: 30 }}>Enter a username to start</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        placeholder="Your username"
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          border: '1px solid #ccc',
          marginBottom: 16,
          boxSizing: 'border-box'
        }}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: '100%',
          padding: 14,
          fontSize: 16,
          fontWeight: 600,
          backgroundColor: '#4A90E2',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Logging in...' : 'Start Learning'}
      </button>
    </div>
  );
}