import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homee from './components/Homee';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import EventsSection from './components/EventsSection';
import { EventDetailsModal } from './components/EventDetailsModal';

function App() {
  return (
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Homee />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/events" element={<EventsSection />} />
          <Route path="/events/:title" element={<EventDetailsModal />} />        
        </Routes>
      </div>
  );
}

export default App;