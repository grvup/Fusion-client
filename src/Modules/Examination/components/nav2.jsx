import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { CaretCircleLeft, CaretCircleRight } from "phosphor-react";

export default function Nav() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150, // Adjust the scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 150, // Adjust the scroll distance
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
          overflowX: "auto", // Enable horizontal scrolling
          scrollbarWidth: "none", // Hide scrollbar (for Firefox)
          msOverflowStyle: "none", // Hide scrollbar (for IE and Edge)
          flexWrap: "nowrap",
        }}
        ref={scrollContainerRef} // Reference for scrolling
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
            style={({ isActive }) =>
              isActive
                ? { ...defaultLinkStyle, ...activeLinkStyle }
                : defaultLinkStyle
            }
          >
            Transcript
          </NavLink>
        </div>
        <div style={linkWrapperStyle}>
          <NavLink
            to="/examination/update"
            style={({ isActive }) =>
              isActive
                ? { ...defaultLinkStyle, ...activeLinkStyle }
                : defaultLinkStyle
            }
          >
            Update
          </NavLink>
        </div>
        <div style={linkWrapperStyle}>
          <NavLink
            to="/examination/validate"
            style={({ isActive }) =>
              isActive
                ? { ...defaultLinkStyle, ...activeLinkStyle }
                : defaultLinkStyle
            }
          >
            Validate
          </NavLink>
        </div>
        <div style={{ padding: "0 15px" }}>
          <NavLink
            to="/examination/result"
            style={({ isActive }) =>
              isActive
                ? { ...defaultLinkStyle, ...activeLinkStyle }
                : defaultLinkStyle
            }
          >
            Result
          </NavLink>
        </div>
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
