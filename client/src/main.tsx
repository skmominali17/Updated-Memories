import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInSide from "./pages/SignInSide.tsx";
import SignUp from "./pages/SignUp.tsx";
import AllPosts from "./pages/AllPosts.tsx";
import { Provider } from "react-redux";
import store from "../store/store.ts"
import CreatePost from "./pages/CreatePost.tsx";
import EditPost from "./pages/EditPost.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/sign-in", element: <SignInSide /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/create-post", element: <CreatePost /> },
  { path: "/all-posts", element: <AllPosts /> },
  { path: "/post/edit/:id", element: <EditPost /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
