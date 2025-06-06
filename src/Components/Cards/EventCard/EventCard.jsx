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

const EventCard = ({ event, onEdit, onDelete }) => {
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

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log('Delete clicked for event id:', event.id);
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  };

  const handleEdit = () => {
    console.log('Edit triggered for event:', event);
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
          {event.volunteers}/{event.needed} volunteers
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="join-button" onClick={e => e.stopPropagation()}>
            Join Ubuntu Spirit
          </button>
          <button
            className="join-button"
            style={{ backgroundColor: '#ef4444' }}
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
