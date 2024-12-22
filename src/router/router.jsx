

import MainLayout from '../MainLayout/MainLayout';

import Home from '../pages/Home/Home';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Register from '../Register/Register';
import Login from '../Login/Login';
import Queries from '../pages/Home/Queries/Queries';
import RecommendationMe from '../pages/RecommendationMe/recommendationMe';
import MyQueries from '../pages/MyQueries/MyQueries';
import MyRecommendation from '../pages/MyRecommendation/MyRecommendation';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: '/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:"/queries",
          element:<Queries></Queries>
        },
        {
          path:'/recommendation_me',
          element:<RecommendationMe></RecommendationMe>
        },
        {
          path:'/myQueries',
          element:<MyQueries></MyQueries>
        },
        {
          path:"/myRecommendation",
          element: <MyRecommendation></MyRecommendation>
        },
        {
          path:'/register',
          element:<Register></Register>
        }
      ]
    },
  ]);

  export default router