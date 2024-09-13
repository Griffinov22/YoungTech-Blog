import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Root from "./layout/Root";
import Landing from "./pages/Landing";
import Posts from "./pages/protected/Posts";
import Create from "./pages/protected/Create";
import PostArchive from "./pages/PostArchive";
import Post from "./pages/Post";
import Update from "./pages/protected/Update";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Landing />} />

        {/* these are protected */}
        <Route path="posts" element={<Posts />} />
        <Route path="posts/create" element={<Create />} />
        <Route path="posts/update/:id" element={<Update />} />
        {/* end protected */}

        <Route path="posts/:id" element={<Post />} />
        <Route path="archive" element={<PostArchive />} />
      </Route>
    )
  );

  console.log(import.meta.env);

  return <RouterProvider router={router} />;
}

export default App;
