import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/login",
      element: <Login/>,
    }
  ]);

export default function Router() {
    return <RouterProvider router={router} />
}
