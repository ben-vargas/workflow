import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs';
import { Folder, Item, Separator } from '@/components/geistdocs/sidebar';
import { guidesSource } from '@/lib/geistdocs/source';

export const GuidesLayout = ({
  children,
}: Pick<LayoutProps<'/guides'>, 'children'>) => (
  <FumadocsDocsLayout
    containerProps={{
      className:
        'md:grid md:grid-cols-[286px_1fr_286px] md:pl-0! md:mx-auto! md:w-full md:max-w-(--fd-layout-width)!',
    }}
    nav={{
      enabled: false,
    }}
    searchToggle={{
      enabled: false,
    }}
    sidebar={{
      className:
        'md:static md:sticky md:top-16 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto md:w-auto! bg-background! md:bg-transparent! border-none transition-none',
      collapsible: false,
      components: {
        Folder,
        Item,
        Separator,
      },
    }}
    tabMode="auto"
    themeSwitch={{
      enabled: false,
    }}
    tree={guidesSource.pageTree}
  >
    {children}
  </FumadocsDocsLayout>
);

const Layout = ({ children }: LayoutProps<'/guides'>) => (
  <GuidesLayout>{children}</GuidesLayout>
);

export default Layout;
