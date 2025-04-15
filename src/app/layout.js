'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })

// Navigation items for the sidebar - Only Claims
const navItems = [
  { id: 1, name: 'Claims', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )}
];

export default function RootLayout({ children }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(1); // Default to Claims
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const logoutMenuRef = useRef(null);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      // If not on login page, redirect to login
      const pathname = window.location.pathname;
      if (pathname !== '/login') {
        router.push('/login');
      }
    }

    // Add event listener for clicks outside the logout menu
    const handleClickOutside = (event) => {
      if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target)) {
        setShowLogoutMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowLogoutMenu(false);
    router.push('/login');
  };

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* Only render sidebar if logged in */}
          {isLoggedIn && (
            <div className="w-[86px] bg-[#001637] flex flex-col items-center">
              <div className="mt-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#001637]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col space-y-6">
                {/* Only Claims navigation icon */}
                {navItems.map(item => (
                  <div 
                    key={item.id} 
                    className="w-10 h-10 bg-[#122a4e] flex items-center justify-center rounded cursor-pointer transition-colors duration-200"
                    title={item.name}
                  >
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-4 relative" ref={logoutMenuRef}>
                <button 
                  onClick={toggleLogoutMenu}
                  className="w-10 h-10 rounded-full bg-white/10 overflow-hidden cursor-pointer hover:bg-white/20 transition-colors"
                  title="Profile"
                >
                  <img 
                    src="https://i.pravatar.cc/40?img=12" 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </button>
                
                {/* Logout menu */}
                {showLogoutMenu && (
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 bg-white rounded-md shadow-lg overflow-hidden z-10">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Main content */}
          <div className="flex-1 bg-gray-100">
            <main className="container mx-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
