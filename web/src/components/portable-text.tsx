import {
  type PortableTextProps,
  PortableText as PortableTextRenderer,
} from '@portabletext/react';

type CodeBlock = {
  _type: 'code';
  code?: string;
  language?: string;
  filename?: string;
};

export function PortableText({
  value,
}: {
  value: NonNullable<PortableTextProps['value']>;
}) {
  return (
    <div className="prose prose-invert max-w-none">
      <PortableTextRenderer
        value={value}
        components={{
          types: {
            code: ({ value: codeValue }: { value: CodeBlock }) => (
              <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4">
                {codeValue.filename && (
                  <div className="mb-2 text-xs text-muted-foreground">
                    {codeValue.filename}
                  </div>
                )}
                <code>{codeValue.code}</code>
              </pre>
            ),
          },
        }}
      />
    </div>
  );
}
