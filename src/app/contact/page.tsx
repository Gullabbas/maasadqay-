"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-surface-warm min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Customer Care
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-primary tracking-tight">
            We Are Here For You
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary">
            Have questions regarding sizes, bulk orders, or live tracking? Reach out directly to our team in Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-pure rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-6">
              <h3 className="font-display font-bold text-xl text-ink-primary">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-ink-primary hover:bg-emerald-100/70 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-900 text-sm">WhatsApp & Helpline</div>
                    <div className="font-mono text-emerald-700 font-bold mt-0.5">
                      0315-4245424
                    </div>
                    <div className="text-[11px] text-emerald-800/80 mt-1">
                      Instant response Mon–Sat, 10am to 10pm PKT.
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-warm border border-brand-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-ink-primary text-sm">Official Email</div>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-brand-600 hover:underline font-medium"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                    <div className="text-[11px] text-ink-tertiary mt-1">
                      For corporate inquiries, collaborations & bulk orders.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-warm border border-brand-100">
                  <div className="w-10 h-10 rounded-xl bg-ochre-500 text-white flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-ink-primary text-sm">Studio Location</div>
                    <p className="text-ink-secondary leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7 bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink-primary">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary max-w-sm mx-auto">
                  Thank you for writing to us. Our customer support officer will reply via WhatsApp or phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-brand-500 text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-bold text-xl text-ink-primary mb-2">
                  Send Us a Direct Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Ali"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-surface-warm border border-brand-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX-XXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-surface-warm border border-brand-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface-warm border border-brand-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Your Message / Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we assist you with sizing, orders, or delivery?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-surface-warm border border-brand-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Support</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
