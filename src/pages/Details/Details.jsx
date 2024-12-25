import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import ListRecommendation from "../../ListRecommendation/ListRecommendation";

const Details = () => {
  const { user, recommendationCount, setRecommendationCount } = useContext(AuthContext);
  const [recommendation, setRecommendation] = useState([]);
  // const [recommendationCount, setRecommendationCount] = useState(0);
  // console.log(recommendationCount)

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
    currentDate,
    BoycottingReasonDetails,
  } = useLoaderData();
  // console.log(_id)

  // Initialize recommendation count
  useEffect(() => {
    setRecommendationCount(initialRecommendationCount);
  }, [initialRecommendationCount]);

  // Fetch recommendations
  useEffect(() => {
    fetch(`http://localhost:5000/addRecommendation/${_id}`)
      .then((res) => res.json())
      .then((data) => setRecommendation(data))
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
      reCurrentDate: Date.now(),
    };

    fetch("http://localhost:5000/addRecommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReQueries),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          fetch(`http://localhost:5000/incrementRecommendation/${queryId}`, {
            method: "PUT",
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.message === "Recommendation count update successful") {
                setRecommendation((prev) => [
                  ...prev,
                  { ...newReQueries, _id: data.insertedId },
                ]);
                setRecommendationCount((prevCount) => prevCount + 1); 
                Swal.fire({
                  title: "Success!",
                  text: "Recommendation Added Successfully",
                  icon: "success",
                  confirmButtonText: "Cool",
                });
              } else {
                console.error("Error updating recommendation count:", response.message);
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
              <h2 className="card-title text-3xl my-4">
                {productBrand}
                <div className="badge badge-green-500 text-base">
                  {currentDate}
                </div>
              </h2>
              <h1 className="card-title">
                {productName}
                <div className="badge badge-green-500">{recommendationCount}</div>
              </h1>
              <p className="py-6">{BoycottingReasonDetails}</p>
              <div className="my-2 flex items-center gap-3">Time: {currentDate}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Recommendation section */}
      <div className="bg-green-200 p-4 sm:p-16">
        <h2 className="sm:text-3xl font-semibold text-center py-5">Add Queries</h2>
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
        <NavLink to={'/AllRecommendation'}>
        <h2 className="btn w-11/12 mx-auto text-center">All Recommendations</h2>
        </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Details;
