"use client";

import { motion } from "framer-motion";
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
    label: "What would you like to address?",
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
  "w-full border-b border-brand-gray-muted bg-transparent pb-3 pt-8 text-base font-light text-brand-cream outline-none transition-colors duration-300 focus:border-brand-champagne";

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

export default function BookForm() {
  const [notice, setNotice] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE }}
      className="w-full max-w-2xl"
    >
      <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
        Consultation
      </p>
      <h1 className="mt-8 text-4xl font-thin leading-[1.15] tracking-tight text-brand-cream sm:text-5xl">
        Book a consultation.
      </h1>
      <p className="mt-8 max-w-md text-sm font-light leading-loose text-brand-gray-muted">
        Tell us what you would like to address, and we will come back to you to
        arrange a time.
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
        {FIELDS.map((field) => (
          <FloatingField key={field.id} field={field} />
        ))}

        <div className="mt-6 flex flex-col gap-6">
          <button
            type="submit"
            className="w-full bg-champagne-gradient-deep px-8 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity duration-300 hover:opacity-90"
          >
            Request Consultation
          </button>

          <p
            aria-live="polite"
            className="text-xs font-light leading-loose text-brand-gray-muted"
          >
            {notice
              ? "This form is not connected to a booking system yet, so nothing was sent. Please contact the clinic directly in the meantime."
              : "This form is not connected to a booking system yet."}
          </p>
        </div>
      </form>
    </motion.div>
  );
}
