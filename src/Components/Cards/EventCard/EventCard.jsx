import {
  MapPin,
  Calendar,
  Users,
  Heart,
  Shirt,
  BookOpen,
  Package,
} from 'lucide-react';
import './EventCard.css';

const EventCard = ({ event }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'soup-kitchen':
        return <Heart className="icon red" />;
      case 'clothing':
        return <Shirt className="icon green" />;
      case 'uniforms':
        return <BookOpen className="icon blue" />;
      default:
        return <Package className="icon gray" />;
    }
  };

  return (
    <div className="event-card">
      <div className="card-header">
        {getCategoryIcon(event.category)}
        <h3 className="event-title">{event.title}</h3>
      </div>
      <div className="event-detail">
        <MapPin className="detail-icon" />
        <span className="truncate">{event.location}</span>
      </div>
      <div className="event-detail">
        <Calendar className="detail-icon" />
        {event.date}
      </div>
      <div className="card-footer">
        <div className="volunteer-count">
          <Users className="detail-icon" />
          {event.volunteers}/{event.needed} volunteers
        </div>
        <button className="join-button">
          Join Ubuntu Spirit
        </button>
      </div>
    </div>
  );
};

export default EventCard;
