import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const currentDate = Date.now();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const readableDate = new Intl.DateTimeFormat("en-US", options).format(currentDate);

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

  useEffect(() => {
    setRecommendationCount(initialRecommendationCount);
  }, [initialRecommendationCount]);

  useEffect(() => {
    axios
      .get(`https://recommendation-eleven-ph.vercel.app/addRecommendation/${_id}`)
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
      .post("https://recommendation-eleven-ph.vercel.app/addRecommendation", newReQueries, {
        headers: { "Content-Type": "application/json" },
      })
      .then((postResponse) => {
        const data = postResponse.data;
        if (data.insertedId) {
          axios
            .put(`https://recommendation-eleven-ph.vercel.app/incrementRecommendation/${queryId}`)
            .then((putResponse) => {
              const response = putResponse.data;
              if (
                response.message === "Recommendation count update successful"
              ) {
                setRecommendation((prev) => [
                  ...prev,
                  { ...newReQueries, _id: data.insertedId },
                ]);
                setRecommendationCount((prevCount) => prevCount + 1);
              }
            })
            .then(() => {
              navigate("/allRecommendation");
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
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="grid">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{name}</h2>
            <img src={userImage} className="w-12 h-12 rounded-full" alt="" />
          </div>
        </div>
        <div className="hero bg-base-200 min-h-screen py-10 dark:bg-gray-800">
          <div className="w-11/12 mx-auto hero-content px-0 flex-col lg:flex-row-reverse">
            <img
              src={PhotoURL}
              className="max-w-lg w-full rounded-lg shadow-2xl"
              alt=""
            />
            <div>
              <h2 className="card-title text-xs sm:text-xl my-4 dark:text-white">
                {productBrand}
                <div className="badge badge-blue-500 text-xm">{readableDate}</div>
              </h2>
              <h1 className="card-title dark:text-white">
                {productName}
                <div className="badge badge-blue-500 dark:bg-blue-600">
                  {recommendationCount}
                </div>
              </h1>
              <p className="py-6 dark:text-gray-300">{BoycottingReasonDetails}</p>
              <div className="my-2 flex items-center gap-3 dark:text-gray-300">
                Time: {readableDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recommendation section */}
      <div className="bg-blue-200 p-4 sm:p-16 dark:bg-gray-800">
        <h2 className="sm:text-3xl font-semibold text-center py-5 dark:text-white">
          Add Recommendation
        </h2>
        <form onSubmit={handleRecommendQueries}>
          <div className="md:flex">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text dark:text-white">Recommendation Title</span>
              </label>
              <input
                type="text"
                name="recommendationTitle"
                placeholder="Recommended product Title"
                className="input input-bordered dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text dark:text-white">Recommendation Product Name</span>
              </label>
              <input
                type="text"
                name="recommendationProductName"
                placeholder="Recommendation Product Name"
                className="input input-bordered dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Recommendation Photo URL</span>
              </label>
              <input
                type="url"
                name="recommendationPhotoURL"
                placeholder="Recommended Product Image"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Recommendation Reason</span>
              </label>
              <input
                type="text"
                name="recommendationReason"
                placeholder="Recommendation reason"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-block bg-blue-500 my-3 dark:bg-blue-600"
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
              <p className="dark:text-gray-400">No recommendation found for this user.</p>
            )}
          </ul>
        </div>
        <div>
          <NavLink to={"/AllRecommendation"}>
            <h2 className="btn w-11/12 mx-auto text-center dark:bg-gray-700 dark:text-white">
              View All Recommendations
            </h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Details;
