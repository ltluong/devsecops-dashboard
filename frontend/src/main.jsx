import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./index.css";

import App from "./App";

import SonarDetails
from "./pages/SonarDetails";

import SnykDetails
from "./pages/SnykDetails";

import TrivyDetails
from "./pages/TrivyDetails";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <BrowserRouter>

    <Routes>

      <Route
        path="/"
        element={<App />}
      />

      <Route
        path="/sonar-details"
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
