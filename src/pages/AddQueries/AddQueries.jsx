import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const AddQueries = () => {
  const { user } = useContext(AuthContext);
  // console.log(user)

  const handleAddQueries = (e) => {
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
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const readableDate = new Intl.DateTimeFormat("en-US", options).format(
      currentDate
    );
    // const readableDate  = Date.now(currentDate).toLocaleString()
    // console.log(readableDate)
    const recommendationCount = 0;

    // console.log(productName, productBrand, PhotoURL, queryTitle, BoycottingReasonDetails)
    const newQueries = {
      productName,
      productBrand,
      PhotoURL,
      queryTitle,
      BoycottingReasonDetails,
      userEmail,
      name,
      userImage,
      readableDate,
      recommendationCount,
    };
    // console.log(newQueries);
    axios.post("https://recommendation-eleven-ph.vercel.app/addQueries", newQueries, {
      headers: {
          "Content-Type": "application/json",
      },
  })
  .then((response) => {
      const data = response.data;
      console.log(data);
      if (data.insertedId) {
          Swal.fire({
              title: "Success!",
              text: "Equipment Added Successfully",
              icon: "success",
              confirmButtonText: "Cool",
          });
      }
  })
  .catch((error) => {
      console.error("Error adding equipment:", error);
  });
  
  event.target.reset();

  };
  return (
    <div className="bg-blue-200 p-4 sm:p-16 mt-10">
      <h2 className="sm:text-3xl font-semibold text-center py-5">
        Add Queries
      </h2>
      <form onSubmit={handleAddQueries}>
        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Product Name </span>
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Product Brand</span>
            </label>
            <input
              type="text"
              name="productBrand"
              placeholder="Product Brand"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        {/* photo URL */}
        <div className="">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <label className="input-group">
              <input
                type="url"
                name="PhotoURL"
                placeholder="Photo"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* photo URL */}
        <div className="">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Query Title</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="queryTitle"
                placeholder="Query Title"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* photo URL */}
        <div className="">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Boycotting Reason Details</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="BoycottingReasonDetails"
                placeholder="ex: Is there any Better product that gives me the same quality?"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* email and user Name */}
        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <label className="input-group">
              <input
                type="email"
                name="UserEmail"
                defaultValue={user && user.email}
                placeholder="User Email"
                className="input input-bordered w-full"
                disabled
              />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="UserName"
                defaultValue={user && user.displayName}
                placeholder="User Name"
                className="input input-bordered w-full sm:ml-2"
                disabled 
              />
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-block bg-blue-500 my-3"
        />
      </form>
    </div>
  );
};

export default AddQueries;
