import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './ContactLinks.css';

function ContactLinks() {
  const contactLinks = [
    {
      id: 'linkedin',
      icon: <FaLinkedin />,
      href: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com',
      label: 'LinkedIn',
      color: '#0077b5'
    },
    {
      id: 'github',
      icon: <FaGithub />,
      href: import.meta.env.VITE_GITHUB_URL || 'https://github.com',
      label: 'GitHub',
      color: '#333'
    },
    {
      id: 'instagram',
      icon: <FaInstagram />,
      href: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com',
      label: 'Instagram',
      color: '#e4405f'
    }
  ];

  const handleLinkClick = (e, href) => {
    // Add ripple effect
    const link = e.currentTarget;
    link.style.transform = 'translateY(-5px) scale(0.95)';
    
    setTimeout(() => {
      link.style.transform = '';
    }, 150);

    // Ensure valid URL
    if (href === '#' || !href) {
      e.preventDefault();
      console.log('Link not configured');
    }
  };

  return (
    <div className="contact-links-container">
      <div className="contact-links-grid">
        {contactLinks.map((link, index) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            style={{ 
              '--hover-color': link.color,
              animationDelay: `${0.1 * (index + 1)}s`
            }}
            title={link.label}
            onClick={(e) => handleLinkClick(e, link.href)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLinkClick(e, link.href);
              }
            }}
            role="button"
            tabIndex="0"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ContactLinks;