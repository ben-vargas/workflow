import { codeToHtml, type ShikiTransformer } from 'shiki';
import { cn } from '@/lib/utils';

type CodeBlockProps = {
  code: string;
  lang: string;
  codeblock?: {
    className?: string;
  };
  /**
   * List of strings to highlight in the code block.
   * These will be given a special highlight style.
   */
  highlight?: string[];
};

/**
 * Creates a Shiki transformer that highlights specific strings in code.
 */
function createHighlightTransformer(patterns: string[]): ShikiTransformer {
  return {
    name: 'highlight-strings',
    span(node, _line, _col, _lineElement, token) {
      // Check if the token content matches any of the patterns
      const tokenContent = token.content;
      if (patterns.some((pattern) => tokenContent.includes(pattern))) {
        this.addClassToHast(node, 'highlighted-code');
      }
    },
  };
}

export const CodeBlock = async ({
  code,
  lang,
  codeblock,
  highlight,
}: CodeBlockProps) => {
  const transformers: ShikiTransformer[] = [];

  if (highlight && highlight.length > 0) {
    transformers.push(createHighlightTransformer(highlight));
  }

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light-default',
      dark: 'github-dark-default',
    },
    defaultColor: false,
    transformers,
  });

  return (
    <div
      className={cn(
        'overflow-auto text-sm py-6 border [&_pre]:!bg-transparent',
        codeblock?.className
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
