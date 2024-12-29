import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import ListRecommendation from "../../ListRecommendation/ListRecommendation";
import axios from "axios";

const Details = () => {
  const {
    user,
    recommendationCount,
    setRecommendationCount,
    recommendation,
    setRecommendation,
  } = useContext(AuthContext);
  

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
  const {
    _id,
    productBrand,
    userImage,
    name,
    PhotoURL,
    queryTitle,
    recommendationCount: initialRecommendationCount,
    userEmail,
    productName,
    BoycottingReasonDetails,
  } = useLoaderData();
  // console.log(_id)
  useEffect(() => {
    setRecommendationCount(initialRecommendationCount);
  }, [initialRecommendationCount]);


  useEffect(() => {
    axios
        .get(`http://localhost:5000/addRecommendation/${_id}`)
        .then((response) => setRecommendation(response.data))
        .catch((error) => console.error("Error fetching recommendation:", error));
}, [_id]);


  const handleRecommendQueries = (e) => {
    e.preventDefault();
    const form = e.target;
    const recommendationTitle = form.recommendationTitle.value;
    const recommendationProductName = form.recommendationProductName.value;
    const recommendationPhotoURL = form.recommendationPhotoURL.value;
    const recommendationReason = form.recommendationReason.value;

    const queryId = _id;
    const newReQueries = {
      queryId,
      reQueryTitle: queryTitle,
      reProductName: productName,
      reUserEmail: userEmail,
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      UserImage: user.userImage,
      recommendationTitle,
      recommendationProductName,
      recommendationPhotoURL,
      recommendationReason,
      readableDate,
    };

    axios
      .post("http://localhost:5000/addRecommendation", newReQueries, {
        headers: { "Content-Type": "application/json" },
      })
      .then((postResponse) => {
        const data = postResponse.data;
        if (data.insertedId) {
          // Recommendation successfully added, now increment recommendation count
          axios
            .put(`http://localhost:5000/incrementRecommendation/${queryId}`)
            .then((putResponse) => {
              const response = putResponse.data;
              if (
                response.message === "Recommendation count update successful"
              ) {
                // Update state after successful increment
                setRecommendation((prev) => [
                  ...prev,
                  { ...newReQueries, _id: data.insertedId },
                ]);
                setRecommendationCount((prevCount) => prevCount + 1);

                // Show success message
                Swal.fire({
                  title: "Success!",
                  text: "Recommendation Added Successfully",
                  icon: "success",
                  confirmButtonText: "Cool",
                });
              } else {
                console.error(
                  "Error updating recommendation count:",
                  response.message
                );
              }
            })
            .catch((error) => {
              console.error("Error updating recommendation count:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error adding recommendation:", error);
      });

    form.reset();
  };

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
              <h2 className="card-title text-xl my-4">
                {productBrand}
                <div className="badge badge-green-500 text-xm">
                  {readableDate}
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
                Time: {readableDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recommendation section */}
      <div className="bg-green-200 p-4 sm:p-16">
        <h2 className="sm:text-3xl font-semibold text-center py-5">
          Add Queries
        </h2>
        <form onSubmit={handleRecommendQueries}>
          <div className="md:flex">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Recommendation Title</span>
              </label>
              <input
                type="text"
                name="recommendationTitle"
                placeholder="Recommended product Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Recommendation Product Name</span>
              </label>
              <input
                type="text"
                name="recommendationProductName"
                placeholder="Recommendation Product Name"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Recommendation Photo URL</span>
              </label>
              <input
                type="url"
                name="recommendationPhotoURL"
                placeholder="Recommended Product Image"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Recommendation Reason</span>
              </label>
              <input
                type="text"
                name="recommendationReason"
                placeholder="Recommendation reason"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Add Recommendation"
            className="btn btn-block bg-green-500 my-3"
          />
        </form>
        {/* Recommendation List */}
        <div>
          <ul>
            {recommendation.length > 0 ? (
              recommendation.map((item) => (
                <ListRecommendation
                  key={item._id}
                  recommendation={recommendation}
                  setRecommendation={setRecommendation}
                  item={item}
                />
              ))
            ) : (
              <p>No recommendation found for this user.</p>
            )}
          </ul>
        </div>
        <div>
          <NavLink to={"/AllRecommendation"}>
            <h2 className="btn w-11/12 mx-auto text-center">
              All Recommendations
            </h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Details;
