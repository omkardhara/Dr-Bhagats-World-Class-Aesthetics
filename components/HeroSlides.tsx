"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The homepage banner: several photographs, crossfading slowly behind the
 * headline. Deliberately unhurried - the images change the mood of the fold,
 * they do not announce themselves.
 *
 * A single photograph renders as a still image with no controls. Motion is
 * suppressed for anyone who asks for reduced motion, and the pause control is
 * there so an auto-advancing banner never becomes something a patient cannot
 * stop (WCAG 2.2.2).
 */
export default function HeroSlides({
  slides,
  interval = 7000,
}: {
  slides: { url: string; alt?: string }[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = query.matches;
    if (query.matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [playing, slides.length, interval]);

  return (
    <>
      {slides.map((slide, slideIndex) => (
        <Image
          key={slide.url}
          src={slide.url}
          alt={slideIndex === 0 ? (slide.alt ?? "") : ""}
          aria-hidden={slideIndex === 0 ? undefined : true}
          fill
          priority={slideIndex === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ opacity: slideIndex === index ? 1 : 0 }}
        />
      ))}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/25"
      />

      {slides.length > 1 ? (
        <div className="absolute bottom-8 right-6 z-10 flex items-center gap-4 lg:right-10">
          <ul className="flex items-center gap-3">
            {slides.map((slide, slideIndex) => (
              <li key={`dot-${slide.url}`}>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(slideIndex);
                    setPlaying(false);
                  }}
                  aria-label={`Show photograph ${slideIndex + 1} of ${slides.length}`}
                  aria-current={slideIndex === index ? "true" : undefined}
                  className="flex h-11 w-6 items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={`block h-px w-5 transition-colors ${
                      slideIndex === index ? "bg-brand-champagne-light" : "bg-brand-cream/35"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPlaying((current) => !current)}
            aria-label={playing ? "Pause the photographs" : "Play the photographs"}
            className="inline-flex h-11 min-w-11 items-center justify-center text-[0.65rem] uppercase tracking-widest text-brand-cream/70 transition-colors hover:text-brand-champagne-light"
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      ) : null}
    </>
  );
}
