"use client";
import React from "react";
import { supabase } from "../../lib/supabaseClient";
import type { Provider } from "@supabase/auth-js";

function IconGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 11.5c3.9 0 6.6 1.7 8.1 3.1l6-6C34.4 4.6 29.7 2.5 24 2.5 14.9 2.5 7.5 7.7 4 15.1l7.1 5.5C12.9 15 17.9 11.5 24 11.5z"/>
      <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.6c-.5 2.6-2.3 5-5.9 6.7l9 7c5.3-4.9 7.8-12.1 7.8-17.2z"/>
      <path fill="#4A90E2" d="M11.1 29.6A13.9 13.9 0 0 1 10 24.5c0-1.8.3-3.5.9-5.1L3.8 13.9A24 24 0 0 0 0 24.5c0 3.9.9 7.6 2.6 10.9l8.5-5.8z"/>
      <path fill="#FBBC05" d="M24 46.5c6.6 0 12.1-2.2 16.1-6l-9-7c-2.5 1.6-5.6 2.6-7.9 2.6-6.1 0-11.1-3.5-13.4-8.5l-8.5 5.8C7.5 40.3 14.9 46.5 24 46.5z"/>
    </svg>
  );
}

function IconMicrosoft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="2" width="9.5" height="9.5" fill="#F35325" />
      <rect x="12.5" y="2" width="9.5" height="9.5" fill="#81BC06" />
      <rect x="2" y="12.5" width="9.5" height="9.5" fill="#05A6F0" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFBA08" />
    </svg>
  );
}

function IconApple() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M16.365 1.43c-.8.02-2.08.56-2.74 1.24-.6.61-1.13 1.58-1.02 2.5 1.08.04 2.29-.7 2.95-1.37.68-.7 1.17-1.49 0-2.37zM12 4.5c-2-2.06-5.28-2.05-7.27-.3-1.55 1.26-2.58 3.9-1.8 6.2.95 2.89 3.45 5.36 6.46 5.36.44 0 .89-.06 1.33-.18 1.05-.29 2.11-.29 3.15 0 .44.12.89.18 1.33.18 3.02 0 5.52-2.47 6.47-5.36.77-2.3-.25-4.94-1.8-6.2C17.28 2.44 14 2.44 12 4.5z"/>
    </svg>
  );
}

export default function SupabaseAuth(): React.ReactElement {
  async function handleOAuth(provider: "google" | "microsoft" | "apple") {
    try {
      const providerMap: Record<"google" | "microsoft" | "apple", Provider> = {
        google: "google",
        microsoft: "azure",
        apple: "apple",
      };
      const supabaseProvider = providerMap[provider];
      await supabase.auth.signInWithOAuth({ provider: supabaseProvider });
      // Supabase will redirect to the configured callback
    } catch (err) {
      // minimal client-side error report
      console.error("OAuth sign-in error:", err);
      alert("Sign-in failed. Check console for details.");
    }
  }

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
    color: "#111827",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "grid", gap: 8, width: 320 }}>
      <button
        type="button"
        onClick={() => handleOAuth("google")}
        style={buttonStyle}
        aria-label="Sign in with Google"
      >
        <IconGoogle />
        <span style={{ flex: 1, textAlign: "center" }}>Continue with Google</span>
      </button>

      <button
        type="button"
        onClick={() => handleOAuth("microsoft")}
        style={buttonStyle}
        aria-label="Sign in with Microsoft"
      >
        <IconMicrosoft />
        <span style={{ flex: 1, textAlign: "center" }}>Continue with Microsoft</span>
      </button>

      <button
        type="button"
        onClick={() => handleOAuth("apple")}
        style={buttonStyle}
        aria-label="Sign in with Apple"
      >
        <IconApple />
        <span style={{ flex: 1, textAlign: "center" }}>Continue with Apple</span>
      </button>
    </div>
  );
}
