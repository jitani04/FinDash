import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const formatDollars = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);
  const totalRevenue = revenue.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue =
    revenue.length > 0 ? Math.round(totalRevenue / revenue.length) : 0;
  const latestMonth = revenue[revenue.length - 1];
  const previousMonth = revenue[revenue.length - 2];
  const growth =
    latestMonth && previousMonth
      ? Math.round(
          ((latestMonth.revenue - previousMonth.revenue) /
            previousMonth.revenue) *
            100,
        )
      : 0;

  return (
    <div className="w-full md:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Revenue pulse
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 pb-4 text-sm text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800">
            Trailing 12M: {formatDollars(totalRevenue)}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800">
            Avg / month: {formatDollars(averageRevenue)}
          </span>
          <span
            className={`rounded-full px-3 py-1 font-semibold ${
              growth >= 0
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            {growth >= 0 ? '+' : ''}
            {growth}% vs last month
          </span>
        </div>

        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-xl bg-gradient-to-b from-slate-50 to-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-xs text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="relative flex w-full flex-col justify-end rounded-lg bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 shadow-sm"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-white/5 ring-1 ring-white/40" />
              </div>
              <p className="-rotate-90 text-xs text-gray-500 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            <CalendarIcon className="h-4 w-4" />
            Last 12 months
          </div>
          {latestMonth ? (
            <div className="text-sm text-slate-600">
              Latest month: {latestMonth.month} • {formatDollars(latestMonth.revenue)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
