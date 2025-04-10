import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { CaretCircleLeft, CaretCircleRight } from "phosphor-react";
import { useSelector } from "react-redux";

export default function Nav() {
  const scrollContainerRef = useRef(null);

  // Fetching the user role from the Redux store
  const userRole = useSelector((state) => state.user.role);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  // Styles for the active tab
  const activeLinkStyle = {
    backgroundColor: "#15abff13", // Light blue background (same as Dashboard)
    color: "#15abff", // Blue text (same as Dashboard)
     // Bold text (same as Dashboard)
    borderBottom: "2px solid #15abff", // Blue bottom border
    borderBottomLeftRadius: "4px", // Curved bottom-left corner
    borderBottomRightRadius: "4px", // Curved bottom-right corner
  };

  // Default styles for all tabs
  const defaultLinkStyle = {
    textDecoration: "none",
    padding: "10px 15px", // Add padding for better spacing
    color: "black", // Black text for non-selected tabs
    display: "block", // Ensure the link takes up the full width of the parent
    width: "100%", // Ensure the link takes up the full width of the parent
    textAlign: "center", // Center the text
    borderBottom: "2px solid #e0e0e0", // Straight non-blue border (same as Dashboard)
  };

  // Tabs data
  const tabItems = [
    {
      title: "Submit",
      path: "/examination/submit-grades",
      roles: ["acadadmin"],
    },
    {
      title: "Submit",
      path: "/examination/submit-grades-prof",
      roles: ["Professor","Assistant Professor","Associate Professor"],
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
    {
      title: "Download Grades",
      path: "/examination/download-grades-prof",
      roles: ["Professor","Assistant Professor","Associate Professor"],
    },
    
    { title: "Result", path: "/examination/result", roles: ["Student"] },
  ];

  // Filter tabs based on user role
  const filteredTabs = tabItems.filter((tab) => tab.roles.includes(userRole));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "5vh",
        marginBottom: "30px",
      }}
    >
      <button
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
        onClick={scrollLeft}
      >
        <CaretCircleLeft size={25} />
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          flexWrap: "nowrap",
        }}
        ref={scrollContainerRef}
      >
        {filteredTabs.map((tab, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0", // Remove padding from the parent div
            }}
          >
            <NavLink
              to={tab.path}
              style={({ isActive }) => ({
                ...defaultLinkStyle,
                ...(isActive ? activeLinkStyle : {}),
              })}
            >
              {tab.title}
            </NavLink>
          </div>
        ))}
      </div>
      <button
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
        onClick={scrollRight}
      >
        <CaretCircleRight size={25} />
      </button>
    </div>
  );
}
