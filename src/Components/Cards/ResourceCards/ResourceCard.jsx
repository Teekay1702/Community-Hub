import {
  MapPin,
  Heart,
  Shirt,
  BookOpen,
  Shield,
  Package,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc} from 'firebase/firestore';
import { db } from '../../Data/firebase'
import './ResourceCard.css';

const ResourceCard = ({ resource }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleCollectClick = () => {
    navigate('/profile', {
      state: {
        message: `I am willing to collect this item: ${resource.item}`,
      },
    });
  };

  const handleMarkAsCollected = async () => {
    try {
      const resourceRef = doc(db, 'resources', resource.id);
      await updateDoc(resourceRef, {
        status: 'Collected',
      });
      setShowConfirm(false);
    } catch (error) {
      console.error('Error updating resource:', error);
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
            <button className="button collect" onClick={handleCollectClick}>Help Collect</button>
            <button className="button donate" onClick={() => setShowConfirm(true)}>Collected</button>
          </>
        )}
      </div>
       {showConfirm && (
        <div className="confirmation-popup">
          <p>Are you sure you want to mark this resource as collected?</p>
          <div className="confirmation-buttons">
            <button className="yes-button" onClick={handleMarkAsCollected}>
              Yes
            </button>
            <button className="no-button" onClick={() => setShowConfirm(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
