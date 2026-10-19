import { Metadata } from "next";
import { pageMetadata, generateOGTags, generateTwitterTags } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageMetadata.memory.title,
  description: pageMetadata.memory.description,
  keywords: pageMetadata.memory.keywords,
  openGraph: generateOGTags("memory"),
  twitter: generateTwitterTags("memory"),
  alternates: {
    canonical: "https://dntoursahungalla.com/memory",
  },
};

export default function MemoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
