'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState, useState as useClientState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import SupabaseAuthButtons from '../components/supabase-auth';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';

  // client local mode: 'signin' | 'signup'
  const [mode, setMode] = useClientState<'signin' | 'signup'>('signin');

  // wrapper returns a string (error message) so useActionState's state is a ReactNode-compatible value
  const actionWrapper = async (_state: string | undefined, payload?: any): Promise<string> => {
    try {
      await authenticate(payload as FormData);
      return ''; // no error
    } catch (e: any) {
      return e?.message ?? 'Authentication failed';
    }
  };

  // initialize state as empty string so the inferred state type is string | undefined
  const [errorMessage, formAction, isPending] = useActionState(
    actionWrapper,
    '',
  );

  // client-side check for sign-up confirm password (pre-submit)
  const onSubmitCapture = (e: React.FormEvent<HTMLFormElement>) => {
    if (mode === 'signup') {
      const form = e.currentTarget;
      const pwd = (form.querySelector<HTMLInputElement>('[name="password"]')!).value;
      const confirm = (form.querySelector<HTMLInputElement>('[name="confirmPassword"]')!).value;
      if (pwd !== confirm) {
        e.preventDefault();
        // set a client-side visible error by calling formAction with a synthetic payload
        // but simple approach: alert (minimal) or set a local error — keep minimal:
        // Prevent submission and show an inline message by returning early
        const el = form.querySelector('#confirm-error') as HTMLElement | null;
        if (el) el.textContent = 'Passwords do not match';
      } else {
        const el = form.querySelector('#confirm-error') as HTMLElement | null;
        if (el) el.textContent = '';
      }
    }
  };
 
  return (
    <form action={formAction} onSubmitCapture={onSubmitCapture} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="flex items-center justify-between">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            {mode === 'signin' ? 'Please log in to continue.' : 'Create your account'}
          </h1>
          <div className="text-sm">
            <button
              type="button"
              className={`mr-2 px-2 py-1 rounded ${mode === 'signin' ? 'font-semibold' : 'text-gray-500'}`}
              onClick={() => setMode('signin')}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`${mode === 'signup' ? 'font-semibold' : 'text-gray-500'} px-2 py-1 rounded`}
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <p id="confirm-error" className="mt-1 text-xs text-red-500" />
            </div>
          )}
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <input type="hidden" name="action" value={mode} />

        <Button className="mt-4 w-full" aria-disabled={isPending}>
          {mode === 'signin' ? 'Log in' : 'Create account'}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

        {/* Supabase OAuth buttons (requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) */}
        <SupabaseAuthButtons />
      </div>
    </form>
  );
}