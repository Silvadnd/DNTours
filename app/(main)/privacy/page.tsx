import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, generateOGTags, generateTwitterTags } from "@/lib/seo";
import { Shield, Lock, Eye, Mail, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: pageMetadata.privacy.title,
  description: pageMetadata.privacy.description,
  keywords: pageMetadata.privacy.keywords,
  openGraph: generateOGTags("privacy"),
  twitter: generateTwitterTags("privacy"),
  alternates: {
    canonical: "https://dntoursahungalla.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
            <Shield size={14} className="text-[#0D9488]" />
            Your Privacy Matters
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-[#0F172A] mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm">
            Last Updated: October 2026 • DN Tours Ahungalla, Sri Lanka
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-slate-700 leading-relaxed font-body bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-xs">
          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A] flex items-center gap-2">
              <Eye size={20} className="text-[#0D9488]" />
              1. Information We Collect
            </h2>
            <p>
              DN Tours (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website{" "}
              <a href="https://dntoursahungalla.com" className="text-[#0D9488] underline">
                dntoursahungalla.com
              </a>{" "}
              from Ahungalla, Sri Lanka. When you communicate with us via our contact form, email, or WhatsApp to arrange private tours, transfers, or excursions, we collect only the information necessary to organize your journey:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Contact Information:</strong> Your name, email address, phone number / WhatsApp number, and country of residence.
              </li>
              <li>
                <strong>Travel Details:</strong> Preferred travel dates, number of travellers, flight arrival/departure details for airport pickups, hotel pickup locations in Ahungalla or elsewhere in Sri Lanka, and specific itinerary interests.
              </li>
              <li>
                <strong>Guest Reviews & Memories:</strong> Testimonials, guest photos, or feedback you voluntarily choose to submit through our website forms or share with our team.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A] flex items-center gap-2">
              <Lock size={20} className="text-[#0D9488]" />
              2. How We Use Your Information
            </h2>
            <p>We use the details you provide solely for genuine travel purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>To respond promptly to your tour inquiries and customized itinerary requests.</li>
              <li>To coordinate driver assignments, vehicle scheduling, and airport transfers.</li>
              <li>To provide customer support and real-time assistance during your holiday in Sri Lanka.</li>
              <li>To display guest reviews on our website when explicitly approved by you.</li>
            </ul>
            <p>
              We <strong>do not sell, rent, or trade</strong> your personal contact information to third parties or marketing brokers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A]">
              3. Communication via WhatsApp &amp; Third-Party Services
            </h2>
            <p>
              For traveller convenience, we communicate actively via WhatsApp, which provides end-to-end encrypted messaging. When you click WhatsApp links on our website, you connect directly to our business number (+94 77 945 2473) in accordance with WhatsApp&apos;s privacy terms.
            </p>
            <p>
              Our website may utilize standard technical service providers (such as hosting platforms and database services for guest reviews) that maintain industry-standard security practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A]">
              4. Cookies and Website Analytics
            </h2>
            <p>
              Our website uses basic functional session cookies and standard web analytics to understand website performance and improve navigation for international travellers. You can configure your browser to decline cookies at any time without restricting your access to essential website content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#0F172A]">
              5. Data Retention &amp; Your Rights
            </h2>
            <p>
              We retain trip communication only as long as needed to fulfill your booking and comply with standard accounting practices. You have the right to request access to the personal data we hold about you, or ask us to delete your contact details or remove any submitted photos or reviews at any time.
            </p>
          </section>

          <section className="space-y-4 p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200">
            <h2 className="font-heading font-bold text-xl text-[#0F172A] flex items-center gap-2">
              <Mail size={18} className="text-[#0D9488]" />
              Contact Us Regarding Your Privacy
            </h2>
            <p className="text-sm text-slate-600">
              If you have any questions about this Privacy Policy or wish to modify your information, please contact us directly:
            </p>
            <ul className="text-sm space-y-1 text-slate-600">
              <li><strong>DN Tours Ahungalla</strong></li>
              <li>Address: Galwehera, Ahungalla 80562, Sri Lanka</li>
              <li>Email: <a href="mailto:da.dinethnawanjana@gmail.com" className="text-[#0D9488] hover:underline">da.dinethnawanjana@gmail.com</a></li>
              <li>Phone / WhatsApp: <a href="tel:+94779452473" className="text-[#0D9488] hover:underline">+94 77 945 2473</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
