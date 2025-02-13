import React from 'react';
import { Users, Award, Globe, Target, CheckCircle, Rocket, Heart, Zap,Calendar,Building,MapPin } from 'lucide-react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';


function AboutUs() {
  const stats = [
    { label: 'Events Hosted', value: '500+', icon: Calendar },
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Organizations', value: '200+', icon: Building },
    { label: 'Cities', value: '50+', icon: MapPin },
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      bio: 'Former tech lead at Google with a passion for building communities.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    {
      name: 'Rahul Verma',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      bio: 'Ex-Microsoft engineer with expertise in scalable platforms.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    {
      name: 'Neha Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      bio: 'Seasoned operations expert with focus on user experience.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
     
      <Navbar/>
    
      <div className="relative bg-indigo-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
            alt="Team"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Empowering the Tech Community
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to create the most vibrant tech community by connecting
              passionate individuals with transformative events and learning opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Stats with Animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transform hover:scale-105 transition-transform">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To democratize access to quality tech education and networking
              opportunities by creating a comprehensive platform that connects
              event organizers with passionate participants.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become the world's leading platform for tech events, fostering
              innovation and collaboration across borders while building a
              vibrant global tech community.
            </p>
          </div>
        </div>
      </div>

      

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The core principles that guide everything we do
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-1 transition-transform">
            <div className="inline-block p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl text-white mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Community First</h3>
            <p className="text-gray-600">
              Building and nurturing a supportive tech community that grows together.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-1 transition-transform">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Excellence</h3>
            <p className="text-gray-600">
              Striving for the highest quality in every event and interaction.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-1 transition-transform">
            <div className="inline-block p-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl text-white mb-6">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Innovation</h3>
            <p className="text-gray-600">
              Embracing new ideas and technologies to better serve our community.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-1 transition-transform">
            <div className="inline-block p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl text-white mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Impact</h3>
            <p className="text-gray-600">
              Creating meaningful change through technology and education.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUs;