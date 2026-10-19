import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import {
  pageMetadata,
  generateOGTags,
  generateTwitterTags,
} from "@/lib/seo";

// Dynamically load below-the-fold interactive components with lightweight placeholders
const ExplorePlaces = dynamic(() => import("@/components/home/ExplorePlaces"), {
  loading: () => <div className="min-h-96 bg-[#FAF8F5] animate-pulse" />,
});

const TikTokFeed = dynamic(() => import("@/components/home/TikTokFeed"), {
  loading: () => <div className="min-h-96 bg-[#F0F7FF] animate-pulse" />,
});

const TourSection = dynamic(() => import("@/components/home/TourSection"), {
  loading: () => <div className="min-h-96 bg-[#FAF9F6] animate-pulse" />,
});

const ReviewSection = dynamic(() => import("@/components/home/ReviewSection"), {
  loading: () => <div className="min-h-80 bg-[#FAF8F5]" />,
});

const PersonalizedHospitality = dynamic(
  () => import("@/components/home/PersonalizedHospitality"),
  {
    loading: () => <div className="min-h-96 bg-[#E8F5F1] animate-pulse" />,
  }
);

const FAQSection = dynamic(() => import("@/components/home/FAQSection"), {
  loading: () => <div className="min-h-80 bg-[#FAF8F5]" />,
});

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  openGraph: generateOGTags("home"),
  twitter: generateTwitterTags("home"),
  alternates: {
    canonical: "https://dntoursahungalla.com",
  },
};

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Explore Places — Positioned immediately after Hero */}
      <ExplorePlaces />

      {/* 3. Feel the Vibe — Video browsing with first-time swipe guidance */}
      <TikTokFeed />

      {/* 4. Tailored Sri Lanka Journeys — Itineraries with interactive map & WhatsApp planning */}
      <TourSection />

      {/* 5. About Us — Authentic local story & verified Ahungalla roots */}
      <AboutUs />

      {/* 6. Why Choose DN Tours — Transparent travel advantages & safety */}
      <WhyChooseUs />

      {/* 7. Reviews — Real traveler experiences & feedback */}
      <ReviewSection />

      {/* 8. Personalized Sri Lankan Hospitality — Interactive interest & style builder */}
      <PersonalizedHospitality />

      {/* 9. Remaining sections in logical order: FAQs */}
      <FAQSection />
    </>
  );
}
