import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & 7-Day Exchange Policy | Maa Sadqay",
  description: "Easy 7-day size exchange and returns guidelines for kids clothing at Maa Sadqay.",
};

export default function RefundPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-surface-warm min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Customer Protection
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary">
            Refund & 7-Day Size Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Peace of mind for amazing moms and families across Pakistan.
          </p>
        </div>

        <div className="bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-6 text-xs sm:text-sm text-ink-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              1. 7-Day Easy Size Exchange
            </h2>
            <p>
              We want your child to wear an outfit that fits comfortably. If an item you received is too large or too small, you may request a size exchange within <strong>7 days</strong> of delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              2. Exchange Conditions
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Item must be unworn, unwashed, and free from perfume or staining.</li>
              <li>Original Maa Sadqay price tags must remain attached.</li>
              <li>Clearance sale items (Under Rs. 599 tier) are final sale unless damaged during transit.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              3. Damaged or Incorrect Item
            </h2>
            <p>
              In the rare event that an item arrives with a manufacturing defect or wrong color/size, we will arrange a reverse pickup and dispatch the replacement completely free of charge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              4. How to Initiate an Exchange
            </h2>
            <p>
              Simply message our dedicated helpline on WhatsApp at <strong>0315-4245424</strong> with your Order ID (format <code>MS-YYMMDD-XXXX</code>) and photographic proof if damaged. Our team will guide you step by step.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
