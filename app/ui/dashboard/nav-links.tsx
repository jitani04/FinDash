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
              'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900',
              pathname === link.href &&
                'bg-white text-blue-700 shadow-sm ring-1 ring-blue-100'
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
