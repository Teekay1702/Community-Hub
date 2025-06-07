import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './Components/Layout/MainLayout/MainLayout'
import HomePage from './Components/Pages/HomePage/HomePage'
import EventsPage from './Components/Pages/EventsPage/EventsPage'
import ResourcesPage from './Components/Pages/ResourcesPage/ResourcesPage'
import SupportPage from './Components/Pages/SupportPage/SupportPage'
import VolunteersPage from './Components/Pages/VolunteersPage/Volunteers'
import ProfilePage from './Components/Pages/ProfilePage/ProfilePage'
import { addEvent, updateEvent } from './Components/Data/firebaseEvents'
import { addSOSRequest } from './Components/Data/firebaseSOS'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './Components/Data/firebase'

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

  // Real-time subscription for Events
  useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
    const eventsData = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    setEvents(eventsData)
  }, (error) => {
    console.error("Error fetching events:", error)
  })

  return () => unsubscribe()
}, [])


  // Real-time subscription for SOS requests
  useEffect(() => {
    const unsubscribeSOS = onSnapshot(collection(db, "sosRequests"), (snapshot) => {
      const sosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setSosRequests(sosData)
    }, (error) => {
      console.error("Error fetching SOS requests:", error)
    })

    return () => unsubscribeSOS()
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

  const handleSendSOS = async (sosData) => {
    try {
      await addSOSRequest(sosData)
      setSosRequests(updatedSOS)
      setShowSOS(false)
    } catch (error) {
      console.error('Error sending SOS:', error)
      alert('Failed to send SOS')
    }
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
