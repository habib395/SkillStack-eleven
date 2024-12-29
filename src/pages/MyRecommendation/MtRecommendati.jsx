import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const MtRecommendati = ({ item }) => {
  const {
    recommendationCount,
    setRecommendationCount,
    recommendation,
    setRecommendation,
  } = useContext(AuthContext);
  // console.log(recommendationCount);

  // console.log(item)
  const { _id } = item;

  // console.log(_id)

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
          .delete(`http://localhost:5000/myRecommendation/${_id}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error deleting recommendation:", error);
          });
      }
    });
  };
  return (
    <div
      key={item._id}
      className="grid gap-2 items-center w-10/12 mx-auto py-5"
    >
      <div className="border-2 rounded-lg p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <figure>
              <img
                src={item.UserImage}
                className="w-12 h-12 rounded-full"
                alt={item.ItemName}
              />
            </figure>
            <h2>{item.recommenderName}</h2>
            <p>{item.reCurrentDate}</p>
          </div>
          <div>
            <button
              onClick={() => handleDelete(_id)}
              className="btn bg-green-500"
            >
              X
            </button>
          </div>
        </div>
        <div>
          <p className="text-center p-2">{item.recommendationReason}</p>
          <p className="p-2">{item.reProductName}</p>
        </div>
      </div>
    </div>
  );
};

export default MtRecommendati;
