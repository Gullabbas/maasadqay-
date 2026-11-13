import { Metadata } from "next";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Maa Sadqay",
  description: "Nationwide delivery rules, rates, timelines and Cash on Delivery guidelines for Maa Sadqay.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-surface-warm min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Policies & Guarantees
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary">
            Shipping & Nationwide Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Last updated: November 2026 • Effective across Pakistan
          </p>
        </div>

        <div className="bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-6 text-xs sm:text-sm text-ink-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              1. Delivery Rates & Free Shipping
            </h2>
            <p>
              At Maa Sadqay, we believe in transparent, straightforward shipping costs with no hidden surcharges:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Free Shipping:</strong> Automatically applied to all nationwide orders with a cart value of <strong>Rs. 10,000 or above</strong>.
              </li>
              <li>
                <strong>Standard Flat Rate:</strong> A flat fee of <strong>Rs. 250</strong> applies to all other nationwide orders, regardless of parcel weight or city.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              2. Delivery Timelines
            </h2>
            <p>
              Orders are packaged and dispatched from our Lahore studio within 24 to 48 hours. Estimated delivery window:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Lahore & Environs:</strong> 2 to 3 Business Days.</li>
              <li><strong>Major Cities (Karachi, Islamabad, Rawalpindi, Faisalabad):</strong> 3 to 4 Business Days.</li>
              <li><strong>Regional Districts & Remote Locations:</strong> 4 to 5 Business Days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              3. Cash on Delivery (COD) Procedure
            </h2>
            <p>
              Cash on Delivery is available across all major cities and towns in Pakistan. The courier agent will present the sealed Maa Sadqay parcel. Please provide the exact cash amount shown on your parcel invoice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-ink-primary">
              4. Real-Time Tracking
            </h2>
            <p>
              Once your parcel is handed over to the courier partner (TCS/Trax), you will receive a tracking link via SMS or WhatsApp. You can also monitor your live status anytime via our{" "}
              <a href="/track-order" className="text-brand-600 font-bold underline">
                Tracking Portal
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
