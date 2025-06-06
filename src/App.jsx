import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './Components/Layout/MainLayout/MainLayout'
import HomePage from './Components/Pages/HomePage/HomePage'
import EventsPage from './Components/Pages/EventsPage/EventsPage'
import ResourcesPage from './Components/Pages/ResourcesPage/ResourcesPage'
import SupportPage from './Components/Pages/SupportPage/SupportPage'
import VolunteersPage from './Components/Pages/VolunteersPage/Volunteers'
import ProfilePage from './Components/Pages/ProfilePage/ProfilePage'
import { fetchEvents, addEvent, updateEvent } from './Components/Data/firebaseEvents'

const App = () => {
  const [events, setEvents] = useState([])
  const [resources, setResources] = useState([])
  const [sosRequests, setSosRequests] = useState([])
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [showSOS, setShowSOS] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    date: '',
    volunteers: 0,
    category: 'soup-kitchen'
  })

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents()
      setEvents(data)
    }
    loadEvents()
  }, [])


  const handleCreateEvent = async () => {
  if (newEvent.title && newEvent.location && newEvent.date) {
    try {
      if (newEvent.id) {
        const { id, ...eventData } = newEvent;
        await updateEvent(id, eventData);
      } else {
        await addEvent(newEvent);
      }

      const updatedEvents = await fetchEvents();
      setEvents(updatedEvents);

      setNewEvent({ 
        title: '', 
        location: '', 
        date: '', 
        volunteers: 0, 
        category: 'soup-kitchen' 
      });
      setShowNewEvent(false);
    } catch (error) {
      console.error('Failed to create/update event:', error);
      alert('Error saving event');
    }
  }
}


  const handleSendSOS = (sosData) => {
    const newSOS = {
      id: sosRequests.length + 1,
      ...sosData,
      time: 'Just now',
      status: 'active'
    }
    setSosRequests([newSOS, ...sosRequests])
    setShowSOS(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Layout Route with shared Header & BottomNavigation */}
        <Route
          element={<MainLayout sosRequests={sosRequests} />}
        >
          <Route path="/home" element={<HomePage events={events} sosRequests={sosRequests} />} />
          <Route path="/events" element={
            <EventsPage
              events={events}
              showNewEvent={showNewEvent}
              setShowNewEvent={setShowNewEvent}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleCreateEvent={handleCreateEvent}
            />
          } />
          <Route path="/resources" element={
            <ResourcesPage
              resources={resources}
              setResources={setResources}
              showSOS={showSOS}
              setShowSOS={setShowSOS}
              handleSendSOS={handleSendSOS}
            />
          } />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/volunteers" element={<VolunteersPage events={events} />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  )
}

export default App
