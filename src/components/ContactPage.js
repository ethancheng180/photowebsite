"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

const CONTACT_INFO = [
  {
    label: "General",
    value: (
      <a href="mailto:contact@ethanchengphotography.com" className="contact-link">
        contact@ethanchengphotography.com
      </a>
    ),
  },
  {
    label: "Instagram",
    value: (
      <a
        href="https://instagram.com/Ethan__cheng__"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
      >
        @Ethan__cheng__
      </a>
    ),
  },
  { label: "Based In", value: "Los Angeles, California" },
  { label: "Working In", value: "New York · Paris · Milan · Los Angeles" },
  {
    label: "Representation",
    value: (
      <span className="contact-muted">
        Currently seeking agency representation.
        <br />
        Open to conversations with talent agencies
        <br />
        and artist management groups.
      </span>
    ),
  },
];

const INQUIRY_TYPES = [
  "Select category",
  "Editorial Commission",
  "Campaign / Lookbook",
  "Beauty Story",
  "Brand Collaboration",
  "Model Test",
  "Press / Media",
  "Representation",
  "Other",
];

export default function ContactPage({ setPage }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="contact-hero">
        <div className="contact-hero__inner">
          <FadeIn>
            <h1 className="contact-hero__title">Inquiries</h1>
          </FadeIn>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-grid">
          {/* Left: info */}
          <div>
            <FadeIn>
              {CONTACT_INFO.map(({ label, value }) => (
                <div key={label} className="contact-item">
                  <div className="contact-item__label">{label}</div>
                  <div className="contact-item__value">{value}</div>
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right: form */}
          <div>
            <FadeIn>
              {!submitted ? (
                <div className="contact-form">
                  {[
                    { label: "Name", type: "text", placeholder: "Full name" },
                    {
                      label: "Email",
                      type: "email",
                      placeholder: "Email address",
                    },
                  ].map((f) => (
                    <div key={f.label} className="contact-form__field">
                      <label className="contact-form__label">{f.label}</label>
                      <input
                        className="form-input"
                        type={f.type}
                        placeholder={f.placeholder}
                      />
                    </div>
                  ))}
                  <div className="contact-form__field">
                    <label className="contact-form__label">Inquiry Type</label>
                    <select className="form-select">
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label">Message</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell me about your project, timeline, and vision."
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="contact-form__submit"
                  >
                    Send Inquiry
                  </button>
                </div>
              ) : (
                <div className="contact-thanks">
                  <div className="section-label">Thank You</div>
                  <p className="contact-thanks__text">
                    Your inquiry has been received. I&rsquo;ll respond within 48
                    hours.
                  </p>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
