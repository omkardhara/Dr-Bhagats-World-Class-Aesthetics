export const metadata = {
  title: "About",
  description: "The practice, the standard, the people.",
};

const PRINCIPLES = [
  {
    title: "Diagnosis first",
    body: "Every consultation begins with an assessment, not a treatment recommendation. The protocol follows the finding.",
  },
  {
    title: "Medical-grade platforms",
    body: "We invest in the devices that hold up to clinical scrutiny, and we retire the ones that do not.",
  },
  {
    title: "Restraint over volume",
    body: "The aim is to look well rather than treated. We decline work that will not age gracefully.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 bg-brand-white">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne-light">
            About
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            A practice built around the diagnosis.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-gray-muted">
            {/* PLACEHOLDER: replace with the clinic's own positioning copy. */}
            Placeholder introduction. Replace this with the practice&apos;s own
            account of who it serves and what it stands for.
          </p>
          <div className="mt-10 h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article
              key={principle.title}
              className="flex flex-col border border-brand-gray-light bg-brand-cream/40 p-8"
            >
              <div className="h-1 w-12 bg-champagne-gradient" />
              <h2 className="mt-6 text-xl font-medium tracking-tight text-brand-black">
                {principle.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-gray-muted">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
