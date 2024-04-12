import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";

import { Navigate } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";


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
        <App/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login/>,
  }
]);

export default function Router() {
    return <RouterProvider router={router} />
}


