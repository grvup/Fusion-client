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

  const activeLinkStyle = {
    borderBottom: "2px solid  #1E90FF",
    // paddingBottom: "0.25rem",
  };

  const defaultLinkStyle = {
    textDecoration: "none",
    padding: "0px 10px",
    color: "black",
    display: "inline-block",
  };

  // Tabs data
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
              padding: "0 15px",
              // borderRight:
              //   index === filteredTabs.length - 1 ? "none" : "2px solid black",
            }}
          >
            <NavLink
              to={tab.path}
              className="borderclass"
              style={({ isActive }) =>
                isActive
                  ? { ...defaultLinkStyle, ...activeLinkStyle }
                  : defaultLinkStyle
              }
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
