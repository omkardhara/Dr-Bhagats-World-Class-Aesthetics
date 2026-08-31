import AboutEditorial from "@/components/AboutEditorial";

export const metadata = {
  title: "About",
  description: "The practice, the standard, the people.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-brand-black text-brand-cream">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-16">
          {/* Sticky rail — holds the reader while the history scrolls past. */}
          <header className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                About
              </p>
              <h1 className="mt-10 text-4xl font-thin leading-[1.15] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
                Dr. Bhagat&apos;s Philosophy
              </h1>
              <span className="mt-12 block h-px w-16 bg-champagne-gradient" />
            </div>
          </header>

          <div className="lg:col-span-6 lg:col-start-7">
            <AboutEditorial />
          </div>
        </div>
      </div>
    </main>
  );
}
