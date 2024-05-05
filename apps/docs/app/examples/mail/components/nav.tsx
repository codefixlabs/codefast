import { buttonVariants } from '@codefast/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@codefast/ui/tooltip';
import { cn } from '@codefast/ui/utils';
import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { type JSX } from 'react';

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: 'default' | 'ghost';
  }[];
}

export function Nav({ links, isCollapsed }: NavProps): JSX.Element {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            // eslint-disable-next-line react/no-array-index-key -- we don't expect the links to change
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: link.variant, size: 'icon' }),
                    'size-9',
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  )}
                >
                  <link.icon className="size-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label ? (
                  <span className="text-muted-foreground ml-auto">
                    {link.label}
                  </span>
                ) : null}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              // eslint-disable-next-line react/no-array-index-key -- we don't expect the links to change
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: 'sm' }),
                link.variant === 'default' &&
                  'dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white',
                'justify-start',
              )}
            >
              <link.icon className="mr-2 size-4" />
              {link.title}
              {link.label ? (
                <span
                  className={cn(
                    'ml-auto',
                    link.variant === 'default' &&
                      'text-background dark:text-white',
                  )}
                >
                  {link.label}
                </span>
              ) : null}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
