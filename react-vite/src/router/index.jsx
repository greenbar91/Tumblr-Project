import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import FollowingFormPage from '../components/FollowingFormPage';
import Likes from '../components/Likes';
import Explore from '../components/Explore';
import ManagePosts from '../components/ManagePosts';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {

        path: "likes",
        element: <Likes/>
      },
      {
        path: "explore/trending",
        element: <Explore />

      },
      {
        path: "following",
        element: <FollowingFormPage/>
      }, {
        path: "blog",
        element: <ManagePosts />
      }
    ],
  },
]);
