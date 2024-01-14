import { Link, useParams } from "react-router-dom";
import {
  useAdminUpdateUserMutation,
  useGetOneUserQuery,
} from "../../slices/usersApiSlice";

import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditUser = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  //console.log("userId:", userId);

  const { data: user, isLoading, error, refetch } = useGetOneUserQuery(userId);

  const [adminUpdateUser, { isLoading: loading }] = useAdminUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handelUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await adminUpdateUser({
        _id: userId,
        name,
        email,
        phoneNumber,
        isAdmin,
      });
      toast.success("user updated");
      refetch();
      navigate("/admin/listusers");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <Link
        to="/admin/listusers"
        className="text-white bg-black py-2 px-4 rounded mt-4"
      >
        Back
      </Link>

      <FormContainer buttonText="Update User" onSubmit={handelUpdateUser}>
        <h1 className="text-2xl font-bold mb-4 text-orange-500">Edit Menu</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {user && user.length === 0 && <div>No users found</div>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold">
            Phone Number
          </label>
          <input
            type="number"
            id="description"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isAdmin" className="block text-sm font-semibold">
            Is Admin
          </label>
          <input
            type="text"
            id="isAdmin"
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default EditUser;
