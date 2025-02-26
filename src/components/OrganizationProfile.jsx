import React, { useState } from 'react';
import { CheckCircle, XCircle, Building, Mail, MapPin, Plus } from 'lucide-react';
import { CreateEventForm } from './CreateEventForm';
import Navbar from './Navbar';
import Footer from './Footer';


export default function OrganizationProfile({ organization, onLogout, onEventsClick, showEvents }) {
  const [activeTab, setActiveTab] = useState('current');
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  const currentDate = new Date();
  
  const pastEvents = organization.events.filter(event => new Date(event.date) < currentDate);
  const currentEvents = organization.events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= currentDate && eventDate <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  });
  const futureEvents = organization.events.filter(event => 
    new Date(event.date) > new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  const handleCreateEvent = (eventData) => {
    console.log('New event:', eventData);
    setShowCreateEventForm(false);
  };

  const EventTable = ({ events }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Participants
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">{event.type}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{event.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {event.currentParticipants} / {event.maxParticipants}
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round((event.currentParticipants / event.maxParticipants) * 100)}% Full
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(event.date) < currentDate ? (
                  <span className="flex items-center text-gray-500">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    Completed
                  </span>
                ) : event.currentParticipants >= event.maxParticipants ? (
                  <span className="flex items-center text-red-500">
                    <XCircle className="w-5 h-5 mr-1" />
                    Full
                  </span>
                ) : (
                  <span className="flex items-center text-green-500">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    Open
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w mx-auto">
      <Navbar/>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 py-18">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 "></div>
        <div className="px-8 py-6 -mt-16">
          <div className="flex items-end gap-6">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <img
                src={organization.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100&h=100'}
                alt={organization.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
            </div>
            <div className="pb-2 flex-grow">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {organization.name}
                </h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCreateEventForm(true)}
                    className="flex gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors "
                  >
                    <Plus className="w-4 h-4" />
                    Create Event
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{organization.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{organization.email || 'contact@techhub.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{organization.location || 'San Francisco, CA'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Events</h3>
              <p className="text-3xl font-bold text-blue-600">{organization.events.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Events</h3>
              <p className="text-3xl font-bold text-green-600">{currentEvents.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Participants</h3>
              <p className="text-3xl font-bold text-indigo-600">
                {organization.events.reduce((total, event) => total + event.currentParticipants, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Events</h3>
              <p className="text-3xl font-bold text-purple-600">{futureEvents.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b">
              <div className="flex">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'current'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('current')}
                >
                  Current Events
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'upcoming'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming Events
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'past'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('past')}
                >
                  Past Events
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'current' && <EventTable events={currentEvents} />}
              {activeTab === 'upcoming' && <EventTable events={futureEvents} />}
              {activeTab === 'past' && <EventTable events={pastEvents} />}
            </div>
          </div>
        </>
      

      {showCreateEventForm && (
        <CreateEventForm
          onClose={() => setShowCreateEventForm(false)}
          onSubmit={handleCreateEvent}
        />
      )}
      <div className="mt-8">
      <Footer />
      </div>
    </div>
  );
}