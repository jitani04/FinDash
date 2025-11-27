'use client';

import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // create browser supabase client in a client component
  const [supabaseClient] = useState(() => createClientComponentClient());

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}
