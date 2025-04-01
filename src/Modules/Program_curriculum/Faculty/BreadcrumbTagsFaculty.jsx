import { Flex, Button, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "../../Dashboard/Dashboard.module.css";
import { useSelector } from "react-redux";

function BreadcrumbTabsFaculty() {
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const location = useLocation();
  const tabsListRef = useRef(null);

  // Check if user is HOD or DEAN Academic
  const isHodOrDean = role && (role.startsWith("HOD") || role === "Dean Academic");
  const isDean = role && (role === "Dean Academic");

  // Filter breadcrumb items based on role
  const breadcrumbItems = [
    {
      title: "Programme",
      url: "/programme_curriculum/faculty_view_all_programmes",
    },
    {
      title: "Curriculum",
      url: "/programme_curriculum/faculty_view_all_working_curriculums",
    },
    { title: "Discipline", url: "/programme_curriculum/faculty_discipline" },
    { title: "Batches", url: "/programme_curriculum/faculty_batches" },
    { title: "Courses", url: "/programme_curriculum/faculty_courses" },
    // Only show Course Proposal for non-HOD/DEAN roles
    ...(!isHodOrDean ? [{
      title: "Course Proposal",
      url: "/programme_curriculum/faculty_view_course_proposal",
    }] : []),
    ...(!isDean ? [{
      title: "Course Proposal Tracking",
      url: "/programme_curriculum/faculty_outward_files",
    }] : []),
    // Only show Inward Files for HOD/DEAN roles
    ...(isHodOrDean ? [{
      title: "Inward Files",
      url: "/programme_curriculum/faculty_inward_files",
    }] : []),
  ];

  // Get initial active tab based on current URL
  const initialActiveTab = () => {
    const index = breadcrumbItems.findIndex(
      (item) => item.url === location.pathname,
    );
    return index !== -1 ? index.toString() : "0";
  };

  const [activeTab, setActiveTab] = useState(initialActiveTab());

  // Update active tab on URL change
  useEffect(() => {
    const index = breadcrumbItems.findIndex(
      (item) => item.url === location.pathname,
    );
    if (index !== -1) setActiveTab(index.toString());
  }, [location.pathname]);

  // Handle tab switching via buttons
  const handleTabChange = (direction) => {
    const currentIndex = parseInt(activeTab, 10);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < breadcrumbItems.length) {
      navigate(breadcrumbItems[newIndex].url);
    }
  };

  return (
    <Flex justify="space-between" align="center" mt="lg">
      <Flex
        justify="flex-start"
        align="center"
        gap={{ base: "0.5rem", md: "1rem" }}
        mt={{ base: "1rem", md: "1.5rem" }}
        ml={{ md: "lg" }}
      >
        <Button
          onClick={() => handleTabChange("prev")}
          variant="default"
          p={0}
          style={{ border: "none" }}
          disabled={parseInt(activeTab, 10) === 0}
        >
          <CaretCircleLeft
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>

        <div className={classes.fusionTabsContainer} ref={tabsListRef}>
          <Tabs
            value={activeTab}
            onChange={(value) => {
              setActiveTab(value);
              navigate(breadcrumbItems[parseInt(value, 10)].url);
            }}
          >
            <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
              {breadcrumbItems.map((item, index) => (
                <Tabs.Tab
                  value={`${index}`}
                  key={index}
                  className={
                    activeTab === `${index}`
                      ? classes.fusionActiveRecentTab
                      : ""
                  }
                >
                  <Flex gap="4px">
                    <Text>{item.title}</Text>
                  </Flex>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>

        <Button
          onClick={() => handleTabChange("next")}
          variant="default"
          p={0}
          style={{ border: "none" }}
          disabled={parseInt(activeTab, 10) === breadcrumbItems.length - 1}
        >
          <CaretCircleRight
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>
      </Flex>
    </Flex>
  );
}

export default BreadcrumbTabsFaculty;