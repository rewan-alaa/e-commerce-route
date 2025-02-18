import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Error from "./Components/Error/Error";
import AuthContextProvider from "./Context/AuthContext";
import Guard from "./Components/Guard/Guard";
import AuthGuard from "./Components/AuthGard/AuthGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext/CartContext";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import Order from "./Components/Order/Order";
import AllOrders from "./Components/AllOrders/AllOrders";

const queryClient = new QueryClient();
const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Guard>
            <Home />
          </Guard>
        ),
      },
      {
        path: "cart",
        element: (
          <Guard>
            <Cart />
          </Guard>
        ),
      },
      {
        path: "products",
        element: (
          <Guard>
            <Products />
          </Guard>
        ),
      },
      {
        path: "categories",
        element: (
          <Guard>
            <Categories />
          </Guard>
        ),
      },
      {
        path: "brands",
        element: (
          <Guard>
            <Brands />
          </Guard>
        ),
      },
      {
        path: "allorders",
        element: (
          <Guard>
            <AllOrders/>
          </Guard>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Guard>
            <ProductDetails />
          </Guard>
        ),
      },
      {
        path: "order",
        element: (
          <Guard>
            <Order/>
          </Guard>
        ),
      },
      {
        path: "login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "register",
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
            <Toaster position="bottom-center" reverseOrder={false} />
          </QueryClientProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}
