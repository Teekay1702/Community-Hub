import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Data/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import './VolunteersPage.css';

const VolunteersPage = ({ events }) => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchVolunteerCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'volunteers'));
        setVolunteerCount(snapshot.size);
      } catch (error) {
        console.error('Failed to fetch volunteers:', error);
        setError('Failed to load volunteer count.');
      }
    };

    fetchVolunteerCount();
  }, []);

  useEffect(() => {
    const shouldOpen = location.state?.showForm;
    if (shouldOpen) {
      setShowForm(true);
    }
  }, [location.state]);

  const handleVolunteerSignup = async () => {
    setMessage('');
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'volunteers', email), {
        email,
        createdAt: new Date()
      });

      setEmail('');
      setPassword('');
      setShowForm(false);
      setMessage('Volunteer registered successfully!');

      const snapshot = await getDocs(collection(db, 'volunteers'));
      setVolunteerCount(snapshot.size);
    } catch (error) {
      console.error('Error registering:', error);
      setError(error.message);
    }
  };

  return (
    <div className="volunteers-page">
      <h1 className="page-title">Ubuntu Volunteers</h1>

      <section className="impact-summary card">
        <h3 className="section-title">Your Ubuntu Impact</h3>
        <div className="impact-grid">
          <div className="impact-item">
            <div className="impact-value orange">{volunteerCount}</div>
            <div className="impact-label">Registered Volunteers</div>
          </div>
        </div>
      </section>

      <section className="volunteer-registration card">
        <h3 className="section-title">Want to Become a Volunteer?</h3>

        {/* Display messages */}
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        {!showForm ? (
          <>
            <button className="btn-join" onClick={() => setShowForm(true)}>
              Register as a Volunteer
            </button>
            <Link to="/profile" className="btn-request-remove">
              Request to be Removed
            </Link>
          </>
        ) : (
          <div className="volunteer-form">
            <input
              type="email"
              placeholder="Your email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create a password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-join" onClick={handleVolunteerSignup}>
              Submit Registration
            </button>
            <button className="btn-cancel" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <Link to="/profile" className="btn-request-remove">
              Request to be Removed
            </Link>
          </div>
        )}

      </section>

      <section className="events-list">
        <h3 className="section-title">Ways to Show Ubuntu Spirit</h3>
        {events.map(event => (
          <div key={event.id} className="event-card card">
            <h4 className="event-title">{event.title}</h4>
            <p className="event-meta">{event.location} • {event.date}</p>
            <div className="event-footer">
              <span className="volunteer-need">
                Need {event.needed - event.volunteers} more Ubuntu spirits
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default VolunteersPage;
