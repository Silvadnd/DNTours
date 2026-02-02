import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import { pageMetadata, generateOGTags, generateTwitterTags } from "@/lib/seo";

// Lazy load components below the fold
const TikTokFeed = dynamic(() => import("@/components/home/TikTokFeed"), {
  loading: () => <div className="h-screen bg-dn-navy" />,
});
const AboutUs = dynamic(() => import("@/components/home/AboutUs"));
const TourSection = dynamic(() => import("@/components/home/TourSection"));
const ReviewSection = dynamic(() => import("@/components/home/ReviewSection"));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  openGraph: generateOGTags("home"),
  twitter: generateTwitterTags("home"),
};

export default function Home() {
  return (
    <>
      <Hero />
      <TikTokFeed />
      <AboutUs />
      <TourSection />
      <ReviewSection />
      <WhyChooseUs />
    </>
  );
}
