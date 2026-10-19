import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, generateOGTags, generateTwitterTags } from "@/lib/seo";
import { FileText, CalendarCheck, AlertCircle, HelpCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: pageMetadata.terms.title,
  description: pageMetadata.terms.description,
  keywords: pageMetadata.terms.keywords,
  openGraph: generateOGTags("terms"),
  twitter: generateTwitterTags("terms"),
  alternates: {
    canonical: "https://dntoursahungalla.com/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0D9488] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-slate-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText size={14} className="text-[#0D9488]" />
            Clear &amp; Transparent Terms
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-[#0F172A] mb-4">
            Terms of Service &amp; Booking Conditions
          </h1>
          <p className="text-slate-500 text-sm">
            Last Updated: October 2026 • DN Tours Ahungalla, Sri Lanka
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-slate-700 leading-relaxed font-body bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-xs">
          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A] flex items-center gap-2">
              <CalendarCheck size={20} className="text-[#0D9488]" />
              1. Tour Inquiries &amp; Booking Confirmation
            </h2>
            <p>
              DN Tours provides private driver-guided tours, airport transfers, and day excursions across Sri Lanka. When you submit an inquiry through our website, WhatsApp, or email, we confirm availability and provide a clear quote in agreed currency (usually USD, EUR, GBP, or LKR) based on your route and dates.
            </p>
            <p>
              A tour booking is considered confirmed once both parties have agreed upon the itinerary, pickup date, vehicle requirements, and pricing terms in written communication (via email or WhatsApp).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A]">
              2. Transparent Pricing &amp; Inclusions
            </h2>
            <p>
              Each private tour quote clearly specifies what is included:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Typically Included:</strong> Private air-conditioned vehicle, dedicated English-speaking driver-guide, fuel, expressway tolls, parking fees, and driver accommodation &amp; meals for multi-day tours.
              </li>
              <li>
                <strong>Typically Excluded (unless specifically requested in custom packages):</strong> Personal entry tickets to national parks, monuments, UNESCO heritage sites (such as Sigiriya, Temple of the Tooth, Galle Fort museums), safari jeep hire fees, guest accommodation, meals, drinks, and personal gratuities.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A] flex items-center gap-2">
              <AlertCircle size={20} className="text-[#0D9488]" />
              3. Flexible Cancellations &amp; Refunds
            </h2>
            <p>
              We understand travel plans can change due to flight adjustments or personal circumstances. Our cancellation policy is designed to be straightforward and fair:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Day Tours &amp; Airport Transfers:</strong> Cancellations made at least 24 hours prior to scheduled pickup incur no cancellation charge.
              </li>
              <li>
                <strong>Multi-Day Tours:</strong> Cancellations made at least 7 days before tour departure incur no cancellation penalty. For late cancellations where vehicle reservations or advance arrangements have been committed, any non-refundable third-party costs will be communicated transparently.
              </li>
              <li>
                <strong>Weather &amp; Force Majeure:</strong> In the rare event of extreme weather, official road closures, or safety concerns, we will work with you to adjust the route safely or reschedule without penalty.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A]">
              4. Itinerary Flexibility &amp; Guest Responsibilities
            </h2>
            <p>
              Private tours offer the unique benefit of flexibility. While we follow agreed core itineraries, you may request reasonable stops along the way (such as tea plantation views, local fruit stalls, or photography viewpoints) at your own pace.
            </p>
            <p>
              Guests are responsible for maintaining valid travel documents, passports, Sri Lanka travel visas (ETA), and personal travel insurance covering health, luggage, and activities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A]">
              5. Vehicle Safety &amp; Conduct
            </h2>
            <p>
              All DN Tours vehicles are well-maintained, fully insured, and operated by professional, licensed drivers committed to your comfort and safety on Sri Lankan roads. We ask guests to respect vehicle cleanliness and safety regulations, including wearing seatbelts.
            </p>
          </section>

          <section className="space-y-4 p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200">
            <h2 className="font-heading font-bold text-xl text-[#0F172A] flex items-center gap-2">
              <HelpCircle size={18} className="text-[#0D9488]" />
              Questions About Your Booking?
            </h2>
            <p className="text-sm text-slate-600">
              We are always here to assist with itinerary planning, price quotes, or any questions:
            </p>
            <ul className="text-sm space-y-1 text-slate-600">
              <li><strong>DN Tours Ahungalla</strong></li>
              <li>WhatsApp / Phone: <a href="tel:+94779452473" className="text-[#0D9488] hover:underline">+94 77 945 2473</a></li>
              <li>Email: <a href="mailto:da.dinethnawanjana@gmail.com" className="text-[#0D9488] hover:underline">da.dinethnawanjana@gmail.com</a></li>
              <li>Location: Galwehera, Ahungalla 80562, Sri Lanka</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
