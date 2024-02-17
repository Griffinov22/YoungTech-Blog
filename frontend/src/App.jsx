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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Landing />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/create" element={<Create />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
