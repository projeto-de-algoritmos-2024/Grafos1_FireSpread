import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from "./pages/Login";

import { Navigate } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";
import Register from "./pages/Register";
import Home from "./pages/Home";


const ProtectedRoute = ({ children } : { children : JSX.Element}) => {
  const { user } = useAuth();

  if (!user) {
      return <Navigate to="/login" />;
  }

  return children;
};



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  }
]);

export default function Router() {
    return <RouterProvider router={router} />
}


