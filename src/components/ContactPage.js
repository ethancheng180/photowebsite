"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

const DEFAULTS = {
  pageTitle: "Inquiries",
  contactItems: [
    { label: "General", value: "contact@ethanchengphotography.com", type: "email", url: "contact@ethanchengphotography.com" },
    { label: "Instagram", value: "@Ethan__cheng__", type: "link", url: "https://instagram.com/Ethan__cheng__" },
    { label: "Based In", value: "Los Angeles, California", type: "text" },
    { label: "Working In", value: "New York · Paris · Milan · Los Angeles", type: "text" },
    { label: "Representation", value: "Currently seeking agency representation. Open to conversations with talent agencies and artist management groups.", type: "text" },
  ],
  inquiryTypes: [
    "Editorial Commission",
    "Campaign / Lookbook",
    "Beauty Story",
    "Brand Collaboration",
    "Model Test",
    "Press / Media",
    "Representation",
    "Other",
  ],
  formPlaceholder: "Tell me about your project, timeline, and vision.",
  submitText: "Send Inquiry",
  confirmationTitle: "Thank You",
  confirmationText: "Your inquiry has been received. I'll respond within 48 hours.",
};

function d(contactData, key) {
  return contactData?.[key] ?? DEFAULTS[key];
}

function ContactValue({ item }) {
  if (item.type === "email") {
    return (
      <a href={`mailto:${item.url || item.value}`} className="contact-link">
        {item.value}
      </a>
    );
  }
  if (item.type === "link") {
    return (
      <a
        href={item.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
      >
        {item.value}
      </a>
    );
  }
  return <span>{item.value}</span>;
}

export default function ContactPage({ contactData }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });

  const pageTitle = d(contactData, "pageTitle");
  const contactItems = d(contactData, "contactItems");
  const inquiryTypes = d(contactData, "inquiryTypes");
  const formPlaceholder = d(contactData, "formPlaceholder");
  const submitText = d(contactData, "submitText");
  const confirmationTitle = d(contactData, "confirmationTitle");
  const confirmationText = d(contactData, "confirmationText");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="page-transition">
      <div className="contact-hero">
        <div className="contact-hero__inner">
          <FadeIn>
            <h1 className="contact-hero__title">{pageTitle}</h1>
          </FadeIn>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-grid">
          <div>
            <FadeIn>
              {(contactItems || []).map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-item__label">{item.label}</div>
                  <div className="contact-item__value">
                    <ContactValue item={item} />
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>

          <div>
            <FadeIn>
              {status === "success" ? (
                <div className="contact-thanks">
                  <div className="section-label">{confirmationTitle}</div>
                  <p className="contact-thanks__text">{confirmationText}</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="cf-name">
                      Name
                    </label>
                    <input
                      id="cf-name"
                      className="form-input"
                      type="text"
                      name="name"
                      placeholder="Full name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="cf-email">
                      Email
                    </label>
                    <input
                      id="cf-email"
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="Email address"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="cf-type">
                      Inquiry Type
                    </label>
                    <select
                      id="cf-type"
                      className="form-select"
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="">Select category</option>
                      {(inquiryTypes || []).map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="cf-message">
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      className="form-textarea"
                      name="message"
                      placeholder={formPlaceholder}
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                  {error && <p className="contact-form__error">{error}</p>}
                  <button
                    type="submit"
                    className="contact-form__submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : submitText}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
