import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord, FaEnvelope } from 'react-icons/fa';

const iconMap = {
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
  FaTwitter: <FaTwitter />,
  FaDiscord: <FaDiscord />,
  FaEnvelope: <FaEnvelope />
};

export default function SocialLinks({ links = [] }) {
  return (
    <div className="social-links-container">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="social-icon-link"
        >
          {iconMap[link.icon] || link.name}
        </a>
      ))}
    </div>
  );
}
