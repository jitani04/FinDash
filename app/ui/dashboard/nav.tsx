import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import FinDashLogo from '@/app/ui/findash-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function Nav() {
  return (
    <nav className="w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Logo + wordmark */}
        <div className="flex items-center gap-3">
          <FinDashLogo className="text-slate-900" />
          <div className="hidden text-sm font-medium text-slate-500 sm:block">
            Clear, calm finance dashboards
          </div>
        </div>

        {/* Middle: Nav Links */}
        <div className="hidden items-center gap-1 rounded-full bg-slate-100 px-2 py-1 md:flex">
          <NavLinks />
        </div>

        {/* Right: Sign Out */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-500 hover:text-blue-700">
            <PowerIcon className="w-5" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </form>
      </div>
    </nav>
  );
}
