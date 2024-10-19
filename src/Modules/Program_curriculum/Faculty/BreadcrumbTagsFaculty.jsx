import { Flex, Button, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to URLs
import { useSelector } from "react-redux";
import classes from "../../Dashboard/Dashboard.module.css"; // Assuming you have a CSS module for styling

function BreadcrumbTabs() {
  const [activeTab, setActiveTab] = useState("0"); // Default tab is the first one
  const navigate = useNavigate(); // React Router's useNavigate for navigation
  const tabsListRef = useRef(null);
  const role = useSelector((state) => state.user.role); // Get the user's role

  // Define breadcrumbItems directly within the file
  const breadcrumbItems = [
    { title: "Programme", url: "/programme_curriculum/view_all_programmes" },
    {
      title: "Curriculum",
      url: "/programme_curriculum/view_all_working_curriculums",
    },
    { title: "Discipline", url: "/programme_curriculum/faculty_discipline" },
    { title: "Batches", url: "/programme_curriculum/faculty_batches" },
    { title: "Courses", url: "/programme_curriculum/faculty_courses" },
    {
      title: "Course Proposal",
      url: "/programme_curriculum/faculty_view_course_proposal",
    },
    {
      title: "Course Proposal Tracking",
      url: "/programme_curriculum/faculty_outward_files",
    },
    {
      title: "Inward Files",
      url: "/programme_curriculum/faculty_inward_files",
    },
  ];

  // Filter items based on the role
  const filteredBreadcrumbItems = breadcrumbItems.filter((item) => {
    if (role === "professor" || role === "assistant-professor") {
      return (
        item.title === "Programme" ||
        item.title === "Curriculum" ||
        item.title === "Course Proposal" ||
        item.title === "Course Proposal Tracking"
      );
    }
    if (role === "HOD") {
      return (
        item.title === "Programme" ||
        item.title === "Curriculum" ||
        item.title === "Course Proposal" ||
        item.title === "Course Proposal Tracking" ||
        item.title === "Inward Files"
      );
    }
    return false; // No items if role doesn't match
  });

  // Handle tab navigation
  const handleTabChange = (direction) => {
    const currentIndex = parseInt(activeTab, 10);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

    // Ensure index is within bounds
    if (newIndex >= 0 && newIndex < filteredBreadcrumbItems.length) {
      setActiveTab(newIndex.toString());
      navigate(filteredBreadcrumbItems[newIndex].url); // Navigate to the URL
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
        {/* Button to navigate to the previous tab */}
        <Button
          onClick={() => handleTabChange("prev")}
          variant="default"
          p={0}
          style={{ border: "none" }}
          disabled={parseInt(activeTab, 10) === 0} // Disable button if on the first tab
        >
          <CaretCircleLeft
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>

        {/* Tabs component */}
        <div className={classes.fusionTabsContainer} ref={tabsListRef}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
              {filteredBreadcrumbItems.map((item, index) => (
                <Tabs.Tab
                  value={index.toString()} // Ensure the value is a string
                  key={index}
                  className={
                    activeTab === index.toString()
                      ? classes.fusionActiveRecentTab
                      : ""
                  }
                  onClick={() => navigate(item.url)} // Navigate to the URL on click
                >
                  <Flex gap="4px">
                    <Text>{item.title}</Text>
                  </Flex>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>

        {/* Button to navigate to the next tab */}
        <Button
          onClick={() => handleTabChange("next")}
          variant="default"
          p={0}
          style={{ border: "none" }}
          disabled={
            parseInt(activeTab, 10) === filteredBreadcrumbItems.length - 1
          } // Disable if on the last tab
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

export default BreadcrumbTabs;
