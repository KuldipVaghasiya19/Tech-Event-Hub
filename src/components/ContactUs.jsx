import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Clock, Users } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white ">
      <Navbar/>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Global Presence</h3>
                <p className="text-gray-600">50+ Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Happy Users</h3>
                <p className="text-gray-600">50K+ and growing</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">contact@techeventshub.com</p>
              </div>
            </div>
            <p className="text-gray-600 ml-12">
              Available 24/7 for your queries
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Phone className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <p className="text-gray-600 ml-12">
              Mon-Fri from 9am to 6pm IST
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <MapPin className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Office</h3>
                <p className="text-gray-600">Bangalore, India</p>
              </div>
            </div>
            <p className="text-gray-600 ml-12">
              123 Innovation Street, BTM Layout
            </p>
          </div>
        </div>

        {/* Map */}
        {/* <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085422617673!3d12.954517008640542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1656500023129!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div> */}

        {/* FAQ Section */}
        <div className="mt-12 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                How can I organize an event?
              </h3>
              <p className="text-gray-600">
                Sign up as an organization and use our platform to create and manage your events.
                We provide all the tools you need to make your event successful.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What types of events can I host?
              </h3>
              <p className="text-gray-600">
                You can host various tech events including conferences, hackathons,
                workshops, webinars, and meetups.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Is there a fee for hosting events?
              </h3>
              <p className="text-gray-600">
                Basic event hosting is free. Premium features are available for a small fee.
                Contact us for custom enterprise solutions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                How do I get featured on the platform?
              </h3>
              <p className="text-gray-600">
                Events with unique content, strong track record, and high engagement
                are considered for featuring. Contact us to learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ContactUs;