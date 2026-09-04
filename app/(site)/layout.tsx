import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/** Marketing-site chrome. The /studio segment sits outside this group. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-link bg-brand-black px-6 py-3 text-xs uppercase tracking-widest text-brand-cream">
        Skip to content
      </a>
      <Navbar />
      <div id="main">{children}</div>
      <Footer />
    </>
  );
}
