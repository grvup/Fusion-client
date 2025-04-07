<<<<<<< HEAD
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { CaretCircleLeft, CaretCircleRight } from "phosphor-react";

export default function Nav() {
  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    borderBottom: "3px solid black",
    paddingBottom: "0.25rem",
  };

  const defaultLinkStyle = {
    textDecoration: "none",
    padding: "0px 10px",
    color: "black",
    display: "inline-block",
  };

  const linkWrapperStyle = {
    display: "flex",
    alignItems: "center",
    borderRight: "2px solid black",
    padding: "0 15px",
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "5vh",
            marginBottom: "30px",
          }}
        >
          {/* <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => scrollLeft(scrollContainerRef1)}
          >
            <CaretCircleLeft size={25} />
          </button> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              flexWrap: "nowrap",
            }}
            ref={scrollContainerRef1}
          >
            <div style={linkWrapperStyle}>
              <NavLink
                to="/examination/submit-grades"
                className="borderclass"
                style={({ isActive }) =>
                  isActive
                    ? { ...defaultLinkStyle, ...activeLinkStyle }
                    : defaultLinkStyle
                }
              >
                Submit
              </NavLink>
            </div>
            <div style={linkWrapperStyle}>
              <NavLink
                to="/examination/verify-grades"
                className="borderclass"
                style={({ isActive }) =>
                  isActive
                    ? { ...defaultLinkStyle, ...activeLinkStyle }
                    : defaultLinkStyle
                }
              >
                Verify
              </NavLink>
            </div>
            <div style={linkWrapperStyle}>
              <NavLink
                to="/examination/announcement"
                className="borderclass"
                style={({ isActive }) =>
                  isActive
                    ? { ...defaultLinkStyle, ...activeLinkStyle }
                    : defaultLinkStyle
                }
              >
                Announcement
              </NavLink>
            </div>
            <div style={linkWrapperStyle}>
              <NavLink
                to="/examination/generate-transcript"
                className="borderclass"
                style={({ isActive }) =>
                  isActive
                    ? { ...defaultLinkStyle, ...activeLinkStyle }
                    : defaultLinkStyle
                }
              >
                Transcript
              </NavLink>
            </div>
          </div>
          {/* <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => scrollRight(scrollContainerRef1)}
          >
            <CaretCircleRight size={25} />
          </button> */}
        </div>
      </div>
    </div>
=======
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
>>>>>>> upstream/acad-main
  );
}
