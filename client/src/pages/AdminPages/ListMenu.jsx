import React from "react";
import { useGetMenusQuery, useAddNewIemToMenuMutation } from "../../slices/menusApiSlice";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { toast } from 'sonner'

const ListMenu = () => {
  const { data: menu, isLoading, error, refetch } = useGetMenusQuery();

  const [addNewIemToMenu,  {isLoading: Loading}] = useAddNewIemToMenuMutation();

const addNewItemToMenu = async ()=>{
    if(window.confirm('You would like to a new item to the menu list?')){
      try {
          await addNewIemToMenu();
          refetch();

      } catch (error) {
        toast.error(error);
      }
    }
} 


const deleteMenuItem = async () =>{
    
}

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Menu List</h1>

      <div className="mb-4 mr-3"> 
        <Button className="bg-black p-2 rounded" onClick={addNewItemToMenu}>
          Add A New Item To Menu
          <PencilIcon className="w-5 h-5 text-white" />
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {menu && menu.length === 0 && <div>No menus available.</div>}
      {menu && (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((menuItem) => (
              <tr key={menuItem.name}>
                <td className="py-2 px-4 border-b">{menuItem.name}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={menuItem.image}
                    alt={menuItem.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">{menuItem.description}</td>
                <td className="py-2 px-4 border-b">
                  £{menuItem.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <div className="flex space-x-2">
                  <Link to={`/admin/menu/${menuItem._id}/edit`}>
                      <Button className="bg-orange-500 p-2 rounded">
                        <PencilIcon className="w-5 h-5 text-white" /> 
                      </Button>
                    </Link> 
                    <Button className="bg-red-500 p-2 rounded hover:bg-red-600" 
                    onClick={deleteMenuItem}>
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

export default ListMenu;
