import { User } from 'lucide-react';
import './ProfilePage.css';
import { useState } from 'react';

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You could integrate an email service here (e.g., EmailJS, Firebase, etc.)
    console.log('Contact form submitted:', form);

    setStatus('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
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
