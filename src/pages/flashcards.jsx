import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';

export default function Flashcards() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/topics/${id}/flashcards`)
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 60 }}>Loading...</p>;
  if (cards.length === 0) return <p style={{ textAlign: 'center', marginTop: 60 }}>No flashcards yet.</p>;

  const card = cards[index];

  const next = async () => {
    // Award XP for reviewing this card, and update the user's streak
    const storedUser = JSON.parse(localStorage.getItem('gamefind_user') || 'null');
    if (storedUser) {
      try {
        const res = await fetch(`${API_URL}/users/${storedUser.id}/activity`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 10, reason: 'flashcard_reviewed' })
        });
        const updatedUser = await res.json();
        localStorage.setItem('gamefind_user', JSON.stringify(updatedUser));
      } catch (err) {
        console.error(err);
      }
    }

    setFlipped(false);
    setIndex((index + 1) % cards.length);
  };

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', padding: 20, textAlign: 'center' }}>
      <p style={{ color: '#666' }}>{index + 1} / {cards.length}</p>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          backgroundColor: '#4A90E2',
          color: '#fff',
          padding: 30,
          borderRadius: 16,
          minHeight: 180,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: 20,
          fontWeight: 600
        }}
      >
        <p>{flipped ? card.back_text : card.front_text}</p>
        <p style={{ fontSize: 12, color: '#e0e0e0', marginTop: 20 }}>
          {flipped ? 'Click to see question' : 'Click to reveal answer'}
        </p>
      </div>
      <button
        onClick={next}
        style={{
          marginTop: 24,
          backgroundColor: '#50C878',
          color: '#fff',
          border: 'none',
          padding: '14px 30px',
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Next Card → (+10 XP)
      </button>
    </div>
  );
}