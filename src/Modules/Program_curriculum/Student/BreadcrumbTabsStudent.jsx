import { Flex, Button, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "../../Dashboard/Dashboard.module.css";

function BreadcrumbTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabsListRef = useRef(null);

  const breadcrumbItems = [
    { title: "Programme", url: "/programme_curriculum/view_all_programmes" },
    {
      title: "Curriculum",
      url: "/programme_curriculum/view_all_working_curriculums",
    },
    { title: "Discipline", url: "/programme_curriculum/stud_discipline_view" },
    { title: "Batches", url: "/programme_curriculum/student_batches" },
    { title: "Courses", url: "/programme_curriculum/student_courses" },
  ];

  // Retrieve active tab from sessionStorage or determine from URL
  const getInitialTab = () => {
    const storedTab = sessionStorage.getItem("activeTab");
    if (storedTab) return storedTab;

    const index = breadcrumbItems.findIndex(
      (item) => item.url === location.pathname,
    );
    return index !== -1 ? index.toString() : "0";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const index = breadcrumbItems.findIndex(
      (item) => item.url === location.pathname,
    );
    if (index !== -1) setActiveTab(index.toString());
  }, [location.pathname]);

  const handleTabChange = (direction) => {
    const currentIndex = parseInt(activeTab, 10);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < breadcrumbItems.length) {
      setActiveTab(newIndex.toString());
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
                  key={index}
                  value={`${index}`}
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

export default BreadcrumbTabs;
