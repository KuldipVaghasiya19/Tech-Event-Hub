import React, { useState } from 'react';
import {
  X,
  Send,
  AlertCircle,
  Users,
  Upload,
  Mail,
  Building,
  Phone,
} from 'lucide-react';

export function RegistrationForm({ event, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
    agreeToTerms: false,

    // Hackathon specific fields
    teamName: '',
    teamMembers: [{ name: '', email: '', role: '' }],
    projectName: '',
    projectDescription: '',
    techStack: '',
    teamLogo: null,

    // Workshop/Conference specific fields
    expectations: '',
    specialRequirements: '',
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = 'You must agree to the terms';

    // Event specific validations
    if (event.type === 'hackathon') {
      if (!formData.teamName) newErrors.teamName = 'Team name is required';
      if (!formData.projectName)
        newErrors.projectName = 'Project name is required';
      if (formData.teamMembers.length < 2)
        newErrors.teamMembers = 'Minimum 2 team members required';
      formData.teamMembers.forEach((member, index) => {
        if (!member.email)
          newErrors[`memberEmail${index}`] = 'Member email is required';
        if (!member.name)
          newErrors[`memberName${index}`] = 'Member name is required';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, { name: '', email: '', role: '' }],
    });
  };

  const removeTeamMember = (index) => {
    const newMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      teamMembers: newMembers,
    });
  };

  const updateTeamMember = (index, field, value) => {
    const newMembers = formData.teamMembers.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setFormData({
      ...formData,
      teamMembers: newMembers,
    });
  };

  const renderHackathonFields = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Team Name *
        </label>
        <input
          type="text"
          value={formData.teamName}
          onChange={(e) =>
            setFormData({ ...formData, teamName: e.target.value })
          }
          className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.teamName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your team name"
        />
        {errors.teamName && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.teamName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Team Members *
        </label>
        <div className="space-y-4">
          {formData.teamMembers.map((member, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    updateTeamMember(index, 'name', e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  placeholder="Member name"
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) =>
                    updateTeamMember(index, 'email', e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  placeholder="Member email"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) =>
                    updateTeamMember(index, 'role', e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  placeholder="Role (e.g., Developer, Designer)"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTeamMember}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            Add Team Member
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Details
        </label>
        <div className="space-y-4">
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) =>
              setFormData({ ...formData, projectName: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            placeholder="Project name"
          />
          <textarea
            value={formData.projectDescription}
            onChange={(e) =>
              setFormData({ ...formData, projectDescription: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Project description"
          />
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) =>
              setFormData({ ...formData, techStack: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            placeholder="Tech stack (e.g., React, Node.js, MongoDB)"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Team Logo
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) =>
                    setFormData({ ...formData, teamLogo: e.target.files[0] })
                  }
                  accept="image/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConferenceFields = () => (
    <div className="space-y-6">
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What do you expect to learn?
        </label>
        <textarea
          value={formData.expectations}
          onChange={(e) =>
            setFormData({ ...formData, expectations: e.target.value })
          }
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Your expectations from this event"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Special Requirements
        </label>
        <textarea
          value={formData.specialRequirements}
          onChange={(e) =>
            setFormData({ ...formData, specialRequirements: e.target.value })
          }
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
          rows={2}
          placeholder="Any special requirements or accommodations needed"
        />
      </div>
    </div>
  );

  return (
<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 bg-transparent">
  <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between rounded-t-xl z-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Register for {event.title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>

             
          </div>

          {/* Event Specific Fields */}
          {event.type === 'hackathon'
            ? renderHackathonFields()
            : renderConferenceFields()}

          {/* Common Footer Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dietary Restrictions
              </label>
              <input
                type="text"
                value={formData.dietaryRestrictions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dietaryRestrictions: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                placeholder="Vegetarian, vegan, allergies, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                T-Shirt Size
              </label>
              <select
                value={formData.tshirtSize}
                onChange={(e) =>
                  setFormData({ ...formData, tshirtSize: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) =>
                setFormData({ ...formData, agreeToTerms: e.target.checked })
              }
              className="mt-1 text-blue-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the terms and conditions of participation, including
              the code of conduct and event policies. *
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.agreeToTerms}
            </p>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegistrationForm;