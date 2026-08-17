import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Roots from "../Pages/Roots/Roots"; 
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import BookDetail from "../Pages/BookDetail/BookDetail";
import ListedBooks from "../Pages/ListedBooks/ListedBooks";
import PagesToRead from "../Pages/PagesToRead/PagesToRead";

// সরাসরি ডেটা ইমপোর্ট করুন (যদি json ফাইল public এ থাকে তবে /booksData.json রাখুন, অথবা src এর ভেতর রাখলে ../../booksData.json)
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Roots />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          loader: async () => {
            const res = await fetch(`${import.meta.env.BASE_URL}booksData.json`);
            return res.json();
          }, 
          element: <Home />,
        },
        {
          path: "book/:bookId",
          loader: async () => {
            const res = await fetch(`${import.meta.env.BASE_URL}booksData.json`);
            return res.json();
          },
          element: <BookDetail />,
        },
        {
          path: "listedBooks",
          loader: async () => {
            const res = await fetch(`${import.meta.env.BASE_URL}booksData.json`);
            return res.json();
          },
          element: <ListedBooks />,
        },
        {
          path: "pagesToRead",
          loader: async () => {
            const res = await fetch(`${import.meta.env.BASE_URL}booksData.json`);
            return res.json();
          },
          element: <PagesToRead />,
        },
      ],
    },
  ],
  {
    basename: "/B11-Boi-poka",
  }
);