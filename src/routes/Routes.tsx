import { AddBlog } from "../pages/blog/Add";
import { ListBlog } from "../pages/blog/List";
import { Home } from "../pages/Home";
import { UpdateBlog } from "../pages/blog/Update";
import ProtectedRoute from "../components/ProtectedRoute";


export const routes = [
    {
        path: "/blog/add",
        element: <ProtectedRoute element={<AddBlog />} />,
    },
    {
        path: "/blog",
        element: <ProtectedRoute element={<ListBlog />} />,
    },
    {
        path: "/blog/edit/:id",
        element: <ProtectedRoute element={<UpdateBlog />} />,
    },
    {
        path: "/",
        element: <Home />,
    },
]