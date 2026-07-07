import {
  type PortableTextProps,
  PortableText as PortableTextRenderer,
} from '@portabletext/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CodeBlock = {
  _type: 'code';
  code?: string;
  language?: string;
  filename?: string;
};

function ProseHeading({
  as: Tag,
  className,
  children,
}: {
  as: 'h2' | 'h3';
  className: string;
  children: ReactNode;
}) {
  return <Tag className={className}>{children}</Tag>;
}

export function PortableText({
  value,
}: {
  value: NonNullable<PortableTextProps['value']>;
}) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-foreground/80">
      <PortableTextRenderer
        value={value}
        components={{
          block: {
            h2: ({ children }) => (
              <ProseHeading
                as="h2"
                className="!mt-12 !mb-4 border-b border-border/50 pb-3 font-display text-2xl font-semibold tracking-tight text-foreground first:!mt-0 md:text-3xl"
              >
                {children}
              </ProseHeading>
            ),
            h3: ({ children }) => (
              <ProseHeading
                as="h3"
                className="!mt-8 !mb-3 font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl"
              >
                {children}
              </ProseHeading>
            ),
            normal: ({ children }) => (
              <p className="leading-relaxed text-foreground/80">{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-primary/40 pl-4 italic text-foreground/70">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc space-y-2 pl-6 marker:text-primary">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal space-y-2 pl-6 marker:text-primary">
                {children}
              </ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li className="text-foreground/80">{children}</li>
            ),
            number: ({ children }) => (
              <li className="text-foreground/80">{children}</li>
            ),
          },
          marks: {
            link: ({ children, value: markValue }) => {
              const href = markValue?.href;
              if (!href) return <>{children}</>;
              const isExternal = href.startsWith('http');
              return (
                <Link
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {children}
                </Link>
              );
            },
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">
                {children}
              </strong>
            ),
            code: ({ children }) => (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
                {children}
              </code>
            ),
          },
          types: {
            code: ({ value: codeValue }: { value: CodeBlock }) => (
              <pre className="overflow-x-auto rounded-xl border border-border/60 bg-muted/80 p-4 text-sm">
                {codeValue.filename && (
                  <div className="mb-2 font-mono text-xs text-muted-foreground">
                    {codeValue.filename}
                  </div>
                )}
                <code className="bg-transparent p-0 text-foreground">
                  {codeValue.code}
                </code>
              </pre>
            ),
          },
        }}
      />
    </div>
  );
}
