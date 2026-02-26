import Link from 'next/link';
import {
  BoltIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const actions = [
  {
    title: 'Create invoice',
    href: '/dashboard/invoices/create',
    description: 'Send a clean, branded invoice in seconds.',
    icon: SparklesIcon,
  },
  {
    title: 'Review customers',
    href: '/dashboard/customers',
    description: 'See account health, payments, and activity.',
    icon: UserGroupIcon,
  },
  {
    title: 'Jump to profile',
    href: '/dashboard/profile',
    description: 'Update your preferences and security settings.',
    icon: BoltIcon,
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-900">
                  {action.title}
                </p>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </div>
            <span className="pointer-events-none absolute right-4 top-4 text-xs font-semibold text-blue-700 opacity-0 transition group-hover:opacity-100">
              Start →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
