import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const MtRecommendati = ({ item, items, setItems }) => {
  const {
    recommendationCount,
    setRecommendationCount,
  } = useContext(AuthContext);
  // console.log(items);


  // console.log(item)
  const { _id, recommendationPhotoURL } = item;

  // Initialize recommendation count
  useEffect(() => {
    setRecommendationCount(recommendationCount);
  }, [recommendationCount]);

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
          .delete(
            `https://recommendation-eleven-ph.vercel.app/myRecommendation/${_id}`)
          .then((response) => {
            console.log(response)
            const data = response.data;
            if (data) {
              const remaining = items.filter((equ) => equ._id !== _id);
              console.log(remaining);
              setItems(remaining);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              })
            }
          })
        .catch((error) => {
          console.error("Error deleting recommendation:", error);
        });
      }
    });
  };
  return (
    
    <tr
      key={item._id}
      className="hover:bg-gray-50"
    >
      <td className="border border-gray-300 p-2">
        <figure>
          <img
            src={recommendationPhotoURL}
            className="w-12 h-12 rounded-full"
            alt={item.ItemName}
          />
        </figure>
        </td>
        <td className="border border-gray-300 p-2">{item.recommenderName}</td>
        <td className="border border-gray-300 p-2">{item.readableDate}</td>
        <td className="border border-gray-300 p-2">{item.recommendationReason}</td>
        <td className="border border-gray-300 p-2">{item.reProductName}</td>
        <td className="border border-gray-300 p-2">
          <button
          onClick={() => handleDelete(_id)}
          className="btn bg-green-500"
        >
          X
        </button>
        </td>
    </tr>
  );
};

export default MtRecommendati;
