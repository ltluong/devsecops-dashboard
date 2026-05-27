import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import SonarDetails from "./pages/SonarDetails";
import SnykDetails from "./pages/SnykDetails";
import TrivyDetails from "./pages/TrivyDetails";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/sonarqube-details"
          element={<SonarDetails />}
        />

        <Route
          path="/snyk-details"
          element={<SnykDetails />}
        />

        <Route
          path="/trivy-details"
          element={<TrivyDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}
