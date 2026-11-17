"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import HeroSlides from "@/components/HeroSlides";

type Slide = { url: string; alt?: string; mobileUrl?: string };

/**
 * The homepage fold: a silent video loop where it is worth the bandwidth, and
 * photography everywhere else.
 *
 * The poster frame is what the server renders, so the first paint is a single
 * image and the page is never waiting on a video. The video itself mounts only
 * on a wide screen, and never when the visitor has asked for reduced motion -
 * on a phone, on a slow connection or in a quiet setting, the still is the
 * whole experience rather than a degraded one.
 */
export default function HeroMedia({
  video,
  poster,
  slides,
}: {
  video?: { url: string } | null;
  poster?: Slide | null;
  slides: Slide[];
}) {
  const [playVideo, setPlayVideo] = useState(false);
  const element = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) return;

    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Respect a metered or slow connection where the browser reports one.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const frugal = Boolean(
      connection?.saveData || (connection?.effectiveType && /2g/.test(connection.effectiveType))
    );

    const decide = () => setPlayVideo(wide.matches && !calm.matches && !frugal);
    decide();
    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, [video]);

  // Nothing to play: the photographs carry the fold.
  if (!video || !poster) return <HeroSlides slides={slides} />;

  return (
    <>
      {/* Photography underneath where it exists, so a phone sees the banner
          rather than a frame grab. The poster stands in until it does. */}
      {slides.length > 0 ? (
        <HeroSlides slides={slides} />
      ) : (
        <Image
          src={poster.url}
          alt={poster.alt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {playVideo ? (
        <video
          ref={element}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster.url}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          onCanPlay={(event) => {
            void event.currentTarget.play().catch(() => {
              /* A browser that refuses to autoplay simply leaves the poster. */
            });
          }}
        >
          <source src={video.url} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/25"
      />
    </>
  );
}
