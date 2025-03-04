import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModuleTabs from "../../../components/moduleTabs";

export default function Nav() {
  const navigate = useNavigate();

  // Fetching the user role from Redux store
  const userRole = useSelector((state) => state.user.role);

  // Fetching the active tab from Redux store
  const activeTab = useSelector((state) => state.module.active_tab);

  // State to manage active tab locally
  const [selectedTab, setSelectedTab] = useState(activeTab);

  // Tabs data with role-based filtering
  const tabItems = [
    {
      title: "Submit",
      path: "/examination/submit-grades",
      roles: ["acadadmin", "Professor"],
    },
    {
      title: "Verify",
      path: "/examination/verify-grades",
      roles: ["acadadmin"],
    },
    {
      title: "Announcement",
      path: "/examination/announcement",
      roles: ["acadadmin"],
    },
    {
      title: "Transcript",
      path: "/examination/generate-transcript",
      roles: ["acadadmin"],
    },
    { title: "Update", path: "/examination/update", roles: ["Dean Academic"] },
    {
      title: "Validate",
      path: "/examination/validate",
      roles: ["Dean Academic"],
    },
    { title: "Result", path: "/examination/result", roles: ["Student"] },
  ];

  // Filtering tabs based on user role
  const filteredTabs = tabItems.filter((tab) => tab.roles.includes(userRole));

  // Handling tab change (Navigation)
  const handleTabChange = (index) => {
    setSelectedTab(index);
    navigate(filteredTabs[index].path);
  };

  return (
    <ModuleTabs
      tabs={filteredTabs}
      activeTab={selectedTab}
      setActiveTab={handleTabChange}
    />
  );
}
