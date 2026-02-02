"use client";
import { usePathname } from "next/navigation";
import { 
  generateLocalBusinessSchema, 
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  siteConfig 
} from "@/lib/seo";

export default function StructuredData() {
  const pathname = usePathname();
  
  // Generate breadcrumb items based on pathname
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ name: "Home", url: "/" }];
    
    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({ name, url: currentPath });
    });
    
    return breadcrumbs;
  };

  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();
  const breadcrumbSchema = generateBreadcrumbSchema(getBreadcrumbs());

  return (
    <>
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      
      {/* Breadcrumb Schema */}
      {pathname !== "/" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
      
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/images/logo/logo.png`,
            sameAs: Object.values(siteConfig.social),
            contactPoint: {
              "@type": "ContactPoint",
              telephone: siteConfig.contact.phone,
              contactType: "Customer Service",
              email: siteConfig.contact.email,
              availableLanguage: ["English", "German", "Russian", "French"],
              areaServed: "LK",
            },
          }),
        }}
      />
    </>
  );
}
