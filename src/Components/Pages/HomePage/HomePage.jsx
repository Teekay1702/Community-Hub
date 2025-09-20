import { Heart, Shirt, Shield, BookOpen, AlertTriangle } from 'lucide-react';
import EventCard from '../../Cards/EventCard/EventCard';
import SOSCard from '../../Cards/SOSCard/SOSCard';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ events, sosRequests, resources }) => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate('/resources', { state: { category } });
  };

  const activeSos = sosRequests
    .filter(sos => sos.status === 'active')
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const latestSos = activeSos[0];

  const foodCount = resources.filter(r => r.type === 'Food' && r.status === 'Available').length;
  const clothingCount = resources.filter(r => r.type === 'Clothing' && r.status === 'Available').length;
  const padsCount = resources.filter(r => r.type === 'Pads' && r.status === 'Available' && r.urgency !== 'emergency').length;
  const emergencyPadsCount = resources.filter(r => r.type === 'Pads' && r.urgency === 'emergency').length;

  const today = new Date();

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)  // only future/upcoming events
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // sort by ascending date
    .slice(0, 3); // show only the next 3 events



  return (
    <div className="home-page">
      <div className="hero-banner">
        <h1 className="hero-title">It Takes A Village</h1>
        <p className="hero-description">
          The concept of "It takes a village to raise a child" is a concept that has been forgotten in this time and age and it was meant to be a South African concept of what our core as a nation truly is, the spirit that is the backbone of the country - uBuntu.
        </p>
      </div>

      {latestSos && (
        <div className="sos-section">
          <h3 className="sos-title">
            <AlertTriangle className="sos-icon" />
            🆘 Latest Emergency Request
          </h3>
          <SOSCard sos={latestSos} />
        </div>
      )}

      <div className="services-grid">
        <div className="service-card" onClick={() => handleNavigate('Food')}>
          <Heart className="service-icon red" />
          <h3 className="service-title">Food Drives</h3>
          <p className="service-description">{foodCount} available</p>
        </div>
        <div className="service-card" onClick={() => handleNavigate('Clothing')}>
          <Shirt className="service-icon green" />
          <h3 className="service-title">Clothing Drives</h3>
          <p className="service-description">{clothingCount} available</p>
        </div>
        <div className="service-card" onClick={() => handleNavigate('Pads Emergency')}>
          <Shield className="service-icon pink" />
          <h3 className="service-title">Emergency requests</h3>
          <p className="service-description">{emergencyPadsCount} available</p>
        </div>
        <div className="service-card" onClick={() => handleNavigate('Pads')}>
          <BookOpen className="service-icon blue" />
          <h3 className="service-title">Pads</h3>
          <p className="service-description">{padsCount} available</p>
        </div>
      </div>

      <div className="events-section">
        <h2 className="events-heading">Ubuntu Spirit in Action</h2>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

    </div>
  );
};

export default HomePage;
