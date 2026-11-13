import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Maa Sadqay",
  description: "Terms and conditions of ordering and using the Maa Sadqay digital platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-12 sm:py-20 bg-surface-warm min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Legal Terms
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Maa Sadqay Kids Wear • Lahore, Pakistan
          </p>
        </div>

        <div className="bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-6 text-xs sm:text-sm text-ink-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              1. Commercial Agreement
            </h2>
            <p>
              By browsing this website, adding items to your bag, or placing an order through our checkout or AI Order Assistant, you agree to these Terms of Service and our Shipping and Return policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              2. Product Colors & Photography
            </h2>
            <p>
              We photograph all products using natural light to display colors accurately. Slight variations in hue may occur due to individual mobile or monitor display calibration.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              3. Order Confirmation & Refusal
            </h2>
            <p>
              Maa Sadqay reserves the right to cancel or withhold dispatch for orders with fake telephone numbers, repeatedly returned COD addresses, or suspected fraudulent attempts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              4. Governing Law
            </h2>
            <p>
              These terms are governed by the commercial and consumer protection laws of the Islamic Republic of Pakistan, with primary jurisdiction held in the courts of Lahore.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
