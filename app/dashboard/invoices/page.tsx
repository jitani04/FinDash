import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 import { fetchInvoicesPages } from '@/app/lib/data';

  export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Receivables
          </p>
          <h1 className={`${lusitana.className} text-3xl`}>Invoices</h1>
          <p className="text-sm text-slate-600">
            Search, filter, and create invoices with live payment status.
          </p>
        </div>
        <CreateInvoice />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-6">
        <Search placeholder="Search invoices..." />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> 
      <div className="mt-5 flex w-full justify-center">
         <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
