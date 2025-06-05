import Header from '../Header/Header'
import BottomNavigation from '../BottemNavigation/BottemNavigation'
import { Outlet } from 'react-router-dom'
import './MainLayout.css'

const MainLayout = ({ sosRequests }) => {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative">
      <Header sosRequests={sosRequests} />
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  )
}

export default MainLayout
