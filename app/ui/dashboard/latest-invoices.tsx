import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import Link from 'next/link';

export default async function LatestInvoices( ) {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Latest invoices
        </h2>
        <Link
          href="/dashboard/invoices"
          className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="flex grow flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="divide-y divide-slate-200">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className="flex flex-row items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200">
                    <Image
                      src={invoice.image_url}
                      alt={`${invoice.name}'s profile picture`}
                      className="rounded-full"
                      width={36}
                      height={36}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-xs text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p
                    className={`${lusitana.className} truncate text-sm font-semibold text-slate-900 md:text-base`}
                  >
                    {invoice.amount}
                  </p>
                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="text-xs font-semibold text-blue-700 underline-offset-4 hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          <ArrowPathIcon className="h-4 w-4 text-slate-500" />
          Refreshed just now
        </div>
      </div>
    </div>
  );
}
