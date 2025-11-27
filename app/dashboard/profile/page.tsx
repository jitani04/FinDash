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
    <div className="max-w-3xl mx-auto space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {/* PROFILE CARD */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="h-20 w-20 overflow-hidden rounded-full border flex items-center justify-center bg-blue-600 text-white">
            {user?.image ? (
              <Image
                src={user.image}
                alt="Profile image"
                width={80}
                height={80}
                className="h-20 w-20 object-cover"
              />
            ) : (
              <span className="text-xl font-semibold">{initials}</span>
            )}
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.name ?? "Unnamed User"}
            </h2>
            <p className="text-gray-600">{user?.email ?? "No email available"}</p>
          </div>
        </div>
      </div>

      {/* ACCOUNT DETAILS */}
      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Account Details</h3>

        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            defaultValue={user?.name ?? ""}
            className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            disabled
            defaultValue={user?.email ?? ""}
            className="w-full rounded-md border bg-gray-100 px-3 py-2 text-sm shadow-sm"
          />
          <p className="text-xs text-gray-500">Email cannot be changed.</p>
        </div>

        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
          Update Profile
        </button>
      </div>
    </div>
  );
}
