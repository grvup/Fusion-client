import { Flex, Button, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to URLs
import classes from "../../Dashboard/Dashboard.module.css"; // Assuming you have a CSS module for styling

function BreadcrumbTabsAcadadmin() {
  const [activeTab, setActiveTab] = useState("0"); // Default tab is the first one
  const navigate = useNavigate(); // React Router's useNavigate for navigation
  const tabsListRef = useRef(null);

  // Define breadcrumbItems directly within the file
  const breadcrumbItems = [
    {
      title: "Programme",
      url: "/programme_curriculum/acad_view_all_programme",
    },
    {
      title: "Curriculum",
      url: "/programme_curriculum/acad_view_all_working_curriculums",
    },
    { title: "Discipline", url: "/programme_curriculum/acad_discipline_view" },
    { title: "Batches", url: "/programme_curriculum/admin_batches" },
    { title: "Courses", url: "/programme_curriculum/admin_courses" },
    {
      title: "Course Instructor",
      url: "/programme_curriculum/admin_course_instructor",
    },
  ];

  // Handle tab navigation
  const handleTabChange = (direction) => {
    const currentIndex = parseInt(activeTab, 10);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

    // Ensure index is within bounds
    if (newIndex >= 0 && newIndex < breadcrumbItems.length) {
      setActiveTab(newIndex.toString());
      navigate(breadcrumbItems[newIndex].url); // Navigate to the URL
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
              {breadcrumbItems.map((item, index) => (
                <Tabs.Tab
                  value={`${index}`}
                  key={index}
                  className={
                    activeTab === `${index}`
                      ? classes.fusionActiveRecentTab
                      : ""
                  }
                  onClick={() => navigate(item.url)} // Navigate to the URL on click
                >
                  <Flex gap="4px">
                    <Text>{item.title}</Text>
                    {/* Badge example (notification count or any other indicator) */}
                    {/* {activeTab !== `${index}` && (
                      <Badge color="blue" size="sm" p={6}>
                        0
                      </Badge>
                    )} */}
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
          disabled={parseInt(activeTab, 10) === breadcrumbItems.length - 1} // Disable if on the last tab
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

export default BreadcrumbTabsAcadadmin;
