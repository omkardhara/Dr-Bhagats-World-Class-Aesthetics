"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { EASE } from "@/components/editorialMotion";

type FieldDef = {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  multiline?: boolean;
};

const FIELDS: FieldDef[] = [
  { id: "name", label: "Full name", type: "text", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  {
    id: "message",
    label: "What would you like to improve?",
    type: "text",
    multiline: true,
  },
];

const LABEL_BASE =
  "pointer-events-none absolute left-0 origin-left transition-all duration-500 ease-out";

/**
 * Both label states are complete, literal class strings.
 *
 * A CSS-only version using `peer-focus` and `peer-[&:not(:placeholder-shown)]`
 * does not work reliably here: those variants share a specificity with the
 * base utilities, and Tailwind's emit order varies by property, so `uppercase`
 * would apply while `top-0` silently lost. Driving it from state is
 * deterministic, and keeps every class visible to Tailwind's scanner.
 */
const LABEL_RESTING =
  "top-7 text-sm normal-case tracking-normal text-brand-gray-muted";
const LABEL_FLOATED =
  "top-0 text-[0.65rem] uppercase tracking-widest text-brand-champagne";

const INPUT_CLASSES =
  "w-full border-b border-brand-gray-muted bg-transparent pb-3 pt-8 text-[1.05rem] font-normal text-brand-cream outline-none transition-colors duration-300 focus:border-brand-champagne";

function FloatingField({ field }: { field: FieldDef }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const shared = {
    id: field.id,
    name: field.id,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div className="relative">
      {field.multiline ? (
        <textarea
          {...shared}
          rows={3}
          onChange={(event) => setValue(event.target.value)}
          className={`${INPUT_CLASSES} resize-none`}
        />
      ) : (
        <input
          {...shared}
          type={field.type}
          autoComplete={field.autoComplete}
          onChange={(event) => setValue(event.target.value)}
          className={INPUT_CLASSES}
        />
      )}
      <label
        htmlFor={field.id}
        className={`${LABEL_BASE} ${floated ? LABEL_FLOATED : LABEL_RESTING}`}
      >
        {field.label}
      </label>
    </div>
  );
}

export type ConcernOption = { title: string; slug: string };

export default function BookForm({ concerns }: { concerns: ConcernOption[] }) {
  const [notice, setNotice] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE }}
      className="w-full max-w-2xl"
    >
      <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
        Book a Consultation
      </p>
      <h1 className="mt-8 text-4xl font-normal leading-[1.15] tracking-[0.01em] text-brand-cream sm:text-5xl">
        Begin with a consultation.
      </h1>
      <p className="mt-8 max-w-md text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
        Tell us what you would like to improve. Your doctor will assess your concern and discuss a
        personalised plan with you.
      </p>

      <form
        className="mt-20 flex flex-col gap-14"
        onSubmit={(event) => {
          // No destination is configured yet, so this deliberately does not
          // pretend to have sent anything.
          event.preventDefault();
          setNotice(true);
        }}
      >
        {FIELDS.slice(0, 3).map((field) => (
          <FloatingField key={field.id} field={field} />
        ))}

        <div>
          <label
            htmlFor="concern"
            className="block text-[0.65rem] uppercase tracking-widest text-brand-champagne"
          >
            Area of concern
          </label>
          <div className="relative">
            <select
              id="concern"
              name="concern"
              defaultValue=""
              className="mt-4 w-full appearance-none border-b border-brand-gray-muted bg-transparent pb-3 pt-2 text-[1.05rem] text-brand-cream outline-none transition-colors focus:border-brand-champagne"
            >
              <option value="" className="bg-brand-black">
                Choose a concern
              </option>
              {concerns.map((concern) => (
                <option key={concern.slug} value={concern.slug} className="bg-brand-black">
                  {concern.title}
                </option>
              ))}
              <option value="not-sure" className="bg-brand-black">
                Not sure yet
              </option>
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 right-0 h-2 w-2 rotate-45 border-b border-r border-brand-gray-muted"
            />
          </div>
        </div>

        <FloatingField field={FIELDS[3]} />

        <div className="mt-6 flex flex-col gap-6">
          <button
            type="submit"
            className="w-full bg-champagne-gradient-deep px-8 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity duration-300 hover:opacity-90"
          >
            Request a Consultation
          </button>

          <p aria-live="polite" className="text-[0.8rem] font-normal leading-[1.7] text-brand-gray-muted">
            {notice
              ? "Online requests are not yet active, so this has not been sent. "
              : "Online requests are not yet active. "}
            To arrange your consultation, please{" "}
            <Link href="/contact" className="text-brand-cream underline underline-offset-4">
              contact the clinic
            </Link>
            .
          </p>
        </div>
      </form>
    </motion.div>
  );
}
