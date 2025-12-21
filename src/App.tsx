import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SecurityAnalyzerLayout from "@/aksec/layouts/security-analyzer-layout";
import SecurityAnalyzerPage from "@/aksec/pages/security-analyzer";

export default function SecurityAnalyzerPrototype() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SecurityAnalyzerLayout>
              <SecurityAnalyzerPage />
            </SecurityAnalyzerLayout>
          }
        />

        <Route
          path="/security-analyzer"
          element={
            <SecurityAnalyzerLayout>
              <SecurityAnalyzerPage />
            </SecurityAnalyzerLayout>
          }
        />
      </Routes>
    </Router>
  );
}
