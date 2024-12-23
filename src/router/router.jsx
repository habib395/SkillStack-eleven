import MainLayout from "../MainLayout/MainLayout";

import Home from "../pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Queries from "../pages/Home/Queries/Queries";
import RecommendationMe from "../pages/RecommendationMe/recommendationMe";
import MyQueries from "../pages/MyQueries/MyQueries";
import MyRecommendation from "../pages/MyRecommendation/MyRecommendation";
import Forget from "../pages/Forget/Forget";
import AddQueries from "../pages/AddQueries/AddQueries";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import ListQuery from "../pages/ListQueries/ListQuery";
import Update from "../Update/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/forget",
        element: <Forget></Forget>,
      },
      {
        path: "/queries",
        element: <Queries></Queries>,
      },
      {
        path: "/recommendation_me",
        element: <RecommendationMe></RecommendationMe>,
      },
      {
        path: "/myRecommendation",
        element: <MyRecommendation></MyRecommendation>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addQueries",
        element: 
          <PrivateRoutes>
            <AddQueries></AddQueries>
          </PrivateRoutes>
      },
      {
        path: "/queries/:email",
        element: 
          <PrivateRoutes>
            <MyQueries></MyQueries>
          </PrivateRoutes>
      },
     {
      path:"/update/:id",
      element:<Update></Update>,
      loader: ({ params }) =>
        fetch(`http://localhost:5000/queries/${params.email}/${params.id}`),
     },
    ],
  },
]);

export default router;
