import React from 'react';
import { Calendar, MapPin, Users, Tag, Trophy, Clock, ExternalLink, Sparkles } from 'lucide-react';

export function EventCard({ event, onRegister, onClick, featured }) {
  const isAlmostFull = event.currentParticipants >= event.maxParticipants * 0.8;
  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const isEarlyBird = new Date(event.earlyBirdDeadline) > new Date();
  const daysUntilEvent = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div 
      className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer
        ${featured ? 'ring-2 ring-yellow-500 transform hover:-translate-y-1' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Featured</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            event.type === 'hackathon' ? 'bg-purple-500 text-white' :
            event.type === 'conference' ? 'bg-blue-500 text-white' :
            'bg-green-500 text-white'
          }`}>
            {event.type}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span className={isAlmostFull ? 'text-red-600 font-medium' : ''}>
              {spotsLeft} spots remaining
            </span>
          </div>
          {event.earlyBirdDeadline && isEarlyBird && (
            <div className="flex items-center text-green-600 font-medium">
              <Clock className="w-4 h-4 mr-2" />
              <span>Early bird pricing available!</span>
            </div>
          )}
        </div>

        {event.prizes && (
          <div className="mb-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-900 mb-2">
              <Trophy className="w-4 h-4 mr-2" />
              <span className="font-medium">Prizes</span>
            </div>
            <ul className="space-y-1">
              {event.prizes.map((prize, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="mr-2">•</span>
                  {prize}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag, index) => (
            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Tag className="w-3 h-3 mr-1 text-gray-500" />
              <span className="text-sm text-gray-600">{tag}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister(event.id);
            }}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
              isAlmostFull
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isAlmostFull ? 'Register Now - Almost Full!' : 'Register Now'}
          </button>
          
          {event.website && (
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors border border-gray-300"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Event Website
            </a>
          )}
        </div>

        {daysUntilEvent <= 30 && (
          <div className="mt-4 text-center">
            <span className="text-sm text-red-600 font-medium">
              Only {daysUntilEvent} days left to register!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
