import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';
import { AskAI } from '@/components/geistdocs/ask-ai';
import { CopyPage } from '@/components/geistdocs/copy-page';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/components/geistdocs/docs-page';
import { EditSource } from '@/components/geistdocs/edit-source';
import { Feedback } from '@/components/geistdocs/feedback';
import { getMDXComponents } from '@/components/geistdocs/mdx-components';
import { OpenInChat } from '@/components/geistdocs/open-in-chat';
import { ScrollTop } from '@/components/geistdocs/scroll-top';
import { TableOfContents } from '@/components/geistdocs/toc';
import * as AccordionComponents from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  getGuidesLLMText,
  getPageImage,
  guidesSource,
} from '@/lib/geistdocs/source';
import { TSDoc } from '@/lib/tsdoc';
import type { Metadata } from 'next';

const Page = async (props: PageProps<'/guides/[[...slug]]'>) => {
  const params = await props.params;

  const page = guidesSource.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const markdown = await getGuidesLLMText(page);
  const MDX = page.data.body;

  return (
    <DocsPage
      slug={params.slug}
      tableOfContent={{
        component: (
          <TableOfContents>
            <EditSource path={page.path} />
            <ScrollTop />
            <Feedback />
            <CopyPage text={markdown} />
            <AskAI href={page.url} />
            <OpenInChat href={page.url} />
          </TableOfContents>
        ),
      }}
      toc={page.data.toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(guidesSource, page),

            // Add your custom components here
            Badge,
            TSDoc,
            Step,
            Steps,
            ...AccordionComponents,
            Tabs,
            Tab,
          })}
        />
      </DocsBody>
    </DocsPage>
  );
};

export const generateStaticParams = () =>
  guidesSource.generateParams().map((params) => ({
    slug: params.slug,
  }));

export const generateMetadata = async (
  props: PageProps<'/guides/[[...slug]]'>
): Promise<Metadata> => {
  const params = await props.params;
  const page = guidesSource.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const { segments, url } = getPageImage(page);

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      url: page.url,
      images: [
        {
          url,
          width: 1200,
          height: 630,
          alt: segments.join(' - '),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [url],
    },
  };
};

export default Page;
