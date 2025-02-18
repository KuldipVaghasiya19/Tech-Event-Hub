import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModal } from './AuthModal';

const LoginButton = ({ handleAuthClick }) => (
  <button
    onClick={() => handleAuthClick('login')}
    className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
  >
    <LogIn className="w-4 h-4" />
    Login
  </button>
);

const SignUpButton = ({ setShowSignupOptions, showSignupOptions }) => (
  <div className="relative">
    <button
      onClick={() => setShowSignupOptions(!showSignupOptions)}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
    >
      <UserPlus className="w-4 h-4" />
      Sign Up
    </button>
    {showSignupOptions && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
        <button
          onClick={() => handleAuthClick('signup-organization')}
          className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700"
        >
          Sign Up as Organization
        </button>
        <button
          onClick={() => handleAuthClick('signup-participant')}
          className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700"
        >
          Sign Up as Participant
        </button>
      </div>
    )}
  </div>
);

const LogoutButton = ({ handleLogout }) => (
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
  >
    Logout
  </button>
);

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authType, setAuthType] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignupOptions, setShowSignupOptions] = useState(false);

  const handleAuthClick = (type) => {
    setAuthType(type);
    setShowAuthModal(true);
    setShowSignupOptions(false);
    setShowAuthOptions(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img
                  src="/src/pictures/Tech_hub_logo.png"
                  alt="Tech Events Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-indigo-600">Tech Events Hub</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/events">
                <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  Events
                </button>
              </Link>
              <Link to="/aboutus">
                <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  About Us
                </button>
              </Link>
              <Link to="/contactus">
                <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  Contact Us
                </button>
              </Link>

              {isLoggedIn ? (
                <LogoutButton handleLogout={handleLogout} />
              ) : (
                <>
                  <LoginButton handleAuthClick={handleAuthClick} />
                </>
              )}

                < div className="relative">
                  <button
                    onClick={() => setShowSignupOptions(!showSignupOptions)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </button>
                  {showSignupOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                      <button
                        onClick={() => handleAuthClick('signup-organization')}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700"
                      >
                        Sign Up as Organization
                      </button>
                      <button
                        onClick={() => handleAuthClick('signup-participant')}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700"
                      >
                        Sign Up as Participant
                      </button>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </nav>

      
      {showAuthModal && (
        <AuthModal
          type={authType}
          onClose={() => setShowAuthModal(false)}
          onSuccess={(type) => {
            setIsLoggedIn(true);
            setUserType(
              type === 'signup-organization' ? 'organization' : 'participant'
            );
            setShowAuthModal(false);
          }}
        />
      )}

      {showAuthModal && (
        <AuthModal
          type={authType}
          onClose={() => setShowAuthModal(false)}
          onSuccess={(type) => {
            setIsLoggedIn(true);
            setShowAuthModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
