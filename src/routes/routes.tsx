import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const NoMatch = lazy(() => import("components/NoMatch"));
const Candidates = lazy(() => import("pages/Candidates"));
const CandidateForm = lazy(() => import("pages/CandidateForm"));

const RoutesScreen = () => {
  return (
    <Suspense fallback={<div className="spinner-center">Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <Candidates />
          }
        /> 
        <Route
          path="/candidates"
          element={
            <Candidates />
          }
        />
        <Route
          path="/candidate/input/:cid?"
          element={
            <CandidateForm />
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesScreen;
