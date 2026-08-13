import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Roots from "../Pages/Roots/Roots"; 
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Roots />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          loader: () => fetch('./booksData.json'), 
          element: <Home />,
        },
      ],
    },
  ],
  {
    basename: "/B11-Boi-poka",
  }
);