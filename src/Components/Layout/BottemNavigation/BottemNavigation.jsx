import { NavLink } from 'react-router-dom'
import { Home, Calendar, Heart, Users, BookOpen, User } from 'lucide-react'
import './BottemNavigation.css'

const BottomNavigation = () => (
  <nav className='bottom-nav'>
    <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}>
      <div className="nav-item">
        <Home size={28} />
        <span className="nav-label">Home</span>
      </div>
    </NavLink>

    <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}>
      <div className="nav-item">
        <Calendar size={28} />
        <span className="nav-label">Events</span>
      </div>
    </NavLink>

    <NavLink to="/support" className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}>
      <div className="nav-item">
        <Heart size={28} />
        <span className="nav-label">Support</span>
      </div>
    </NavLink>

    <NavLink to="/volunteers" className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}>
      <div className="nav-item">
        <Users size={28} />
        <span className="nav-label">Volunteers</span>
      </div>
    </NavLink>

    <NavLink to="/resources" className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}>
      <div className="nav-item">
        <BookOpen size={28} />
        <span className="nav-label">Resources</span>
      </div>
    </NavLink>

    <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'text-orange-500' : ''}`}>
      <div className="nav-item">
        <User size={28} />
        <span className="nav-label">Profile</span>
      </div>
    </NavLink>
  </nav>
);

export default BottomNavigation;
