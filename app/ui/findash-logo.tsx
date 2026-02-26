import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import clsx from 'clsx';

export default function FinDashLogo({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        `${lusitana.className} flex flex-row items-center leading-none`,
        className ?? 'text-slate-900',
      )}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">FinDash</p>
    </div>
  );
}
