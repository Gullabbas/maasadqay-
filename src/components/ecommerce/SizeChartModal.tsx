"use client";

import { X, Ruler } from "lucide-react";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function SizeChartModal({ isOpen, onClose, category }: SizeChartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-primary/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-surface-pure rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-brand-100">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-brand-600" />
            <h3 className="font-display font-bold text-lg text-ink-primary">
              Maa Sadqay Standard Size Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-ink-tertiary hover:text-ink-primary hover:bg-brand-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <p className="text-xs text-ink-secondary leading-relaxed">
            All measurements are provided in <strong>Inches</strong>. If your child falls between two sizes, we recommend sizing up for comfortable growing room.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-50/80 text-brand-900 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Age / Size</th>
                  <th className="p-3">Chest</th>
                  <th className="p-3">Shirt Length</th>
                  <th className="p-3">Waist (Elastic)</th>
                  <th className="p-3">Pajama Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100/70 text-ink-primary font-medium">
                <tr>
                  <td className="p-3 font-bold text-brand-600">6–12 Months</td>
                  <td className="p-3">21&quot;</td>
                  <td className="p-3">14&quot;</td>
                  <td className="p-3">16–20&quot;</td>
                  <td className="p-3">16&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-brand-600">1–2 Years</td>
                  <td className="p-3">23&quot;</td>
                  <td className="p-3">16&quot;</td>
                  <td className="p-3">17–22&quot;</td>
                  <td className="p-3">18&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-brand-600">3–4 Years</td>
                  <td className="p-3">25&quot;</td>
                  <td className="p-3">18&quot;</td>
                  <td className="p-3">18–24&quot;</td>
                  <td className="p-3">21&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-brand-600">5–6 Years</td>
                  <td className="p-3">27&quot;</td>
                  <td className="p-3">21&quot;</td>
                  <td className="p-3">20–26&quot;</td>
                  <td className="p-3">24&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-brand-600">7–8 Years</td>
                  <td className="p-3">29&quot;</td>
                  <td className="p-3">24&quot;</td>
                  <td className="p-3">22–28&quot;</td>
                  <td className="p-3">27&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-brand-600">9–10 Years</td>
                  <td className="p-3">31&quot;</td>
                  <td className="p-3">27&quot;</td>
                  <td className="p-3">24–30&quot;</td>
                  <td className="p-3">31&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-brand-600">11–12 Years</td>
                  <td className="p-3">33&quot;</td>
                  <td className="p-3">30&quot;</td>
                  <td className="p-3">26–32&quot;</td>
                  <td className="p-3">34&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-brand-50 rounded-xl text-[11px] text-ink-secondary">
            💡 <strong>Need sizing guidance?</strong> You can ask our AI Assistant in the bottom right corner or WhatsApp our team directly at <strong>0315-4245424</strong>!
          </div>
        </div>
      </div>
    </div>
  );
}
