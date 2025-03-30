import { Flex, Button, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "../../Dashboard/Dashboard.module.css";

function BreadcrumbTabsAcadadmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabsListRef = useRef(null);

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

  const getCachedTab = () => localStorage.getItem("activeTab") || "0";

  const initialActiveTab = () => {
    const currentPath = location.pathname;
    const index = breadcrumbItems.findIndex((item) => item.url === currentPath);
    return index !== -1 ? index.toString() : getCachedTab();
  };

  const [activeTab, setActiveTab] = useState(initialActiveTab());

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const currentPath = location.pathname;
    const index = breadcrumbItems.findIndex((item) => item.url === currentPath);
    if (index !== -1) {
      setActiveTab(index.toString());
    }
  }, [location.pathname]);

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

export default BreadcrumbTabsAcadadmin;
