import Announcement from "../announcement.jsx";
import SubmitGrades from "../submitGrades.jsx";
import VerifyGrades from "../verifyGrades.jsx";
import GenerateTranscript from "../generateTranscript.jsx";
import CheckResult from "../checkResult.jsx";
import UpdateGrade from "../verifyDean.jsx";
import ValidateGrade from "../validateDean.jsx";

const RoleBasedFilterExam = () => {
  const tabItems = [
    { title: "Announcement", component: <Announcement /> },
    { title: "Submit Grades", component: <SubmitGrades /> },
    { title: "Verify Grades", component: <VerifyGrades /> },
    { title: "Generate Transcript", component: <GenerateTranscript /> },
    { title: "Check Result", component: <CheckResult /> },
    { title: "Update Grades", component: <UpdateGrade /> },
    { title: "Validate Grades", component: <ValidateGrade /> },
  ];

  const roleBasedTabs = {
    Admin: tabItems.filter((tab) =>
      [
        "Announcement",
        "Submit Grades",
        "Verify Grades",
        "Generate Transcript",
      ].includes(tab.title),
    ),
    Dean: tabItems.filter((tab) =>
      ["Validate Grades", "Update Grades"].includes(tab.title),
    ),
    Student: tabItems.filter((tab) => ["Check Result"].includes(tab.title)),
  };

  return { roleBasedTabs, tabItems };
};

export default RoleBasedFilterExam;
