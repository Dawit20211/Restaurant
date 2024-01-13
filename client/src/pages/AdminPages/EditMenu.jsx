import { Link, useParams } from "react-router-dom";
import {
  useGetMenuQuery,
  useUpdateMenuMutation,
} from "../../slices/menusApiSlice";
import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditMenu = () => {
  const { id: menuId } = useParams();
  // console.log("menuId:", menuId);

  const { data: menu, isLoading, error } = useGetMenuQuery(menuId);

  const [updateMenu, { isLoading: loading }] = useUpdateMenuMutation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [numReviews, setNumReviews] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [rating, setRating] = useState("");

    useEffect(() => {
      if (menu) {
        setName(menu.name);
        setImage(menu.image);
        setDescription(menu.description);
        setNumReviews(menu.numReviews);
        setIsAvailable(menu.isAvailable);
        setRating(menu.rating);
      }
    }, [menu]);

  const handleUpdateMenu = async (e) => {
    console.log("name:", name);
    console.log("image:", image);
    console.log("description:", description);
    console.log("numReviews:", numReviews);
    console.log("isAvailable:", isAvailable);
    console.log("rating:", rating);

    e.preventDefault();
    try {
      await updateMenu({
        _id: menuId,
        name,
        numReviews,
        image,
        rating,
        description,
        isAvailable,
      });
      toast.success("menu updated");
      navigate("/admin/listmenu");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <Link
        to="/admin/listmenu"
        className="text-white bg-black py-2 px-4 rounded mt-4"
      >
        Back
      </Link>

      <FormContainer buttonText="Update Menu" onSubmit={handleUpdateMenu}>
        <h1 className="text-2xl font-bold mb-4 text-orange-500">Edit Menu</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {menu && menu.length === 0 && <div>No menus available.</div>}

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
          <label htmlFor="image" className="block text-sm font-semibold">
            Image
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold">
            NumReviews
          </label>
          <input
            type="text"
            id="numReviews"
            value={numReviews}
            onChange={(e) => setNumReviews(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isAvailable" className="block text-sm font-semibold">
            Is Available
          </label>
          <input
            type="text"
            id="isAvailable"
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-semibold">
            Rating
          </label>
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default EditMenu;
