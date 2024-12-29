

import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import RecommendationMe from "../pages/RecommendationMe/recommendationMe";
import MyQueries from "../pages/MyQueries/MyQueries";
import MyRecommendation from "../pages/MyRecommendation/MyRecommendation";
import Forget from "../pages/Forget/Forget";
import AddQueries from "../pages/AddQueries/AddQueries";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import ListQuery from "../pages/ListQueries/ListQuery";
import Update from "../Update/Update";
import Details from "../pages/Details/Details";
import AllRecommendations from "../AllRecommendation/AllRecommendations";
import Queries from "../pages/Home/Queries/Queries";
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => axios.get("http://localhost:5000/addQuery").then((response) => response.data),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "details/:id",
        element: <Details></Details>,
        loader: async ({ params }) => {
          const response = await axios.get("http://localhost:5000/addQueries");
          const data = response.data;
          const singleData = data.find((d) => d._id == params.id);
          return singleData;
        },
      },
      {
        path: "/forget",
        element: <Forget></Forget>,
      },
      {
        path: "/queries",
        element: <Queries></Queries>,
        loader: () => axios.get("http://localhost:5000/addQueries").then((response) => response.data),
      },
      {
        path: "/recommendation_me",
        element: <RecommendationMe></RecommendationMe>,
        loader: () => axios.get("http://localhost:5000/addRecommendation").then((response) => response.data),
      },
      {
        path: "/myRecommendation/:email",
        element: <MyRecommendation></MyRecommendation>,
        loader: ({ params }) =>
          axios.get(`http://localhost:5000/myRecommendation/${params?.email}`).then((response) => response.data),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allRecommendation",
        element: <AllRecommendations></AllRecommendations>,
        loader: () => axios.get("http://localhost:5000/addRecommendation").then((response) => response.data),
      },
      {
        path: "/addQueries",
        element: (
          <PrivateRoutes>
            <AddQueries></AddQueries>
          </PrivateRoutes>
        ),
      },
      {
        path: "/queries/:email",
        element: (
          <PrivateRoutes>
            <MyQueries></MyQueries>
          </PrivateRoutes>
        ),
      },
      {
        path: "/update/:id",
        element: <Update></Update>,
        loader: ({ params }) =>
          axios.get(`http://localhost:5000/queries/${params.email}/${params.id}`).then((response) => response.data),
      },
      {
        path: "*",
        element: (
          <div className="w-1/2 font-bold mx-auto text-black text-3xl text-center bg-green-200 my-10 py-10 rounded-full opacity-90">
            Page not Found <br />
            <a href="/" className="text-blue-500 underline mt-4 block">
              Go back to Home
            </a>
          </div>
        ),
      },
    ],
  },
]);

export default router;

