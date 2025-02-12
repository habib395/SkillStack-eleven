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
import axios from "axios";
import Category from "./../pages/Home/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          axios
            .get("https://recommendation-eleven-ph.vercel.app/addQuery")
            .then((response) => response.data),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "details/:id",
        element: <Details></Details>,
        loader: async ({ params }) => {
          const response = await axios.get(
            "https://recommendation-eleven-ph.vercel.app/addQueries"
          );
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
        loader: () =>
          axios
            .get("https://recommendation-eleven-ph.vercel.app/addQueries")
            .then((response) => response.data),
      },
      {
        path: "/recommendation_me",
        element: <RecommendationMe></RecommendationMe>,
        loader: () =>
          axios
            .get(
              "https://recommendation-eleven-ph.vercel.app/addRecommendation",
              { withCredentials: true }
            )
            .then((response) => response.data),
      },
      {
        path: "/myRecommendation/:email",
        element: <MyRecommendation></MyRecommendation>,
        loader: ({ params }) =>
          axios
            .get(
              `https://recommendation-eleven-ph.vercel.app/myRecommendation/${params?.email}`,
              { withCredentials: true }
            )
            .then((response) => response.data),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allRecommendation",
        element: <AllRecommendations></AllRecommendations>,
        loader: () =>
          axios
            .get(
              "https://recommendation-eleven-ph.vercel.app/addRecommendation"
            )
            .then((response) => response.data),
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
          axios
            .get(
              `https://recommendation-eleven-ph.vercel.app/queries/${params.email}/${params.id}`
            )
            .then((response) => response.data),
      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: "*",
        element: (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto text-center">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                We couldn't find the page you were looking for. Please check the
                URL or return to the home page.
              </p>
              <a
                href="/"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
              >
                Go back to Home
              </a>
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default router;
