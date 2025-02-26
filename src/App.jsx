import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homee from './components/Homee';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import EventsSection from './components/EventsSection';
import { EventDetailsModal } from './components/EventDetailsModal';
import ParticipantProfile from './components/ParticipantProfile';
import OrganizationProfile from './components/OrganizationProfile';
import { events } from './data/events';

function App() {
  const mockOrganization = {
    name: 'Tech Events Inc',
    type: 'Corporate',
    events: events,
  };
  const mockParticipant = {
    name: 'Kuldip Vaghasiya',
    email: 'kuldip@gmail.com',
    university: 'IIT Delhi',
    course: 'Computer Science',
    registeredEvents: events.slice(0, 3),
    upcomingEvents: events.slice(0, 2),
    pastEvents: events.slice(2, 4),
  };
  return (
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Homee />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/events" element={<EventsSection />} />
          <Route path="/events/:title" element={<EventDetailsModal />} />
          <Route path="/participant/:name" element={<ParticipantProfile />} />
          <Route path="/organization/:name" element={<OrganizationProfile />} />
        </Routes>
        {/* <OrganizationProfile organization={mockOrganization}/> */}
        {/* <ParticipantProfile participant={mockParticipant} /> */}
      </div>
  );
}

export default App;
