import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Details = () => {

    const { user } = useContext(AuthContext)

    const handleAddQueries = (e) =>{
        e.preventDefault()
        const form = e.target 
        const productName = form.productName.value 
        const productBrand = form.productBrand.value
        const PhotoURL = form.PhotoURL.value
        const queryTitle = form.queryTitle.value
        const BoycottingReasonDetails = form.BoycottingReasonDetails.value
        const userEmail = user.email
        const name = user.displayName
        const userImage = user.photoURL
        const currentDate = Date.now()
        const recommendationCount = 0

        // console.log(productName, productBrand, PhotoURL, queryTitle, BoycottingReasonDetails)
        const newQueries = {productName, productBrand, PhotoURL, queryTitle, BoycottingReasonDetails, userEmail, name, userImage, currentDate, recommendationCount}
        console.log(newQueries)
    }
  const {
    productBrand,
    userImage,
    name,
    PhotoURL,
    queryTitle,
    recommendationCount,
    userEmail,
    productName,
    currentDate,
    BoycottingReasonDetails,
  } = useLoaderData();
  //   console.log(userImage);

  return (
    <div>
      <div className="grid">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{name}</h2>
            <img src={userImage} className="w-12 h-12 rounded-full" alt="" />
          </div>
        </div>
        <div className="hero bg-base-200 min-h-screen py-10">
          <div className="w-11/12 mx-auto hero-content px-0 flex-col lg:flex-row-reverse">
            <img
              src={PhotoURL}
              className="max-w-lg w-full rounded-lg shadow-2xl"
              alt=""
            />
            <div>
              <h2 className="hidden md:block text-3xl font-bold text-center text-green-500 opacity-35 bg-emerald-100 p-10 rounded-full">
                Detail Information
              </h2>
            </div>
            <div>
              <h2 className="card-title text-3xl my-4">
                {productBrand}
                <div className="badge badge-green-500 text-base">
                  {currentDate}
                  {/* <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar> */}
                </div>
              </h2>
              <h1 className="card-title">
                {productName}
                <div className="badge badge-green-500">
                  {recommendationCount}
                </div>
              </h1>
              <p className="py-6">{BoycottingReasonDetails}</p>
              <div className="my-2 flex items-center gap-3">
                Time: {currentDate}
              </div>
              {/* <p className="badge badge-green-500">
                    STOCK : {StockStatus}
                    </p> */}
            </div>
            <br />
          </div>
        </div>
      </div>
      {/* Recommendation section */}
      <div className="bg-green-200 p-4 sm:p-16">
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
            value="Add Query"
            className="btn btn-block bg-green-500 my-3"
          />
        </form>
      </div>
    </div>
  );
};

export default Details;
