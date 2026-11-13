import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Maa Sadqay",
  description: "Privacy commitments, data security and customer information handling at Maa Sadqay.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-surface-warm min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Data Security
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Protecting the privacy and trust of our families and mothers.
          </p>
        </div>

        <div className="bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-6 text-xs sm:text-sm text-ink-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              1. Information We Collect
            </h2>
            <p>
              When you place an order or interact with our AI Order Assistant, we collect only the necessary details required to deliver your parcel: your full name, Pakistani mobile number, city, and delivery street address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To fulfill and dispatch your parcel with our verified courier partners (TCS / Trax).</li>
              <li>To transmit order status notifications via SMS and WhatsApp.</li>
              <li>We never sell, rent, or trade your personal information to third-party marketing brokers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              3. AI Order Assistant Safety
            </h2>
            <p>
              Conversations with our digital order assistant are strictly sanitized and securely processed. Sensitive payment cards are never stored directly on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              4. Contact Our Privacy Officer
            </h2>
            <p>
              For any inquiries or requests to remove your delivery record from our system, please write to us at <strong>maasadqay11@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
