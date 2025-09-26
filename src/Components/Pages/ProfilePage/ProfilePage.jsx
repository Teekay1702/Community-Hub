import { User } from 'lucide-react';
import './ProfilePage.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Data/firebase';
import PrivacyPolicy from './PrivacyPolicy';

const ProfilePage = () => {
  const location = useLocation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [showPolicy, setShowPolicy] = useState(false);

  const type = location.state?.type || null;

  useEffect(() => {
    if (location.state) {
      setForm({
        name: location.state.name || '',
        email: location.state.email || '',
        phone: location.state.phone || '',
        message: location.state.message || '',
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      from_phone: form.phone,
      message: form.message,
      reply_to: form.email,
    };

    setStatus('Sending...');

    try {
      // Send Email
      await emailjs.send(
        'service_2urq71w',
        'template_tkzitdh',
        templateParams,
        'cvMymiNn_bcU1gDbd'
      );

      // Only save to Firestore if this is a support request
      if (type === 'supportRequest') {
        await addDoc(collection(db, 'supportRequests'), {
          name: form.name,
          email: form.email,
          text: form.message,
          timestamp: serverTimestamp(),
          status: 'submitted',
          responders: [],
        });
      }

      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <User className="avatar-icon" />
        </div>
        <h2 className="profile-name">Tumelo Lekoro</h2>
        <p className="profile-subtext">Spreading Ubuntu since 2025</p>
      </div>

      <div className="profile-sections">
        <section className="contact-form-section card">
          <h3>Contact Us</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-submit">
              Send Message
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
        {/* ✅ Privacy Policy link */}
        <section className="privacy-section card">
          <button
            className="btn-privacy"
            onClick={() => setShowPolicy(true)}
          >
            View Privacy Policy
          </button>
        </section>
      </div>

      {/* ✅ Modal */}
      {showPolicy && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowPolicy(false)}
            >
              ✖
            </button>
            <PrivacyPolicy />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
