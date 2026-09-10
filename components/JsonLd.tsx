/**
 * Structured data. `<` is escaped so CMS text containing "</script>" cannot
 * break out of the tag - this content is editable in the Studio.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
