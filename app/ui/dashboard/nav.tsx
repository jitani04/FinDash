import Link from 'next/link';
import Image from 'next/image';
import NavLinks from '@/app/ui/dashboard/nav-links';
import FinDashLogo from '@/app/ui/findash-logo';
import { auth } from '@/auth';

export default async function Nav() {
  const session = await auth();
  const user = session?.user;

  const initials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() ?? 'U';

  return (
    <nav className="w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Logo (links to dashboard home) */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" aria-label="Go to dashboard home">
            <FinDashLogo className="text-slate-900" />
          </Link>
        </div>

        {/* Middle: Nav Links */}
        <div className="hidden items-center gap-1 rounded-full bg-slate-100 px-2 py-1 md:flex">
          <NavLinks />
        </div>

        {/* Right: Profile avatar (icon only, clickable) */}
        <Link href="/dashboard/profile" className="flex items-center justify-end">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold">
            {user?.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={36}
                height={36}
                className="h-9 w-9 object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}
