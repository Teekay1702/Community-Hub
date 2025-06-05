import { AlertTriangle } from 'lucide-react';
import './SOSCard.css';

const SOSCard = ({ sos }) => (
  <div className="sos-card">
    <div className="sos-card-header">
      <div className="sos-card-type">
        <AlertTriangle className="sos-icon" />
        <span className="sos-type-text">{sos.type}</span>
      </div>
      <span className={`sos-status ${sos.status === 'active' ? 'active' : 'resolved'}`}>
        {sos.status}
      </span>
    </div>
    <div className="sos-location">📍 {sos.location}</div>
    <div className="sos-time">⏰ {sos.time}</div>
    {sos.status === 'active' && (
      <button className="sos-button">
        🆘 Respond Now
      </button>
    )}
  </div>
);

export default SOSCard;
