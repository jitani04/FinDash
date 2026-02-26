import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

export default async function PerformanceInsights() {
  const revenue = await fetchRevenue();
  if (!revenue || revenue.length === 0) return null;

  const formatDollars = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const total = revenue.reduce((sum, item) => sum + item.revenue, 0);
  const average = Math.round(total / revenue.length);
  const bestMonth = revenue.reduce(
    (best, item) => (item.revenue > best.revenue ? item : best),
    revenue[0],
  );
  const latestMonth = revenue[revenue.length - 1];

  const insights = [
    {
      label: 'Top month',
      value: `${bestMonth.month}`,
      helper: `${formatDollars(bestMonth.revenue)}`,
    },
    {
      label: 'Avg. monthly',
      value: formatDollars(average),
      helper: 'Smooth, predictable run rate',
    },
    {
      label: 'Trailing 12M',
      value: formatDollars(total),
      helper: 'Aggregate revenue in period',
    },
    {
      label: 'Latest close',
      value: `${latestMonth.month}`,
      helper: formatDollars(latestMonth.revenue),
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className={`${lusitana.className} text-lg font-semibold`}>
          Performance highlights
        </h3>
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          Stable
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {insights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {item.label}
            </p>
            <p
              className={`${lusitana.className} text-lg font-semibold text-slate-900`}
            >
              {item.value}
            </p>
            <p className="text-xs text-slate-600">{item.helper}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
