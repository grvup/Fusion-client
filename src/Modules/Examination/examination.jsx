import { Routes, Route, Navigate } from "react-router-dom";
import SubmitGrades from "./submitGrades.jsx";
import VerifyGrades from "./verifyGrades.jsx";
import GenerateTranscript from "./generateTranscript.jsx";
import Nav from "./components/nav2.jsx";
import { Layout } from "../../components/layout.jsx";
import StudentTranscript from "./components/studentTranscript.jsx";
import Announcement from "./announcement.jsx";
import VerifyDean from "./verifyDean.jsx";
import ValidateDean from "./validateDean.jsx";
import CheckResult from "./checkResult.jsx";
import CheckResultProf from "./checkResultsProf.jsx";
import CustomBreadExam from "./components/customBreadCrumbs.jsx";
import SubmitGradesProf from "./submitGradesProf.jsx";
import ProtectedRoute from "./routes/protectedRoutes.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Examination() {
  const userRole = useSelector((state) => state.user.role);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (userRole !== undefined && userRole !== null) {
      setIsLoaded(true);
    }
  }, [userRole]);

  if (!isLoaded) return null;

  const defaultRedirectPath = () => {
    switch (userRole) {
      case "Associate Professor":
      case "Assistant Professor":
      case "Professor":
        return "/examination/submit-grades-prof";
      case "acadadmin":
        return "/examination/submit-grades";
      case "student":
        return "/examination/result";
      case "Dean Academic":
        return "/examination/update";
      default:
        return "/examination/submit-grades"; // Fallback
    }
  };

  return (
    <div>
      <Layout>
        <CustomBreadExam />
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={defaultRedirectPath()} replace />}
          />
          <Route
            path="/submit-grades"
            element={
              <ProtectedRoute roles={["acadadmin"]}>
                <SubmitGrades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify-grades"
            element={
              <ProtectedRoute roles={["acadadmin"]}>
                <VerifyGrades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-transcript"
            element={
              <ProtectedRoute roles={["acadadmin"]}>
                <GenerateTranscript />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-transcript/:rollNumber"
            element={
              <ProtectedRoute roles={["acadadmin"]}>
                <StudentTranscript />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcement"
            element={
              <ProtectedRoute roles={["acadadmin"]}>
                <Announcement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update"
            element={
              <ProtectedRoute roles={["Dean Academic"]}>
                <VerifyDean />
              </ProtectedRoute>
            }
          />
          <Route
            path="/validate"
            element={
              <ProtectedRoute roles={["Dean Academic"]}>
                <ValidateDean />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute roles={["student"]}>
                <CheckResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-grades-prof"
            element={
              <ProtectedRoute roles={["Associate Professor", "Assistant Professor", "Professor"]}>
                <SubmitGradesProf />
              </ProtectedRoute>
            }
          />
          <Route
            path="/download-grades-prof"
            element={
              <ProtectedRoute roles={["Associate Professor", "Assistant Professor", "Professor"]}>
                <CheckResultProf />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}
