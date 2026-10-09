import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCopy,
  FiCheck,
  FiDownload,
  FiClock,
  FiAlertCircle,
} from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './Contact.css';

const iconMap = {
  FaGithub: <FaGithub />,
  FaLinkedinIn: <FaLinkedinIn />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// ── EmailJS Configuration ────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ and sign up (free — 200 emails/month)
// 2. Add an Email Service (Gmail) → copy the Service ID below
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}},
//    {{subject}}, {{message}}, {{to_email}} → copy the Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID  = 'service_abc123';        // Gmail service
const EMAILJS_TEMPLATE_ID = 'template_z7jkef3';     // Contact template
const EMAILJS_PUBLIC_KEY  = 'E5hvCUVT8yxL4b_V5';   // Public key
const RECIPIENT_EMAIL     = 'udara7355@gmail.com';

export default function Contact({ data }) {
  const { headline, description, email, phone, location, availability, socials } = data || {};

  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Full-Stack Developer Intern Opportunity',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCopyEmail = () => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('sending');

    // EmailJS template variables — match these in your EmailJS template
    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      subject:    `[Portfolio] ${form.role} — from ${form.name}`,
      message:    form.message,
      role:       form.role,
      to_email:   RECIPIENT_EMAIL,
      reply_to:   form.email,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', role: 'Full-Stack Developer Intern Opportunity', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      // Fallback: open mailto if EmailJS not yet configured
      if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        const subject = encodeURIComponent(`[Portfolio Inquiry] ${form.role} from ${form.name}`);
        const body = encodeURIComponent(
          `Hi Udara,\n\n${form.message}\n\nPosition / Topic: ${form.role}\nFrom: ${form.name}\nEmail: ${form.email}`
        );
        window.open(`mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`);
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  };

  const isConfigured = EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

  return (
    <section id="contact" className="scene-contact-wrapper">
      {/* Ambient background glow */}
      <div className="scene-ambient-glow contact-glow-left"  aria-hidden="true" />
      <div className="scene-ambient-glow contact-glow-right" aria-hidden="true" />

      <div className="scene-contact-container">
        {/* Chapter Header */}
        <div className="scene-header-block">
          <motion.div
            className="scene-badge-wrapper"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            <span className="scene-dot" />
            <span className="scene-marker">SCENE 05 // THE NEXT CHAPTER</span>
          </motion.div>

          <motion.h2
            className="section-cinematic-title"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            {(headline || 'Seeking a Full-Stack\nDeveloper or UI/UX Designer?').split('\n').map((l, i) => (
              <span key={i} className="cinematic-title-line">
                {i === 1 ? <span className="text-gold-gradient">{l}</span> : l}
              </span>
            ))}
          </motion.h2>

          <motion.p
            className="section-cinematic-subhead"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            {description ||
              'I am eagerly looking for an opportunity to join an engineering team, bring my MERN, Next.js, Spring Boot & Gemini AI skills, and build high-impact software.'}
          </motion.p>
        </div>

        <div className="scene-contact-grid">
          {/* LEFT: Info, Coordinates, Socials */}
          <motion.div
            className="contact-meta-col"
            variants={stagger} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            {/* Availability Callout Card */}
            <motion.div className="contact-status-card" variants={fadeUp}>
              <div className="status-live-header">
                <span className="live-status-dot" />
                <span className="status-title-text">CURRENT AVAILABILITY STATUS</span>
              </div>
              <p className="status-desc-text">
                {availability ||
                  'Available for Full-Time / Part-Time Internship Opportunities'}
              </p>
              <div className="status-location-badge">
                <FiClock className="status-icon" />
                <span>Ready for Immediate Onboarding</span>
              </div>
            </motion.div>

            {/* Direct Contact Details */}
            <motion.div className="contact-details-box" variants={fadeUp}>
              <h3 className="details-box-title">DIRECT COMMUNICATION CHANNELS</h3>

              <ul className="details-list">
                {email && (
                  <li className="detail-item">
                    <div className="detail-icon-box"><FiMail /></div>
                    <div className="detail-text-stack">
                      <span className="detail-label">OFFICIAL EMAIL</span>
                      <a href={`mailto:${email}`} className="detail-main-link">{email}</a>
                    </div>
                    <button
                      type="button"
                      className="detail-copy-btn"
                      onClick={handleCopyEmail}
                      title="Copy email address"
                      aria-label="Copy email"
                    >
                      {copied
                        ? <><FiCheck color="#34d399" /> <span>Copied!</span></>
                        : <><FiCopy /> <span>Copy</span></>}
                    </button>
                  </li>
                )}

                {phone && (
                  <li className="detail-item">
                    <div className="detail-icon-box"><FiPhone /></div>
                    <div className="detail-text-stack">
                      <span className="detail-label">DIRECT PHONE / WHATSAPP</span>
                      <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="detail-main-link">
                        {phone}
                      </a>
                    </div>
                  </li>
                )}

                {location && (
                  <li className="detail-item">
                    <div className="detail-icon-box"><FiMapPin /></div>
                    <div className="detail-text-stack">
                      <span className="detail-label">LOCATION</span>
                      <span className="detail-static-val">{location}</span>
                    </div>
                  </li>
                )}
              </ul>

              {/* Social Profiles */}
              {socials?.length > 0 && (
                <div className="contact-social-section">
                  <span className="social-sec-title">PROFESSIONAL NETWORKS</span>
                  <div className="contact-social-pills">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        className="social-direct-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                      >
                        <span className="s-icon">{iconMap[s.icon] || s.name}</span>
                        <span className="s-name">{s.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Download CV */}
              <div className="contact-cv-download-row">
                <a
                  href="/Udara_Lakshan_CV.pdf"
                  download="Udara_Lakshan_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-cv-btn"
                >
                  <FiDownload />
                  <span>Download Complete Resume (PDF)</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Message Form */}
          <motion.div
            className="contact-form-col"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            <div className="cinema-form-card">
              <div className="form-card-header">
                <div className="form-rec-marker">
                  <span className="rec-mini-dot" />
                  <span>DISPATCH TRANSMISSION</span>
                </div>
                <span className="form-enc-tag">DIRECT INBOX</span>
              </div>

              {/* ── SUCCESS STATE ── */}
              {status === 'success' ? (
                <motion.div
                  className="form-success-box"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="success-icon-badge">
                    <FiCheck />
                  </div>
                  <h3 className="success-title">Message Transmitted! 🚀</h3>
                  <p className="success-desc">
                    Your message has been sent directly to{' '}
                    <strong>udara7355@gmail.com</strong>. I'll respond as soon as possible!
                  </p>
                  <button
                    type="button"
                    className="success-reset-btn"
                    onClick={() => setStatus('idle')}
                  >
                    Send Another Message
                  </button>
                </motion.div>

              ) : (
                /* ── FORM ── */
                <form
                  ref={formRef}
                  className="cinema-contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="form-error-banner">
                      <FiAlertCircle />
                      <span>
                        Transmission failed. Please email directly at{' '}
                        <a href={`mailto:${RECIPIENT_EMAIL}`}>{RECIPIENT_EMAIL}</a>
                      </span>
                    </div>
                  )}

                  <div className="form-row-2col">
                    <div className="cinema-input-group">
                      <label htmlFor="cf-name" className="cinema-label">YOUR FULL NAME</label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={form.name}
                        onChange={handleChange}
                        className="cinema-input"
                        required
                        disabled={status === 'sending'}
                      />
                    </div>

                    <div className="cinema-input-group">
                      <label htmlFor="cf-email" className="cinema-label">YOUR EMAIL ADDRESS</label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        placeholder="e.g. alex@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className="cinema-input"
                        required
                        disabled={status === 'sending'}
                      />
                    </div>
                  </div>

                  <div className="cinema-input-group">
                    <label htmlFor="cf-role" className="cinema-label">OPPORTUNITY / PURPOSE</label>
                    <select
                      id="cf-role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="cinema-select"
                      disabled={status === 'sending'}
                    >
                      <option value="Full-Stack Developer Intern Opportunity">Full-Stack Developer Intern Opportunity</option>
                      <option value="UI/UX Designer Intern Opportunity">UI/UX Designer Intern Opportunity</option>
                      <option value="Software Engineer Role">Software Engineer Role</option>
                      <option value="Gemini AI / Full-Stack Project Collaboration">Gemini AI / Full-Stack Project Collaboration</option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="General Technical Inquiry">General Technical Inquiry</option>
                    </select>
                  </div>

                  <div className="cinema-input-group">
                    <label htmlFor="cf-message" className="cinema-label">MESSAGE</label>
                    <textarea
                      id="cf-message"
                      name="message"
                      rows={5}
                      placeholder="Describe the opportunity, project scope, or inquiry in detail…"
                      value={form.message}
                      onChange={handleChange}
                      className="cinema-textarea"
                      required
                      disabled={status === 'sending'}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`cinema-submit-btn ${status === 'sending' ? 'sending' : ''}`}
                    disabled={status === 'sending'}
                    id="contact-submit-btn"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="btn-spinner" />
                        <span>TRANSMITTING…</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="send-icon" />
                        <span>TRANSMIT MESSAGE</span>
                      </>
                    )}
                  </button>

                  <p className="form-privacy-note">
                    📩 Sends directly to <strong>udara7355@gmail.com</strong> · No data stored
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
