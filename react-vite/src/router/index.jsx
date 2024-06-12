import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import FollowingFormPage from "../components/FollowingFormPage";
import Likes from "../components/Likes";
import Explore from "../components/Explore";
import ManagePosts from "../components/ManagePosts";
import HomePage from "../components/HomePage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Explore />,
      },
      {
        path: "likes",
        element: <Likes />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "following",
        element: <FollowingFormPage />,
      },
      {
        path: "blog",
        element: <ManagePosts />,
      },
      {
        path:"home",
        element: <HomePage/>,
      }
    ],
  },
]);
