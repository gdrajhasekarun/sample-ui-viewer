import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import AiTestcase from "../components/AiTestcase.tsx";
import ViewTestCase from "../components/ViewTestCase.tsx";
import TestCases from "../components/TestCases.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";

const CustomRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/testcases-ai" element={<AiTestcase />} />
      <Route path="/testcases" element={<TestCases />} />
      <Route path="/testcase/:index" element={<ViewTestCase />} />
    </Routes>
  );
};

export default CustomRoutes;
