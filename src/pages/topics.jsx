import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function Topics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/courses/${id}/topics`)
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', padding: 20 }}>
      <h2>Topics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        topics.map(topic => (
          <div
            key={topic.id}
            onClick={() => navigate(`/topic/${topic.id}`)}
            style={{
              backgroundColor: '#50C878',
              color: '#fff',
              padding: 20,
              borderRadius: 12,
              marginBottom: 12,
              cursor: 'pointer',
              fontSize: 18,
              fontWeight: 600
            }}
          >
            {topic.name}
          </div>
        ))
      )}
    </div>
  );
}