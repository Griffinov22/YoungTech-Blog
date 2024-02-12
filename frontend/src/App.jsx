import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./layout/Root";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<div>I am home</div>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
