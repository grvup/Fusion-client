import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux
import { useEffect } from "react";
import SubmitGrades from "./submitGrades.jsx";
import VerifyGrades from "./verifyGrades.jsx";
import GenerateTranscript from "./generateTranscript.jsx";
import Nav from "./components/nav.jsx";
import { Layout } from "../../components/layout.jsx";
import StudentTranscript from "./components/studentTranscript.jsx";
import Announcement from "./announcement.jsx";
import VerifyDean from "./verifyDean.jsx";
import ValidateDean from "./validateDean.jsx";
import CheckResult from "./checkResult.jsx";
import CustomBreadExam from "./components/customBreadCrumbs.jsx";

export default function Examination() {
  const role = useSelector((state) => state.user.role); // Replace with actual state slice for role
  const navigate = useNavigate();

  // Set the default route based on the role
  const getDefaultRoute = () => {
    switch (role) {
      case "acadadmin":
        return "/examination/submit-grades";
      case "Dean Academic":
        return "/examination/update";
      case "Professor":
        return "/examination/submit-grades"; // Assuming submit-grades is for faculty as well
      case "student":
        return "/examination/result";
      default:
        return "/examination/submit-grades"; // Default if no role is found
    }
  };

  // Perform the redirection on component mount
  useEffect(() => {
    navigate(getDefaultRoute());
  }, [role]);

  return (
    <div>
      <Layout>
        <CustomBreadExam />
        <Nav />
        <div style={{ marginTop: "20px" }}>
          <Routes>
            <Route path="/submit-grades" element={<SubmitGrades />} />
            <Route path="/verify-grades" element={<VerifyGrades />} />
            <Route path="/update" element={<VerifyDean />} />
            <Route path="/validate" element={<ValidateDean />} />
            <Route path="/result" element={<CheckResult />} />
            <Route
              path="/generate-transcript"
              element={<GenerateTranscript />}
            />
            <Route
              path="/generate-transcript/:rollNumber"
              element={<StudentTranscript />}
            />
            <Route path="/announcement" element={<Announcement />} />
          </Routes>
        </div>
      </Layout>
    </div>
  );
}
