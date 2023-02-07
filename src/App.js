import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import NewProducts from "./pages/NewProducts";
import ProductDetail from "./pages/ProductDetail";
import MyCart from "./pages/MyCart";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <AllProducts /> },
      {
        path: "/products/new",
        element: (
          <ProtectedRoute requiredAdmin={true}>
            <NewProducts />
          </ProtectedRoute>
        ),
      },
      { path: "/product/:id", element: <ProductDetail /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
