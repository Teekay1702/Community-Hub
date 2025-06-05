import { useState } from 'react';
import ResourceCard from '../../Cards/ResourceCards/ResourceCard';
import './ResourcesPage.css';

const ResourcesPage = ({ resources, showSOS, setShowSOS, handleSendSOS }) => {
  const [sosForm, setSosForm] = useState({
    type: 'Pads Emergency',
    location: '',
    description: ''
  });

  const handleSubmitSOS = () => {
    if (sosForm.location && sosForm.description) {
      handleSendSOS(sosForm);
      setSosForm({ type: 'Pads Emergency', location: '', description: '' });
    }
  };

  return (
    <div className="resources-page">
      <div className="header-row">
        <h1 className="page-title">Ubuntu Resources</h1>
        <button 
          onClick={() => setShowSOS(true)}
          className="sos-button"
        >
          🆘 SOS Request
        </button>
      </div>

      {showSOS && (
        <div className="sos-form-container">
          <h3 className="sos-form-title">🆘 Emergency SOS Request</h3>
          <div className="sos-form">
            <select 
              value={sosForm.type}
              onChange={(e) => setSosForm({...sosForm, type: e.target.value})}
              className="input-select"
            >
              <option>Pads Emergency</option>
              <option>Mental Health Support</option>
              <option>Food Emergency</option>
              <option>Safe Location Needed</option>
            </select>
            <input 
              type="text" 
              placeholder="Your Location" 
              value={sosForm.location}
              onChange={(e) => setSosForm({...sosForm, location: e.target.value})}
              className="input-text" 
            />
            <textarea 
              placeholder="Brief description of urgent need..." 
              value={sosForm.description}
              onChange={(e) => setSosForm({...sosForm, description: e.target.value})}
              className="input-textarea"
            />
            <div className="sos-form-buttons">
              <button 
                onClick={handleSubmitSOS}
                className="sos-send-button"
              >
                🆘 Send SOS Alert
              </button>
              <button 
                onClick={() => setShowSOS(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="category-filters">
        <button className="category-button active">All</button>
        <button className="category-button">Food</button>
        <button className="category-button">Clothing</button>
        <button className="category-button">Uniforms</button>
        <button className="category-button">🆘 Pads SOS</button>
      </div>

      <div className="resources-list">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
