import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const { action, email, password, provider } = body as {
    action?: 'signin' | 'signup' | 'oauth';
    email?: string;
    password?: string;
    provider?: string; // accept any string from client
  };

  const origin = new URL(req.url).origin;
  const redirectToHome = () => NextResponse.redirect(`${origin}/`);

  if (!action) {
    return new Response(JSON.stringify({ error: 'Missing action' }), { status: 400 });
  }

  if (action === 'signup') {
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing email or password' }), { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    // On successful signup, redirect user to homepage (if session established later, they can continue)
    return redirectToHome();
  }

  if (action === 'signin') {
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing email or password' }), { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 401 });
    }

    return redirectToHome();
  }

  if (action === 'oauth') {
    if (!provider) {
      return new Response(JSON.stringify({ error: 'Missing provider' }), { status: 400 });
    }

    // Acceptable client values and normalization to Supabase provider keys
    const normalized =
      provider.toLowerCase() === 'microsoft' ? 'azure' : provider.toLowerCase();

    const allowed = ['google', 'azure'] as const;
    if (!allowed.includes(normalized as any)) {
      return new Response(JSON.stringify({ error: 'Unsupported provider' }), { status: 400 });
    }

    // cast to any to satisfy the SignInWithOAuthCredentials provider type in this context
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: normalized as any,
      options: { redirectTo: `${origin}/` },
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    // Redirect browser to the provider's consent/login page
    if (data?.url) {
      return NextResponse.redirect(data.url);
    }

    return new Response(JSON.stringify({ error: 'Unable to start OAuth flow' }), { status: 500 });
  }

  return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
}