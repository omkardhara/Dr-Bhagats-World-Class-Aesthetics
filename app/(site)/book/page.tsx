import Link from "next/link";

export const metadata = {
  title: "Book a Consultation",
  description: "Request a consultation with the clinic.",
};

/**
 * PLACEHOLDER: the form does not submit anywhere yet. Wire it to the clinic's
 * booking system, a form service, or a server action before going live.
 */
const FIELDS = [
  { id: "name", label: "Full name", type: "text", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
];

export default function BookPage() {
  return (
    <main className="flex-1 bg-brand-white">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne-light">
            Consultation
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            Book a consultation.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-gray-muted">
            Tell us what you would like to address. We will come back to you to
            arrange a time.
          </p>
          <div className="mt-10 h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
        <form className="flex flex-col gap-8">
          {FIELDS.map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <label
                htmlFor={field.id}
                className="text-xs uppercase tracking-[0.2em] text-brand-champagne-dark"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                className="border border-brand-gray-light bg-brand-white px-4 py-3 text-sm text-brand-black outline-none transition-colors focus:border-brand-champagne"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-xs uppercase tracking-[0.2em] text-brand-champagne-dark"
            >
              What would you like to address?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="border border-brand-gray-light bg-brand-white px-4 py-3 text-sm text-brand-black outline-none transition-colors focus:border-brand-champagne"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled
              className="rounded-full bg-champagne-gradient px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-brand-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Request consultation
            </button>
            <p className="text-xs leading-relaxed text-brand-gray-muted">
              This form is not connected yet. Until it is wired to a booking
              system it will not send anything — see{" "}
              <Link className="underline" href="/technology">
                the technology page
              </Link>{" "}
              meanwhile.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
