import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

const toneMap = {
  collected: {
    gradient: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    helper: 'Collected to date',
  },
  pending: {
    gradient: 'bg-amber-50 text-amber-700 ring-amber-100',
    helper: 'Awaiting payment',
  },
  invoices: {
    gradient: 'bg-blue-50 text-blue-700 ring-blue-100',
    helper: 'Invoices in system',
  },
  customers: {
    gradient: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
    helper: 'Active accounts',
  },
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  
  return (
    <>

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];
  const tone = toneMap[type];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {Icon ? (
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${tone?.gradient}`}
          >
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <p
            className={`${lusitana.className} text-2xl font-semibold leading-tight text-slate-900`}
          >
            {value}
          </p>
          <p className="text-sm text-slate-600">{tone?.helper}</p>
        </div>
      </div>
    </div>
  );
}
