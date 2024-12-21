

import MainLayout from '../MainLayout/MainLayout';

import Home from '../pages/Home/Home';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Register from '../Register/Register';
import Login from '../Login/Login';

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
          path:'/register',
          element:<Register></Register>
        }
      ]
    },
  ]);

  export default router