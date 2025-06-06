import { Heart, Shirt, Shield, BookOpen, AlertTriangle } from 'lucide-react';
import EventCard from '../../Cards/EventCard/EventCard';
import SOSCard from '../../Cards/SOSCard/SOSCard';
import './HomePage.css';

const HomePage = ({ events, sosRequests }) => (
  <div className="home-page">
    <div className="hero-banner">
      <h1 className="hero-title">It Takes A Village</h1>
      <p className="hero-description">
        The concept of "It takes a village to raise a child" is a concept that has been forgotten in this time and age and it was meant to be a South African concept of what our core as a nation truly is, the spirit that is the backbone of the country - uBuntu.
      </p>
    </div>

    {sosRequests.filter(sos => sos.status === 'active').length > 0 && (
      <div className="sos-section">
        <h3 className="sos-title">
          <AlertTriangle className="sos-icon" />
          🆘 Active Emergency Requests
        </h3>
        {sosRequests.filter(sos => sos.status === 'active').map(sos => (
          <SOSCard key={sos.id} sos={sos} />
        ))}
      </div>
    )}

    <div className="services-grid">
      <div className="service-card">
        <Heart className="service-icon red" />
        <h3 className="service-title">Soup Kitchens</h3>
        <p className="service-description">5 active stations</p>
      </div>
      <div className="service-card">
        <Shirt className="service-icon green" />
        <h3 className="service-title">Clothing Drives</h3>
        <p className="service-description">18 donations ready</p>
      </div>
      <div className="service-card">
        <Shield className="service-icon pink" />
        <h3 className="service-title">Pads Emergency</h3>
        <p className="service-description">24/7 SOS support</p>
      </div>
      <div className="service-card">
        <BookOpen className="service-icon blue" />
        <h3 className="service-title">School Uniforms</h3>
        <p className="service-description">Ready for collection</p>
      </div>
    </div>

    <div className="events-section">
      <h2 className="events-heading">Ubuntu Spirit in Action</h2>
      {events
        .slice() // to avoid mutating original
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by most recent
        .slice(0, 3) // take top 3
        .map(event => (
          <EventCard key={event.id} event={event} />
        ))}
    </div>
  </div>
);

export default HomePage;
