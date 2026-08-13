import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Roots from "../Pages/Roots/Roots"; 
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    errorElement: <ErrorPage />,
    HydrateFallback: () => (
      <div className="flex justify-center items-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => fetch('/booksData.json'),
        Component: Home,
      },
    ],
  },
]);