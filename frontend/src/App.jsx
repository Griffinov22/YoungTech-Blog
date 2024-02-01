import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<div>I am root</div>}>
        <Route index element={<div>I am home</div>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
