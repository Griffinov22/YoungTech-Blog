import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./layout/Root";
import Landing from "./pages/Landing";
import Posts from "./pages/protected/Posts";
import Create from "./pages/protected/Create";
import PostArchive from "./pages/PostArchive";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Landing />} />
        {/* thes are protected */}
        <Route path="posts" element={<Posts />} />
        <Route path="posts/create" element={<Create />} />
        {/* end protected */}
        <Route path="archive" element={<PostArchive />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
