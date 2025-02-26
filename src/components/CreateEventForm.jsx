import React, { useState } from 'react';
import { X, Upload, Calendar, MapPin, Users, DollarSign, Tag, PlusCircle, Trash2 } from 'lucide-react';

export function CreateEventForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'conference',
    description: '',
    date: '',
    maxParticipants: '',
    location: '',
    tags: [],
    image: '',
    price: '',
    maxTeamMembers: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ''] });
  };

  const updateTag = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between rounded-t-xl z-20">
          <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="conference">Conference</option>
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event description"
              rows={4}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                required
                min={minDate}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Max Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter max participants"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event location"
              />
            </div>
          </div>

          {/* Tags (Multiple) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Tag className="text-gray-400" />
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag"
                />
                <button onClick={() => removeTag(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 />
                </button>
              </div>
            ))}
            <button type="button" onClick={addTag} className="flex items-center text-blue-600 hover:text-blue-800">
              <PlusCircle className="mr-2" /> Add Tag
            </button>
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo *</label>
            <input type="file" accept="image/*" required onChange={handleImageUpload} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Price (Only for Hackathon) */}
            {formData.type === 'hackathon' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input 
                  type="number" 
                  required 
                  value={formData.price} 
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter event price" 
                />

                <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">Max Team Members *</label>
                <input 
                  type="number" 
                  required 
                  value={formData.maxTeamMembers} 
                  onChange={(e) => setFormData({ ...formData, maxTeamMembers: e.target.value })} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter max team members" 
                />
              </div>
              )}


          {/* Submit */}
          <button type="submit" className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
