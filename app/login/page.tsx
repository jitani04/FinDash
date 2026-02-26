import FinDashLogo from '@/app/ui/findash-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.08),transparent_30%)]" />
      <div className="relative mx-auto flex w-full max-w-[480px] flex-col space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-slate-900 ring-1 ring-slate-200">
          <div className="w-28 text-slate-900 md:w-32">
            <FinDashLogo />
          </div>
          <p className="text-sm text-slate-600">Secure workspace login</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
