'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SheetClose } from '@/components/ui/sheet';

export function NavItemMobile({
    href,
    label,
    children
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <SheetClose asChild>
                    <Link
                        href={href}
                        className={clsx(
                            'flex items-center gap-4 px-2.5 hover:text-foreground',
                            pathname === href ? 'text-black font-semibold' : 'text-muted-foreground'
                        )}
                    >
                        {children}
                        <span className="sr-only">{label}</span>
                    </Link></SheetClose>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    );
}
