import React, { useState } from 'react';
import {GraduationCap, Mail,Building, Phone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ParticipantProfile({ participant }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const EventTable = ({ events, emptyMessage, type }) => (
    <div className="overflow-x-auto">
      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{emptyMessage}</p>
      ) : (
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
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events
              .filter(event => {
                if (type === 'upcoming') {
                  return new Date(event.date) > new Date();
                }
                if (type === 'past') {
                  return new Date(event.date) < new Date();
                }
                return true; // For registered, no date filtering
              })
              .map(event => (
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
                        <div className="text-sm text-gray-500">{event.organizer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.type === 'hackathon'
                          ? 'bg-purple-100 text-purple-800'
                          : event.type === 'conference'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        new Date(event.date) < new Date()
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {new Date(event.date) < new Date() ? 'Completed' : 'Upcoming'}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="max-w">
      <Navbar/>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-32"></div>
        <div className="px-8 py-6 -mt-16">
          <div className="flex items-end gap-6">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <img
                src={participant.avatar || '/src/pictures/Kuldip_photo.jpeg'}
                alt={participant.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
            </div>
            <div className="pb-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{participant.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{participant.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{participant.university}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{participant.course}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{participant.phone || '+91 98765 43210'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-purple-600">{participant.registeredEvents.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-blue-600">{participant.upcomingEvents.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Past Events</h3>
          <p className="text-3xl font-bold text-green-600">{participant.pastEvents.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'registered'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('registered')}
            >
              Registered Events
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'past'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'upcoming' && (
            <EventTable
              events={participant.upcomingEvents}
              emptyMessage="No upcoming events"
              type="upcoming"
            />
          )}
          {activeTab === 'registered' && (
            <EventTable
              events={participant.registeredEvents}
              emptyMessage="No registered events"
              type="registered"
            />
          )}
          {activeTab === 'past' && (
            <EventTable
              events={participant.pastEvents}
              emptyMessage="No past events"
              type="past"
            />
          )}
        </div>
      </div>
      <div className="mt-8">
       <Footer  />
      </div>
    </div>
  );
}
