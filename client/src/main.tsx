import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./components/AllPosts.tsx";
import { Provider } from "react-redux";
import store from "../store/store.ts";
import CreatePost from "./pages/CreatePost.tsx";
import EditPost from "./pages/EditPost.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-post", element: <CreatePost /> },
  { path: "/all-posts", element: <AllPosts /> },
  { path: "/post/edit/:id", element: <EditPost /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
