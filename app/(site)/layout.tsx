import Navbar from "@/components/Navbar";

/** Marketing-site chrome. The /studio segment sits outside this group. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
