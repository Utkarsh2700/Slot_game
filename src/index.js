import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Poker from "./components/poker/Poker";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="slot" element={<App />} />
      <Route path="poker" element={<Poker />} />
      <Route path="fishing" element={<App />} />
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
  </React.StrictMode>
);
