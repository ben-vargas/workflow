import { SiGithub } from '@icons-pack/react-simple-icons';
import { SquareTerminal } from 'lucide-react';

const footerLinks = {
  resources: {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      {
        label: 'Examples',
        href: 'https://github.com/vercel/workflow-examples',
      },
    ],
  },
  tools: {
    title: 'Tools',
    links: [
      {
        label: 'Compiler Playground',
        href: 'https://workflow-swc-playground.vercel.app/',
        icon: SquareTerminal,
      },
    ],
  },
  community: {
    title: 'Community',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/vercel/workflow',
        icon: SiGithub,
      },
    ],
  },
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                      rel={
                        link.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      target={
                        link.href.startsWith('http') ? '_blank' : undefined
                      }
                    >
                      {'icon' in link && link.icon && (
                        <link.icon className="size-4" />
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vercel, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
