import Nav from '@/app/ui/dashboard/nav';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TOP NAVBAR */}
      <header className="w-full border-b bg-white">
        <Nav />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
