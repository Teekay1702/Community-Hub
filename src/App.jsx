import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './Components/Layout/Header/Header'
import BottomNavigation from './Components/Layout/BottemNavigation/BottemNavigation'
import HomePage from './Components/Pages/HomePage/HomePage'
import EventsPage from './Components/Pages/EventsPage/EventsPage'
import ResourcesPage from './Components/Pages/ResourcesPage/ResourcesPage'
import SupportPage from './Components/Pages/SupportPage/SupportPage'
import VolunteersPage from './Components/Pages/VolunteersPage/Volunteers'
import ProfilePage from './Components/Pages/ProfilePage/ProfilePage'
import { initialEvents, initialResources, initialSosRequests } from './Components/Data/initialData'

const App = () => {
  const [events, setEvents] = useState(initialEvents)
  const [resources] = useState(initialResources)
  const [sosRequests, setSosRequests] = useState(initialSosRequests)
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [showSOS, setShowSOS] = useState(false)
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    location: '', 
    date: '', 
    volunteers: 0, 
    category: 'soup-kitchen' 
  })

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.location && newEvent.date) {
      setEvents([...events, { 
        id: events.length + 1, 
        ...newEvent, 
        volunteers: 0, 
        needed: parseInt(newEvent.volunteers) || 10 
      }])
      setNewEvent({ 
        title: '', 
        location: '', 
        date: '', 
        volunteers: 0, 
        category: 'soup-kitchen' 
      })
      setShowNewEvent(false)
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
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <Header sosRequests={sosRequests} />

        <div className="p-4 pb-20">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
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
              showSOS={showSOS}
              setShowSOS={setShowSOS}
              handleSendSOS={handleSendSOS}
            />
            } />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/volunteers" element={<VolunteersPage events={events} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>

        <BottomNavigation />
      </div>
    </Router>
  )
}

export default App
