import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ApiStatusBanner from "components/ApiStatusBanner";
import NotFound from "pages/NotFound";
import OperationsDashboard from "./pages/operations-dashboard";
import Tournees from "./pages/tournees";
import Sites from "./pages/sites";
import Chauffeurs from "./pages/chauffeurs";
import Camions from "./pages/camions";
import Unites from "./pages/unites";
import Parametres from "./pages/parametres";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <ApiStatusBanner />
        <RouterRoutes>
          <Route path="/" element={<OperationsDashboard />} />
          <Route path="/tournees" element={<Tournees />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/chauffeurs" element={<Chauffeurs />} />
          <Route path="/camions" element={<Camions />} />
          <Route path="/unites" element={<Unites />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
