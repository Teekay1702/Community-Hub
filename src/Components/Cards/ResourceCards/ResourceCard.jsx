import {
  MapPin,
  Heart,
  Shirt,
  BookOpen,
  Shield,
  Package,
} from 'lucide-react';
import './ResourceCard.css';

const ResourceCard = ({ resource }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Food':
        return <Heart className="icon red" />;
      case 'Clothing':
        return <Shirt className="icon green" />;
      case 'Uniforms':
        return <BookOpen className="icon blue" />;
      case 'Pads':
        return <Shield className="icon pink" />;
      default:
        return <Package className="icon gray" />;
    }
  };

  const getStatusClass = (status, urgency) => {
    if (urgency === 'emergency') return 'status emergency pulse';
    switch (status) {
      case 'Available':
        return 'status available';
      case 'Pickup Needed':
        return 'status pickup';
      case 'Emergency SOS':
        return 'status emergency';
      default:
        return 'status default';
    }
  };

  return (
    <div className="resource-card">
      <div className="card-header">
        <div className="card-title">
          {getIcon(resource.type)}
          <span className="item-name">{resource.item}</span>
        </div>
        <span className={getStatusClass(resource.status, resource.urgency)}>
          {resource.status}
        </span>
      </div>
      <div className="location">
        <MapPin className="map-icon" />
        {resource.location}
      </div>
      <div className="card-actions">
        {resource.urgency === 'emergency' ? (
          <button className="button emergency pulse">
            🆘 Respond to Emergency
          </button>
        ) : (
          <>
            <button className="button collect">Help Collect</button>
            <button className="button donate">Donate Similar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
