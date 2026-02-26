import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Relationship desk
          </p>
          <h1 className={`${lusitana.className} text-3xl md:text-4xl`}>
            Customers
          </h1>
          <p className="text-sm text-slate-600">
            Track account health, balances, and invoice momentum.
          </p>
        </div>
        <div className="w-full md:w-80">
          <Search placeholder="Search customers..." />
        </div>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}
