import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Gamefind 🎮</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Choose a course</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        courses.map(course => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            style={{
              backgroundColor: '#4A90E2',
              color: '#fff',
              padding: 20,
              borderRadius: 12,
              marginBottom: 12,
              cursor: 'pointer',
              fontSize: 18,
              fontWeight: 600
            }}
          >
            {course.name}
          </div>
        ))
      )}
    </div>
  );
}