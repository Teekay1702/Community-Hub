import { Plus } from 'lucide-react';
import EventCard from '../../Cards/EventCard/EventCard';
import './Events.css';

const EventsPage = ({ 
  events, 
  showNewEvent, 
  setShowNewEvent, 
  newEvent, 
  setNewEvent, 
  handleCreateEvent 
}) => (
  <div className="events-page">
    <div className="events-header">
      <h1 className="events-title">Community Events</h1>
      <button 
        onClick={() => setShowNewEvent(true)}
        className="add-button"
      >
        <Plus className="plus-icon" />
      </button>
    </div>

    {showNewEvent && (
      <div className="event-form">
        <h3 className="form-title">Create Ubuntu Event</h3>
        <div className="form-fields">
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            className="form-input"
          />
          <select
            value={newEvent.category}
            onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
            className="form-input"
          >
            <option value="soup-kitchen">Community Soup Kitchen</option>
            <option value="clothing">Clothing Drive</option>
            <option value="uniforms">School Uniforms</option>
            <option value="pads">Pads Drive</option>
            <option value="food">Food Sharing</option>
          </select>
          <input
            type="text"
            placeholder="Safe Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            className="form-input"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Volunteers Needed"
            value={newEvent.volunteers}
            onChange={(e) => setNewEvent({...newEvent, volunteers: e.target.value})}
            className="form-input"
          />
          <div className="form-actions">
            <button 
              onClick={handleCreateEvent}
              className="submit-button"
            >
              Create Event
            </button>
            <button 
              onClick={() => setShowNewEvent(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="events-list">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);

export default EventsPage;
