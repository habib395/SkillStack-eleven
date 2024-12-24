import React, { useContext, useEffect, useState } from "react";
import { data, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import ListRecommendation from "../../ListRecommendation/ListRecommendation";

const Details = () => {

  // const { email } = useParams()
    const { user } = useContext(AuthContext)
    console.log(user)
    const [recommendation, setRecommendation] = useState([])

    
    // console.log(recommendation)

    const {
      _id,
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

    useEffect(() =>{
      fetch(`http://localhost:5000/addRecommendation/${_id}`)
      .then((res) => res.json())
      .then((data) => setRecommendation(data))
      .catch((error) => console.log("Error fetching recommendation:", error))
      }, [_id])

    const handleRecommendQueries = (e) =>{
        e.preventDefault()
        const form = e.target 
        const recommendationTitle = form.recommendationTitle.value
        const recommendationProductName = form.recommendationProductName.value 
        const recommendationPhotoURL = form.recommendationPhotoURL.value
        const recommendationReason = form.recommendationReason.value

        const queryId = _id
        const reQueryTitle = queryTitle
        const reProductName = productName
        const reUserEmail = userEmail
        const recommenderEmail = user.email
        const recommenderName = user.displayName
        const UserImage = user.userImage

        const reCurrentDate = Date.now()

        const newReQueries = { queryId, reQueryTitle, reProductName, reUserEmail,recommenderEmail, recommenderName,
          recommendationTitle, recommendationProductName, UserImage, recommendationPhotoURL, recommendationReason, reCurrentDate,
        }
        fetch('http://localhost:5000/addRecommendation', {
          method: 'POST',
          headers: { 'content-type' : 'application/json'},
          body: JSON.stringify(newReQueries)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        if(data.insertedId){
          Swal.fire({
              title: 'Success!',
              text: 'Equipment Added Successfully',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
      }
      event.target.reset()
    }



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
          {/* photo URL */}
          <div className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Recommendation Photo URL</span>
              </label>
              <label className="input-group">
                <input
                  type="url"
                  name="recommendationPhotoURL"
                  placeholder="Recommended Product Image"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
          {/* photo URL */}
          <div className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Recommendation Reason</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="recommendationReason"
                  placeholder="Recommendation reason"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
         
          {/* email and user Name */}
           {/* photo URL */}
           {/* <div className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Query Title</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="queryTitle"
                  defaultValue={queryTitle}
                  placeholder="queryTitle"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
           <div className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="productName"
                  defaultValue={productName}
                  placeholder="Product Name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>




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
          </div> */}

          <input
            type="submit"
            value="Add Recommendation"
            className="btn btn-block bg-green-500 my-3"
          />
        </form>

        {/* recommendation section  */}
        <div>
          <ul>
            {
              recommendation.length > 0 ? (
                recommendation.map((item) => (
                  <ListRecommendation key={item._id} recommendation={recommendation} setRecommendation={setRecommendation} item={item}></ListRecommendation>
                ))
              ) : (
                <p>No recommendation found for this user.</p>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
