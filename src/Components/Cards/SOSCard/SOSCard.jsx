import { AlertTriangle } from 'lucide-react';
import './SOSCard.css';
import { useNavigate } from 'react-router-dom';

const SOSCard = ({ sos }) => {
  const navigate = useNavigate();

  const handleRespond = () => {
    navigate('/profile', {
      state: {
        name: 'SOS Responder',
        email: '',
        message: `Responding to SOS: ${sos.type}\nLocation: ${sos.location}\nTime: ${sos.time}`,
      },
    });
  };

  return (
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

      <button className="btn-respond" onClick={handleRespond}>
        Respond Now
      </button>
    </div>
  );
};

export default SOSCard;
