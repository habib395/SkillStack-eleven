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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/addQuery"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "details/:id",
        element: <Details></Details>,
        loader: async ({ params }) =>{
          const res = await fetch("http://localhost:5000/addQueries")
          const data = await res.json()
          const singleData = data.find((d) => d._id == params.id)
          return singleData
        },
      },
      {
        path: "/forget",
        element: <Forget></Forget>,
      },
      {
        path: "/queries",
        element: <Queries></Queries>,
        loader: () => fetch("http://localhost:5000/addQueries"),
      },
      {
        path: "/recommendation_me",
        element: <RecommendationMe></RecommendationMe>,
      },
      {
        path: "/myRecommendation/:email",
        element: <MyRecommendation></MyRecommendation>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/myRecommendation/${params?.email}`),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allRecommendation",
        element: <AllRecommendations></AllRecommendations>,
        loader: () => fetch("http://localhost:5000/addRecommendation"),
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
          fetch(`http://localhost:5000/queries/${params.email}/${params.id}`),
      },
    ],
  },
]);

export default router;
