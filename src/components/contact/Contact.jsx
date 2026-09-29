import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiCopy, FiCheck,
} from 'react-icons/fi';
import {
  FaGithub, FaLinkedinIn, FaTwitter, FaInstagram,
} from 'react-icons/fa';
import './Contact.css';

const iconMap = {
  FaGithub: <FaGithub />,
  FaLinkedinIn: <FaLinkedinIn />,
  FaTwitter: <FaTwitter />,
  FaInstagram: <FaInstagram />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Contact({ data }) {
  const { tagline, headline, description, email, phone, location, socials } = data || {};

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCopyEmail = () => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // Launch user's email client directly addressed to Udara
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const body = encodeURIComponent(`Hi Udara,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact-wrapper">
      <div className="about-blob contact-blob-left"  aria-hidden="true" />
      <div className="about-blob contact-blob-right" aria-hidden="true" />

      <div className="contact-container">

        {/* Header */}
        <motion.p
          className="section-tagline"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {tagline || "Let's Talk"}
        </motion.p>

        <motion.h2
          className="contact-headline"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {(headline || 'Start a Project\nTogether').split('\n').map((l, i) => (
            <span key={i} className="contact-headline-line">{l}</span>
          ))}
        </motion.h2>

        <div className="contact-grid">

          {/* LEFT — info + socials */}
          <motion.div
            className="contact-info"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p className="contact-desc" variants={fadeUp}>
              {description}
            </motion.p>

            <motion.ul className="contact-details" variants={stagger}>
              {email && (
                <motion.li variants={fadeUp} className="contact-email-row">
                  <span className="contact-icon"><FiMail /></span>
                  <a href={`mailto:${email}`} className="email-link">{email}</a>
                  <button
                    type="button"
                    className="copy-email-btn"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? <><FiCheck className="copy-icon" /> Copied!</> : <><FiCopy className="copy-icon" /> Copy</>}
                  </button>
                </motion.li>
              )}
              {phone && (
                <motion.li variants={fadeUp}>
                  <span className="contact-icon"><FiPhone /></span>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
                </motion.li>
              )}
              {location && (
                <motion.li variants={fadeUp}>
                  <span className="contact-icon"><FiMapPin /></span>
                  <span>{location}</span>
                </motion.li>
              )}
            </motion.ul>

            {socials?.length > 0 && (
              <motion.div className="contact-socials" variants={fadeUp}>
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="contact-social-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                  >
                    {iconMap[s.icon] || s.name}
                  </a>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            className="contact-form-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {sent ? (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="success-emoji">🎉</span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-name">Your name</label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email">Email address</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="form-submit-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FiSend />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
