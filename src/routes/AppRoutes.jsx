import {Routes,Route,} from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Assets from "../pages/Assets";
import AddAsset from "../pages/AddAsset";
import Allocation from "../pages/Allocation";
import Transfers from "../pages/Transfers";
import Maintenance from "../pages/Maintenance";
import QRVerification from "../pages/QRVerification";
import BulkImport from "../pages/BulkImport";
import AIAssistant from "../pages/AIAssistant";
import KnowledgeBase from "../pages/KnowledgeBase";
import MLIntelligence from "../pages/MLIntelligence";
import Reports from "../pages/Reports";
import AuditLogs from "../pages/AuditLogs";
import Users from "../pages/Users";
import Departments from "../pages/Departments";
import Locations from "../pages/Locations";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/assets"
          element={<Assets />}
        />

        <Route
          path="/assets/add"
          element={<AddAsset />}
        />

        <Route
          path="/allocation"
          element={<Allocation />}
        />

        <Route
          path="/transfers"
          element={<Transfers />}
        />

        <Route
          path="/maintenance"
          element={<Maintenance />}
        />

        <Route
          path="/qr"
          element={<QRVerification />}
        />

        <Route
          path="/bulk-import"
          element={<BulkImport />}
        />

        <Route
          path="/ai"
          element={<AIAssistant />}
        />

        <Route
          path="/knowledge"
          element={<KnowledgeBase />}
        />

        <Route
          path="/ml"
          element={<MLIntelligence />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/audit"
          element={<AuditLogs />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/locations"
          element={<Locations />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

    </Routes>
  );
}