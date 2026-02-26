import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PencilIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import InvoiceStatus from '@/app/ui/invoices/status';
import { fetchInvoiceDetails } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function InvoiceDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const invoice = await fetchInvoiceDetails(id);
  if (!invoice) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: `Invoice #${invoice.id.slice(0, 8)}`,
            href: `/dashboard/invoices/${id}`,
            active: true,
          },
        ]}
      />
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Invoice #{invoice.id.slice(0, 8)}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {formatDateToLocal(invoice.date)}
            </p>
          </div>
          <InvoiceStatus status={invoice.status} />
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Customer</dt>
            <dd className="mt-1 text-gray-900">{invoice.customer_name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-gray-900">{invoice.customer_email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Amount</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              {invoice.amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <InvoiceStatus status={invoice.status} />
            </dd>
          </div>
        </dl>
        <div className="mt-8">
          <Link
            href={`/dashboard/invoices/${id}/edit`}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <PencilIcon className="h-4 w-4" />
            Edit invoice
          </Link>
        </div>
      </div>
    </main>
  );
}
