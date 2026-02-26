import { auth } from "@/auth";
// remove ui-avatars fallback, we won’t need it
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* HEADER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 text-xl font-semibold text-slate-800">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile image"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            {/* User Info */}
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600">
                My profile
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-slate-900">
                {user?.name ?? 'Unnamed User'}
              </h1>
              <p className="text-slate-600">
                {user?.email ?? 'No email available'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Account status: Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ACCOUNT DETAILS */}
        <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Account details
          </h3>
          <p className="text-sm text-gray-600">
            Keep your name up to date. Email is managed by your identity
            provider.
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                defaultValue={user?.name ?? ''}
                className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                disabled
                defaultValue={user?.email ?? ''}
                className="w-full rounded-md border bg-gray-100 px-3 py-2 text-sm shadow-sm"
              />
              <p className="text-xs text-gray-500">Email cannot be changed.</p>
            </div>

            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Update profile
            </button>
          </div>
        </div>

        {/* PREFERENCES (temporarily disabled) */}
      </div>
    </div>
  );
}
