import FinDashLogo from '@/app/ui/findash-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';
import LandingAnimation from './ui/landing-animation';

export default function Page() {
  return (
    <main className="relative min-h-screen bg-slate-50">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-50 via-white to-transparent" />
      <div className="relative mx-auto flex max-w-6xl flex-col px-6 py-10 md:py-16">
        <header className="flex items-center justify-between">
          <FinDashLogo className="text-slate-900" />
        </header>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
              Financial clarity
            </p>
            <h1
              className={`${lusitana.className} text-4xl font-semibold leading-tight text-slate-900 md:text-5xl`}
            >
              financial dashboards for revenue and customer tracking.
            </h1>
            <p className="text-lg text-slate-600">
              FinDash keeps your team aligned with the essentials: invoices,
              real-time revenue, and customer health, without the visual noise.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
              >
                Sign in <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-700"
              >
                View sample dashboard
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800">
                Live data previews
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800">
                Modern UI system
              </span>
            </div>
          </div>

          <LandingAnimation />
        </div>
      </div>
    </main>
  );
}
