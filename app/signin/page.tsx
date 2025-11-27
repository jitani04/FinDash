import LoginForm from '@/app/ui/login-form';

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to FinDash',
};

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
