export default function LandingAnimation() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
      <div className="absolute -left-10 top-4 h-36 w-36 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-0 top-12 h-28 w-28 rounded-full bg-cyan-200/50 blur-3xl" />

      <div className="relative grid gap-4 lg:grid-cols-2">
        {/* Column 1 */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm animate-pulse-up">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              Collections
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                On track
              </span>
            </div>
            <div className="mt-4 h-10 overflow-hidden rounded-xl bg-white">
              <div className="shimmer-line h-10 w-3/4 rounded-xl bg-blue-500/80" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-600">
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <p className="font-semibold text-slate-800">$12.4k</p>
                <p>Settled</p>
              </div>
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <p className="font-semibold text-slate-800">$3.1k</p>
                <p>Pending</p>
              </div>
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <p className="font-semibold text-emerald-700">+8.2%</p>
                <p>vs last</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              Account health
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                Live sync
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[['Echo Logistics', '$2.1k'], ['Northwind', '$980'], ['Silk Road', '$1.4k']].map(
                ([name, amount], idx) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 shadow-sm"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-9 w-9 rounded-full bg-blue-100" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{name}</p>
                        <p className="text-xs text-slate-600">Status check</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{amount}</p>
                      <p className="text-[11px] text-emerald-600">Cleared</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-50 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              Revenue pulse
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                Minimal mode
              </span>
            </div>
            <div className="mt-6 grid grid-cols-6 items-end gap-2">
              {[60, 35, 85, 55, 95, 70].map((h, idx) => (
                <div
                  key={idx}
                  className="bar-animate rounded-md bg-blue-500/80"
                  style={{ height: `${h}%`, animationDelay: `${idx * 0.3}s` }}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <p className="text-[11px] uppercase text-slate-500">MRR</p>
                <p className="text-sm font-semibold text-slate-900">$45.2k</p>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <p className="text-[11px] uppercase text-slate-500">NDR</p>
                <p className="text-sm font-semibold text-emerald-700">118%</p>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <p className="text-[11px] uppercase text-slate-500">Churn</p>
                <p className="text-sm font-semibold text-amber-700">2.1%</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              Timeline
              <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] text-blue-700">
                Smooth
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {['Draft invoice', 'Review & send', 'Payment received'].map((step, idx) => (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full bg-blue-500"
                    style={{ opacity: 1 - idx * 0.2 }}
                  />
                  <div className="h-[6px] flex-1 rounded-full bg-slate-100">
                    <div
                      className="h-[6px] rounded-full bg-blue-500/80"
                      style={{ width: `${70 + idx * 10}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
