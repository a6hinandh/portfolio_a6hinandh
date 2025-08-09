import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './ContactLinks.css';

function ContactLinks() {
  const contactLinks = [
    {
      id: 'linkedin',
      icon: <FaLinkedin />,
      href: import.meta.env.VITE_LINKEDIN_URL || '#',
      label: 'LinkedIn',
      color: '#0077b5'
    },
    {
      id: 'github',
      icon: <FaGithub />,
      href: import.meta.env.VITE_GITHUB_URL || '#',
      label: 'GitHub',
      color: '#333'
    },
    {
      id: 'instagram',
      icon: <FaInstagram />,
      href: import.meta.env.VITE_INSTAGRAM_URL || '#',
      label: 'Instagram',
      color: '#e4405f'
    }
  ];

  return (
    <div className="contact-links-container">
      <div className="contact-links-grid">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            style={{ '--hover-color': link.color }}
            title={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ContactLinks;
