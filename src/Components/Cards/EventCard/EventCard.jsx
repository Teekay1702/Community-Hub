import {
  MapPin,
  Calendar,
  Users,
  Heart,
  Shirt,
  BookOpen,
  Package,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event, onEdit, onDelete }) => {
  const navigate = useNavigate();

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

  const handleJoin = (e) => {
    e.stopPropagation();
    navigate('/volunteers', { state: { showForm: true } });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  };

  const handleEdit = () => {
    onEdit(event);
  };

  return (
    <div className="event-card" onClick={handleEdit}>
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
          {event.volunteers}{event.needed} volunteers
        </div>

        <div className="footer-buttons">
          <button className="join-button" onClick={handleJoin}>
            Join Ubuntu Spirit
          </button>
          <button
            className="delete-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
