import { useState } from "react";
import { Flex } from "@mantine/core";
import { useSelector } from "react-redux";

import CustomBreadcrumbs from "../../components/Breadcrumbs";
import ModuleTabs from "../../components/moduleTabs";
import RegisteredCourses from "./RegisteredCourses";
import AvailableCourses from "./AvailableCourses";
import PreRegistration from "./PreRegistration";
import FinalRegistration from "./FinalRegistration";
import StudentCourses from "./StudentCourses";
import DeletePreRegistration from "./DeletePreRegistration";
import AcademicCalendar from "./AcademicCalendar";
import GenerateStudentList from "./GenerateStudentList";
import ViewRollList from "./ViewRollList";
import AllocateCourses from "./AllocateCourses";
import VerifyStudentRegistration from "./VerifyStudentRegistration";
import SwayamRegistration from "./SwayamRegistration";

function AcademicPage() {
  const [activeTab, setActiveTab] = useState("0");
  const role = useSelector((state) => state.user.role);

  let tabItems;
  let tabComponents;

  if (role === "acadadmin" || role === "studentacadadmin") {
    tabItems = [
      { title: "Student Courses" },
      { title: "Delete Pre-Registration" },
      { title: "Academic Calendar" },
      { title: "Generate Student List" },
      { title: "Allocate Courses" },
      { title: "Verify Student Registration" },
    ];
    tabComponents = [
      StudentCourses,
      DeletePreRegistration,
      AcademicCalendar,
      GenerateStudentList,
      AllocateCourses,
      VerifyStudentRegistration,
    ];
  } else if (role === "student") {
    tabItems = [
      { title: "Registered Courses" },
      { title: "Available Courses" },
      { title: "Pre-Registration" },
      { title: "Final-Registration" },
      { title: "Swayam Registration" },
    ];
    tabComponents = [
      RegisteredCourses,
      AvailableCourses,
      PreRegistration,
      FinalRegistration,
      SwayamRegistration,
    ];
  } else {
    tabItems = [{ title: "View Roll List" }];
    tabComponents = [ViewRollList];
  }

  const ActiveComponent = tabComponents[parseInt(activeTab, 10)];

  return (
    <>
      <CustomBreadcrumbs />
      <Flex justify="space-between" align="center" mt="lg">
        <ModuleTabs
          tabs={tabItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Flex>
      <ActiveComponent mt="xl" />
    </>
  );
}

export default AcademicPage;
