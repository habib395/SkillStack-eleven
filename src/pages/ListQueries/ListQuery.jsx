import axios from "axios";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ListQuery = ({ item, queriesList, setQueriesList }) => {
  const { _id } = item;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://recommendation-eleven-ph.vercel.app/queries/${_id}`)
          .then((response) => { 
            const data = response.data;
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              // Update the queries list
              const remaining = queriesList.filter(equ => equ._id !== _id);
              setQueriesList(remaining);
            }
          })
          .catch((error) => {
            console.error("Error deleting query:", error);
          });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto py-5">
      <div key={item._id} className="card-side items-center bg-base-100 shadow-xl rounded-lg py-2 dark:bg-gray-800 dark:text-white">
        <figure>
          <img
            src={item.PhotoURL}
            alt={item.ItemName}
            className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-lg mx-auto"
          />
        </figure>
        <div>
          <h2 className="text-center text-xl font-semibold">{item.productName}</h2>
        </div>
        <div className="flex justify-between w-full p-4">
          <div className="card-actions justify-center">
            <div className="space-y-4 space-x-1">
              <NavLink to={`/details/${_id}`}>
                <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Details
                </button>
              </NavLink>
              <Link to={`/update/${_id}`}>
                <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListQuery;
