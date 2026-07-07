import { PortableText as PortableTextRenderer } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-invert max-w-none">
      <PortableTextRenderer value={value} />
    </div>
  );
}
