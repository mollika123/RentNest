import UsersTable from "@/components/UsersTable";


export default async function AllUsersPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      cache: "no-store",
    }
  );

  const users = await res.json();

  // action function can be passed via client wrapper (see below)

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Users</h1>

      <UsersTable users={users} />
    </div>
  );
}