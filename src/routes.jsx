import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { CharacterDetail } from "./pages/CharacterDetail";
import { VehicleDetail } from "./pages/VehicleDetail";
import { PlanetDetail } from "./pages/PlanetDetail";
import { Favorites } from "./pages/Favorites";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>404 - Not found!</h1>}>
      <Route index element={<Home />} />
      <Route path="character/:id" element={<CharacterDetail />} />
      <Route path="vehicle/:id" element={<VehicleDetail />} />
      <Route path="planet/:id" element={<PlanetDetail />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
);