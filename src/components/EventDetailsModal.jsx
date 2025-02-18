import React from 'react';
import {
  X,
  Calendar,
  MapPin,
  Users,
  Tag,
  Trophy,
  Clock,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/events';

export function EventDetailsModal({ onRegister }) {
  const { title } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.title === title);

  if (!event) {
    return <div>Event not found</div>;
  }

  const isAlmostFull = event.currentParticipants >= event.maxParticipants * 0.8;
  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const isEarlyBird = new Date(event.earlyBirdDeadline) > new Date();

  const handleClose = () => {
    navigate('/events');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto py-10">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full pt-10">
        <button
          onClick={handleClose}
          className="absolute top-1/4 right-4 transform -translate-y-1/2 bg-white/90 p-2 rounded-full text-gray-600 hover:text-gray-900 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative h-96">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  event.type === 'hackathon'
                    ? 'bg-purple-500 text-white'
                    : event.type === 'conference'
                    ? 'bg-blue-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {event.type}
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {event.title}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                About This Event
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {event.description}
              </p>

              {event.prizes && (
                <div className="mb-6 bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center text-gray-900 mb-4">
                    <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                    <h4 className="text-xl font-bold">Prizes</h4>
                  </div>
                  <ul className="space-y-2">
                    {event.prizes.map((prize, index) => (
                      <li
                        key={index}
                        className="text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-yellow-500">•</span>
                        {prize}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 px-4 py-2 rounded-full"
                    >
                      <Tag className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">{tag}</span>
                    </div>
                  ))}
                </div>

                {event.prices && (
                  <div className="mt-4">
                    <h4 className="text-xl font-bold text-gray-900">Prices</h4>
                    <ul className="space-y-2">
                      {event.prices.map((price, index) => (
                        <li
                          key={index}
                          className="text-gray-600 flex items-center gap-2"
                        >
                          {price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl h-fit">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Date</p>
                      <p>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Availability</p>
                      <p
                        className={isAlmostFull ? 'text-red-600 font-medium' : ''}
                      >
                        {spotsLeft} spots remaining
                      </p>
                    </div>
                  </div>
                </div>

                {isEarlyBird && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center text-green-700">
                      <Clock className="w-5 h-5 mr-2" />
                      <p className="font-medium">
                        Early bird pricing available!
                      </p>
                    </div>
                    <p className="text-green-600 text-sm mt-1">
                      Register before{' '}
                      {new Date(event.earlyBirdDeadline).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={() => onRegister(event.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                      isAlmostFull
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {isAlmostFull
                      ? 'Register Now - Almost Full!'
                      : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
