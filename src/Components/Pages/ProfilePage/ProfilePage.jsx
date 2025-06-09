import { User } from 'lucide-react';
import './ProfilePage.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ProfilePage = () => {
  const location = useLocation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (location.state) {
      setForm({
        name: location.state.name || '',
        email: location.state.email || '',
        message: location.state.message || '',
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: 'Test User',
      from_email: form.email,
      message: form.message,
      reply_to: form.email,
    };

    console.log('Submitting form:', form);

    emailjs
      .send(
        'service_2urq71w',       // Your EmailJS service ID
        'template_tkzitdh',      // Your EmailJS template ID
        templateParams,
        'cvMymiNn_bcU1gDbd'      // Your EmailJS public key
      )
      .then(() => {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <User className="avatar-icon" />
        </div>
        <h2 className="profile-name">Ubuntu Warrior</h2>
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
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-submit">Send Message</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
