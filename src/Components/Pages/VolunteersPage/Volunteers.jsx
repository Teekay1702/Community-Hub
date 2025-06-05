import React from 'react';
import './VolunteersPage.css';

const VolunteersPage = ({ events }) => (
    <div className="volunteers-page">
      <h1 className="page-title">Ubuntu Volunteers</h1>
      
      <section className="impact-summary card">
        <h3 className="section-title">Your Ubuntu Impact</h3>
        <div className="impact-grid">
          <div className="impact-item">
            <div className="impact-value orange">15</div>
            <div className="impact-label">Events Joined</div>
          </div>
          <div className="impact-item">
            <div className="impact-value green">67</div>
            <div className="impact-label">Hours Served</div>
          </div>
          <div className="impact-item">
            <div className="impact-value red">8</div>
            <div className="impact-label">Lives Touched</div>
          </div>
        </div>
      </section>
  
      <section className="events-list">
        <h3 className="section-title">Ways to Show Ubuntu Spirit</h3>
        {events.map(event => (
          <div key={event.id} className="event-card card">
            <h4 className="event-title">{event.title}</h4>
            <p className="event-meta">{event.location} • {event.date}</p>
            <div className="event-footer">
              <span className="volunteer-need">
                Need {event.needed - event.volunteers} more Ubuntu spirits
              </span>
              <button className="btn-join">
                Join Ubuntu Mission
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
  
  export default VolunteersPage;
  