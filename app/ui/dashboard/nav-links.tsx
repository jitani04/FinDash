'use client';

import {
  HomeIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-200',
              pathname === link.href && 'text-white border-b-2 border-white'
            )}
          >
            <LinkIcon className="w-5 h-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
