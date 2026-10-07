import { UserPlus, UsersRound } from "lucide-react";

export default function Users() {
  const users = [
    ["Rahul Sharma", "Engineering", "Admin"],
    ["Priya Singh", "Design", "Manager"],
    ["Amit Kumar", "Sales", "Employee"],
    ["Neha Gupta", "IT", "Technician"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users & Roles</h1>
          <p className="mt-1 text-slate-500">
            Manage users and access permissions.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user[0]} className="border-t">
                <td className="p-4 font-medium">{user[0]}</td>
                <td className="p-4">{user[1]}</td>
                <td className="p-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                    {user[2]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}