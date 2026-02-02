import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import StructuredData from "@/components/global/StructuredData";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main className="min-h-screen relative">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
