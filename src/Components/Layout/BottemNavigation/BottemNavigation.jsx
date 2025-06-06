import { NavLink } from 'react-router-dom'
import { Home, Calendar, Heart, Users, BookOpen, User } from 'lucide-react'
import './BottemNavigation.css'

const BottomNavigation = () => (
  <nav className='bottom-nav'>
    <NavLink 
      to="/home" 
      className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}
    >
      <Home size={35} />
    </NavLink>
    <NavLink 
      to="/events" 
      className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}
    >
      <Calendar size={35} />
    </NavLink>
    <NavLink 
      to="/support" 
      className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}
    >
      <Heart size={35} />
    </NavLink>
    <NavLink 
      to="/volunteers" 
      className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}
    >
      <Users size={35} />
    </NavLink>
    <NavLink 
      to="/resources" 
      className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}
    >
      <BookOpen size={35} />
    </NavLink>
    <NavLink 
      to="/profile" 
      className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}
    >
      <User size={35} />
    </NavLink>
  </nav>
)

export default BottomNavigation
