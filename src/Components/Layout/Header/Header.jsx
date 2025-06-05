import { Bell } from 'lucide-react';
import './Header.css';

const Header = ({ sosRequests }) => (
  <div className="header">
    <h1 className="header-title">It Takes A Village</h1>
    <div className="notification">
      <Bell className="notification-icon" />
      {sosRequests.filter(sos => sos.status === 'active').length > 0 && (
        <div className="notification-dot"></div>
      )}
    </div>
  </div>
);

export default Header;
