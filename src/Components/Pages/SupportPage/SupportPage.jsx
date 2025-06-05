import { Heart, Phone, MessageCircle } from 'lucide-react';
import './SupportPage.css';

const SupportPage = () => (
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
        <button className="btn chat-now">
          <MessageCircle className="btn-icon" />
          Chat Now
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
        Request Community Help
      </button>
    </section>

    <section className="volunteer-support">
      <h3 className="section-title">Volunteer as Mental Health Support</h3>
      <p className="description">
        Help others by offering your time and compassion. Training provided.
      </p>
      <button className="btn become-volunteer">
        Become a Support Volunteer
      </button>
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

export default SupportPage;
