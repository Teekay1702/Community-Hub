import { User } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => (
  <div className="profile-page">
    <div className="profile-card">
      <div className="profile-avatar">
        <User className="avatar-icon" />
      </div>
      <h2 className="profile-name">Ubuntu Warrior</h2>
      <p className="profile-subtext">Spreading Ubuntu since 2024</p>
    </div>

    <div className="profile-sections">
      <div className="profile-section">
        <h3 className="section-title">Settings</h3>
        <div className="section-buttons">
          <button className="section-button">SOS Alert Preferences</button>
          <button className="section-button">Safe Location Services</button>
          <button className="section-button">Ubuntu Notifications</button>
          <button className="section-button">Privacy & Safety</button>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Ubuntu Support</h3>
        <div className="section-buttons">
          <button className="section-button">Help Center</button>
          <button className="section-button">Contact Ubuntu Team</button>
          <button className="section-button">Report Safety Issue</button>
          <button className="section-button">Community Guidelines</button>
        </div>
      </div>
    </div>
  </div>
);

export default ProfilePage;
