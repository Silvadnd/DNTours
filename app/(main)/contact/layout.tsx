import { Metadata } from "next";
import { pageMetadata, generateOGTags, generateTwitterTags } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
  openGraph: generateOGTags("contact"),
  twitter: generateTwitterTags("contact"),
  alternates: {
    canonical: "https://dntoursahungalla.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
