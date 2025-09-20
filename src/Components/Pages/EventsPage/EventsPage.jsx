import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import EventCard from '../../Cards/EventCard/EventCard';
import LocationInput from './LocationInput';
import { fetchEvents, addEvent, deleteEvent, updateEvent } from '../../Data/firebaseEvents';
import emailjs from "emailjs-com";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Data/firebase";  // ensure db is exported from your firebase.js
import './Events.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: ' ',  // default value matches one of the select options
    location: '',
    date: '',
    volunteers: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Fetch all events on load
  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  // Handle create button click
  const handleCreateEvent = async () => {
    try {
      if (!newEvent.title || !newEvent.location || !newEvent.date) {
        setMessage("Please fill in all required fields.");
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 1000);
        return;
      }

      if (newEvent.id) {
        // Updating an existing event
        const { id, ...eventData } = newEvent;
        await updateEvent(id, eventData);
        setMessage("Event updated successfully!");
        setMessageType("success");
      } else {
        // Creating a new event
        await addEvent(newEvent);
        setMessage("Event created successfully!");
        setMessageType("success");

        // Fetch volunteers
        const snapshot = await getDocs(collection(db, "volunteers"));
        const volunteers = snapshot.docs.map(doc => doc.data());

        // Send emails
        for (const volunteer of volunteers) {
          await emailjs.send(
            "service_2urq71w",        // ✅ replace with your service ID
            "template_pa7cyff",       // ✅ replace with your template ID
            {
              to_email: volunteer.email,
              to_name: volunteer.name || "Ubuntu Volunteer",
              event_title: newEvent.title,
              event_date: newEvent.date,
              event_location: newEvent.location,
              event_volunteers: newEvent.volunteers || "N/A"
            },
            "cvMymiNn_bcU1gDbd"       // ✅ replace with your public key
          ).then(
            (result) => {
              console.log(`✅ Email sent to ${volunteer.email}`);
            },
            (error) => {
              console.error(`❌ Failed to send to ${volunteer.email}:`, error);
            }
          );
        }
      }

      setNewEvent({
        title: "",
        category: "",
        location: "",
        date: "",
        volunteers: ""
      });
      setShowNewEvent(false);

      const updatedEvents = await fetchEvents();
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to create/update event:", error);
      setMessage("Failed to create or update event. Please try again.");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  };



  const handleEdit = (event) => {
    setNewEvent(event);           // Load the clicked event into the form
    setShowNewEvent(true);        // Show the form for editing
  };


  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      // remove from local state after deletion
      setEvents(prevEvents => prevEvents.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };


  return (
    <div className="events-page">
      <div className="events-header">
        <h1 className="events-title">Community Events</h1>
        <button onClick={() => setShowNewEvent(true)} className="add-button">
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
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="form-input"
            />
            <select
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              className="form-input"
            >
              <option value="">Select Category</option>
              <option value="soup-kitchen">Food Drive</option>
              <option value="clothing">Clothing Drive</option>
              <option value="pads">Pads Drive</option>
              <option value="food">Food Sharing</option>
            </select>
            <input
              type="text"
              placeholder="Safe Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="form-input"
            />

            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Volunteers Needed"
              value={newEvent.volunteers}
              onChange={(e) => setNewEvent({ ...newEvent, volunteers: parseInt(e.target.value) || 0 })}
              className="form-input"
            />
            <div className="form-actions">
              <button onClick={handleCreateEvent} className="submit-button">
                Create Event
              </button>
              <button onClick={() => setShowNewEvent(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {message && (
        <p className={`event-message ${messageType}`}>
          {message}
        </p>
      )}
      <div className="events-list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        ))}
      </div>
    </div>
  );
};

export default EventsPage;
