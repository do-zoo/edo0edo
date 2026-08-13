import { describe, expect, it } from 'vitest'

import { serializeJsonLd } from '@/lib/seo/json-ld/serialize-json-ld'

describe('serializeJsonLd', () => {
  it('escapes less-than to prevent script injection', () => {
    const payload = { '@type': 'Thing', name: '</script><script>alert(1)</script>' }
    const serialized = serializeJsonLd(payload)
    expect(serialized).not.toContain('</script>')
    expect(serialized).toContain('\\u003c/script>')
  })

  it('produces valid JSON', () => {
    const payload = { '@type': 'Organization', name: 'CISC' }
    expect(() => JSON.parse(serializeJsonLd(payload))).not.toThrow()
  })
})
