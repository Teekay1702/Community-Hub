import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Data/firebase';
import './VolunteersPage.css';

const VolunteersPage = ({ events }) => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleVolunteerSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Volunteer registered successfully!');
      setEmail('');
      setPassword('');
      setShowForm(false);
    } catch (error) {
      console.error('Error registering:', error);
      alert(error.message);
    }
  };

  return (
    <div className="volunteers-page">
      <h1 className="page-title">Ubuntu Volunteers</h1>

      <section className="impact-summary card">
        <h3 className="section-title">Your Ubuntu Impact</h3>
        <div className="impact-grid">
          <div className="impact-item">
            <div className="impact-value orange">15</div>
            <div className="impact-label">Events Joined</div>
          </div>
        </div>
      </section>

      <section className="volunteer-registration card">
        <h3 className="section-title">Want to Become a Volunteer?</h3>
        {!showForm ? (
          <button className="btn-join" onClick={() => setShowForm(true)}>
            Register as a Volunteer
          </button>
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
              <button className="btn-join">
                Join Ubuntu Mission
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default VolunteersPage;
