/** Sanitize JSON-LD payload per Next.js guide (prevent script injection). */
export function serializeJsonLd(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c')
}
