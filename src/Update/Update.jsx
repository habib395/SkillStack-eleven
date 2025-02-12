import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Update = () => {
  const { user } = useContext(AuthContext);
  const item = useLoaderData();

  const {
    _id,
    productName,
    productBrand,
    PhotoURL,
    queryTitle,
    BoycottingReasonDetails,
    userEmail,
    name,
    userImage,
    currentDate,
    recommendationCount,
  } = item;

  const handleUpdateQueries = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productBrand = form.productBrand.value;
    const PhotoURL = form.PhotoURL.value;
    const queryTitle = form.queryTitle.value;
    const BoycottingReasonDetails = form.BoycottingReasonDetails.value;
    const userEmail = user.email;
    const name = user.displayName;
    const userImage = user.photoURL;
    const currentDate = Date.now();
    const recommendationCount = 0;

    const newQueries = {
      productName,
      productBrand,
      PhotoURL,
      queryTitle,
      BoycottingReasonDetails,
      userEmail,
      name,
      userImage,
      currentDate,
      recommendationCount,
    };

    axios
      .put(`https://recommendation-eleven-ph.vercel.app/queries/${_id}`, newQueries, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Queries Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating queries:", error);
      });

    event.target.reset();
  };

  return (
    <div className="bg-blue-200 p-4 sm:p-16 dark:bg-gray-800 dark:text-white">
      <h2 className="sm:text-3xl font-semibold text-center py-5">
        Update Queries
      </h2>
      <form onSubmit={handleUpdateQueries}>
        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text dark:text-gray-200">Product Name</span>
            </label>
            <input
              type="text"
              name="productName"
              defaultValue={productName}
              placeholder="Product Name"
              className="input input-bordered dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text dark:text-gray-200">Product Brand</span>
            </label>
            <input
              type="text"
              name="productBrand"
              defaultValue={productBrand}
              placeholder="Product Brand"
              className="input input-bordered dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text dark:text-gray-200">Photo URL</span>
          </label>
          <input
            type="url"
            name="PhotoURL"
            defaultValue={PhotoURL}
            placeholder="Photo"
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text dark:text-gray-200">Query Title</span>
          </label>
          <input
            type="text"
            name="queryTitle"
            defaultValue={queryTitle}
            placeholder="Query Title"
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text dark:text-gray-200">Boycotting Reason Details</span>
          </label>
          <input
            type="text"
            name="BoycottingReasonDetails"
            defaultValue={BoycottingReasonDetails}
            placeholder="ex: Is there any Better product that gives me the same quality?"
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text dark:text-gray-200">User Email</span>
            </label>
            <input
              type="email"
              name="UserEmail"
              defaultValue={user && user.email}
              placeholder="User Email"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              disabled
            />
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text dark:text-gray-200">User Name</span>
            </label>
            <input
              type="text"
              name="UserName"
              defaultValue={user && user.displayName}
              placeholder="User Name"
              className="input input-bordered w-full sm:ml-2 dark:bg-gray-700 dark:text-white"
              disabled
            />
          </div>
        </div>

        <input
          type="submit"
          value="Submit"
          className="btn btn-block bg-blue-500 my-3 dark:bg-blue-700"
        />
      </form>
    </div>
  );
};

export default Update;
