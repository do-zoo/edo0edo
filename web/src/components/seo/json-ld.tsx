import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { JsonLdObject } from "@/lib/seo/types";

function withoutContext(obj: JsonLdObject): JsonLdObject {
  const { ["@context"]: _context, ...rest } = obj;
  return rest;
}

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const payload = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data.map(withoutContext),
      }
    : { "@context": "https://schema.org", ...withoutContext(data) };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
