import Nav from '@/app/ui/dashboard/nav';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TOP NAVBAR */}
      <header className="w-full bg-white">
        <Nav />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}
