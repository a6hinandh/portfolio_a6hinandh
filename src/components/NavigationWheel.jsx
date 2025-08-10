import React from 'react';
import { FaUser, FaFileAlt, FaProjectDiagram, FaTools, FaInfoCircle, FaGraduationCap, FaPhone, FaCertificate, FaBook } from 'react-icons/fa';
import ContactLinks from './ContactLinks';
import './NavigationWheel.css';

function CircularNavigation({ setActiveSection }) {
  const sections = [
    { id: 'resume', icon: <FaFileAlt />, label: 'Resume' },
    { id: 'projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { id: 'tech', icon: <FaTools />, label: 'Tech Stack' },
    { id: 'about', icon: <FaInfoCircle />, label: 'About Me' },
    { id: 'education', icon: <FaGraduationCap />, label: 'Education' },
    { id: 'contact', icon: <FaPhone />, label: 'Contact' },
    { id: 'certifications', icon: <FaCertificate />, label: 'Certifications' },
    { id: 'learning', icon: <FaBook />, label: 'Academics' }, // Using FaUser as placeholder
  ];

  return (
    <div className="circular-nav-container">
      {/* Contact Links positioned above the wheel */}
      <ContactLinks />
      
      {/* Center circle */}
      <div 
        className="center-circle"
        onClick={() => setActiveSection('intro')}
      >
        <img src='./profile.jpeg' />
      </div>
      
      {/* 8 segments */}
      <div className="first segment" >
        <div className="segment-content" onClick={() => setActiveSection(sections[0].id)}>
          {sections[0].icon}
          <span className="segment-label">{sections[0].label}</span>
        </div>
      </div>
      <div className="second segment" >
        <div className="segment-content" onClick={() => setActiveSection(sections[1].id)}>
          {sections[1].icon}
          <span className="segment-label">{sections[1].label}</span>
        </div>
      </div>
      <div className="third segment" >
        <div className="segment-content" onClick={() => setActiveSection(sections[2].id)}>
          {sections[2].icon}
          <span className="segment-label">{sections[2].label}</span>
        </div>
      </div>
      <div className="fourth segment">
        <div className="segment-content"  onClick={() => setActiveSection(sections[3].id)}>
          {sections[3].icon}
          <span className="segment-label">{sections[3].label}</span>
        </div>
      </div>
      <div className="fifth segment" >
        <div className="segment-content"onClick={() => setActiveSection(sections[4].id)}>
          {sections[4].icon}
          <span className="segment-label">{sections[4].label}</span>
        </div>
      </div>
      <div className="sixth segment">
        <div className="segment-content"  onClick={() => setActiveSection(sections[5].id)}>
          {sections[5].icon}
          <span className="segment-label">{sections[5].label}</span>
        </div>
      </div>
      <div className="seventh segment" >
        <div className="segment-content" onClick={() => setActiveSection(sections[6].id)}>
          {sections[6].icon}
          <span className="segment-label">{sections[6].label}</span>
        </div>
      </div>
      <div className="eighth segment" >
        <div className="segment-content" onClick={() => setActiveSection(sections[7].id)}>
          {sections[7].icon}
          <span className="segment-label">{sections[7].label}</span>
        </div>
      </div>
      
      <p className="navigation-hint">Click a section on the wheel to explore my portfolio.</p>
    </div>
  );
}

export default CircularNavigation;