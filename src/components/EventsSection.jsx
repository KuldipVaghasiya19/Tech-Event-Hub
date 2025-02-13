import React, { useState } from 'react';
import { events } from '../data/events';
import { Search } from 'lucide-react';
import { EventCard } from './EventCard';
import { RegistrationForm } from './RegistrationForm';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { EventDetailsModal } from './EventDetailsModal';

const EventsSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
    const [selectedType, setSelectedType] = useState('all');
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const navigate = useNavigate();

    const handleEventClick = (eventId) => {
      const event1 = events.find((e) => e.id === eventId);
        navigate(`/events/${event1.title}`);
    };

    const filteredEvents = events
        .filter((event) => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === 'all' || event.type === selectedType;
            const matchesFeatured = showFeaturedOnly ? event.featured : true;
            return matchesSearch && matchesType && matchesFeatured;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            const spotsA = a.maxParticipants - a.currentParticipants;
            const spotsB = b.maxParticipants - b.currentParticipants;
            return spotsA - spotsB;
        });

    return (
        <div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="flex items-center justify-between mb-12 pt-20">
                    <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="hackathon">Hackathons</option>
                                <option value="conference">Conferences</option>
                                <option value="workshop">Workshops</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="spots">Sort by Available Spots</option>
                            </select>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={showFeaturedOnly}
                                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-gray-700">Featured Only</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onClick={() => handleEventClick(event.id)}
                            featured={event.featured}
                        />
                    ))}
                </div>
            </main>

            {showRegistrationForm && selectedEvent && (
                <RegistrationForm
                    event={selectedEvent}
                    onClose={() => {
                        setShowRegistrationForm(false);
                        setSelectedEvent(null);
                    }}
                />
            )}

            <Footer />
        </div>
    );
};

export default EventsSection;
