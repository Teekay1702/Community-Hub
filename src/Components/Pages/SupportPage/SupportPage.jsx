import React, { useState } from 'react';
import { Heart, Phone } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Data/firebase'; // ✅ Import db from your firebase config
import { setDoc, doc } from 'firebase/firestore'; // ✅ Firestore functions
import { Link } from 'react-router-dom';
import './SupportPage.css';

const SupportPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleVolunteerSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Save to 'supportVolunteers' collection
      await setDoc(doc(db, 'support', email), {
        email,
        createdAt: new Date()
      });

      setEmail('');
      setPassword('');
      setShowForm(false);
      alert('Support volunteer registered successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message);
    }
  };

  return (
    <div className="support-page">
      <h1 className="page-title">Mental Health & Support</h1>

      <section className="mental-health-support">
        <h3 className="section-title with-icon">
          <Heart className="icon" />
          Free Mental Health Support
        </h3>
        <p className="description">
          Ubuntu spirit includes caring for each other's mental wellbeing. Get free support from trained volunteers.
        </p>
        <div className="button-group">
          <button className="btn call-support">
            <Phone className="btn-icon" />
            Call Support
          </button>
        </div>
      </section>

      <section className="ask-assistance">
        <h3 className="section-title">Ask for Assistance</h3>
        <textarea
          placeholder="Describe what kind of help you need... Our community is here to support you."
          className="textarea"
        ></textarea>
        <button className="btn request-help">
          Submit request
        </button>
      </section>

      <section className="volunteer-support">
        <h3 className="section-title">Volunteer as Mental Health Support</h3>
        <p className="description">
          Help others by offering your time and compassion. Training provided.
        </p>

        {!showForm ? (
          <>
            <button className="btn become-volunteer" onClick={() => setShowForm(true)}>
              Register as a Support Volunteer
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
              className="input-form"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create a password"
              className="input-form"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-submit-volunteer" onClick={handleVolunteerSignup}>
              Submit Registration
            </button>
            <button className="btn become-volunteer" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <Link to="/profile" className="btn-request-remove">
              Request to be Removed
            </Link>
          </div>
        )}
      </section>


      <section className="recent-requests">
        <h3 className="section-title">Recent Support Requests</h3>
        <div className="requests-list">
          <div className="request-item border-blue">
            <p className="request-text">Someone in Soweto needs emotional support</p>
            <p className="request-meta">2 hours ago • 3 volunteers responded</p>
          </div>
          <div className="request-item border-green">
            <p className="request-text">Family in Khayelitsha needs guidance</p>
            <p className="request-meta">Yesterday • Resolved</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
