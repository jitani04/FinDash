import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import FinDashLogo from '@/app/ui/findash-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function Nav() {
  return (
    <nav className="w-full bg-blue-500 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <FinDashLogo />
        </div>

        {/* Middle: Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>

        {/* Right: Sign Out */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition">
            <PowerIcon className="w-5" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </form>

      </div>
    </nav>
  );
}
