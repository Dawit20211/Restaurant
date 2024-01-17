import {
  useDeleteUsersMutation,
  useGetAllUsersQuery,
} from "../../slices/usersApiSlice";
import Button from "../../components/Button";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const ListAllUsers = () => {
  const { data: users, isLoading, error, refetch} = useGetAllUsersQuery();
  console.log(users);

  const [deleteUsers, { isLoading: isDeleting }] = useDeleteUsersMutation();

  const addNewUser = async () => {};

  const deleteUser = async (id) => { 
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUsers(id);
      refetch();
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Users</h1>

      <div className="mb-4 mr-3">
        <Button className="bg-black p-2 rounded" onClick={addNewUser}>
          Add A New User
          <PencilIcon className="w-5 h-5 text-white" />
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {users && users.length === 0 && <div>No users available.</div>}
      {users && (
        <table className="min-w-full border text-left">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Is Admin</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b ">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={user.isAdmin === true}
                    readOnly
                    className="m-2"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  {dayjs(user.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="py-2 px-4 border-b">
                  {dayjs(user.updatedAt).format("DD/MM/YY")}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                <div className="flex space-x-2">
                  <Link to={`/admin/users/${user._id}/edit`}>
                    <Button className="bg-orange-500 p-2 rounded">
                      <PencilIcon className="w-5 h-5 text-white" />
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-500 p-2 rounded hover:bg-red-600"
                    onClick={() => deleteUser(user._id)} 
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </Button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListAllUsers;
