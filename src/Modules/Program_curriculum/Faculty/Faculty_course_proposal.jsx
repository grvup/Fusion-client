import React, { useState } from "react";
import "./Faculty_course_proposal.css";
import { Button } from "@mantine/core";
// import { MagnifyingGlass, X } from "@phosphor-icons/react";
import PropTypes from "prop-types";

function FormSection({ activeTab, setActiveTab, title, formType }) {
  return (
    <div className="container">
      <div className="tabs">
        <Button
          variant={activeTab === "new-courses" ? "filled" : "outline"}
          onClick={() => setActiveTab("new-courses")}
          style={{ margin: "10px 10px 10px 0 " }}
        >
          {title}
        </Button>
        <Button
          variant={activeTab === "archived-courses" ? "filled" : "outline"}
          onClick={() => setActiveTab("archived-courses")}
          style={{ margin: "10px 10px 10px 0 " }}
        >
          Archived Files
        </Button>
      </div>

      {/* Render Button Based on formType */}
      {formType === "new-forms" && (
        <a href="/programme_curriculum/faculty_forward_form">
          <Button style={{ marginBottom: "10px" }} variant="outline">
            Add Course Proposal Form
          </Button>
        </a>
      )}

      {formType === "updated-forms" && (
        <a href="/programme_curriculum/faculty_courses">
          <Button style={{ marginBottom: "10px" }} variant="outline">
            Update Course Proposal Form
          </Button>
        </a>
      )}

      <div className="form-container">
        {activeTab === "new-courses" ? (
          <CourseProposalTable />
        ) : (
          <ArchivedCoursesTable />
        )}
      </div>
    </div>
  );
}

function Admin_course_proposal_form() {
  const [activeForm, setActiveForm] = useState("new-forms"); // Track active form section
  const [activeTab, setActiveTab] = useState("new-courses"); // Track active tab within the section

  // Handle form section change and reset the tab to 'new-courses'
  const handleFormSwitch = (form) => {
    setActiveForm(form);
    setActiveTab("new-courses"); // Reset tab to 'new-courses'
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        {/* Section Switch Buttons */}
        <Button
          onClick={() => handleFormSwitch("new-forms")}
          variant="subtle" // Keep the design minimal
          style={{
            margin: "10px 1vw 10px 0px ",
            fontWeight: activeForm === "new-forms" ? "bold" : "normal",
            fontSize: "1.5vw",
            color: "black",
            backgroundColor: "transparent",
            boxShadow: activeForm === "new-forms" ? "0 2px 0px black" : "none", // Box shadow when active
            // padding: "0",
          }}
        >
          New Forms
        </Button>

        <Button
          onClick={() => handleFormSwitch("updated-forms")}
          variant="subtle"
          style={{
            fontWeight: activeForm === "updated-forms" ? "bold" : "normal",
            fontSize: "1.5vw",
            color: "black",
            backgroundColor: "transparent",
            boxShadow:
              activeForm === "updated-forms" ? "0px 2px 0px black" : "none", // Box shadow when active
            // padding: "0",
          }}
        >
          Updated Forms
        </Button>
      </div>

      <hr />

      <div
        className="admin-course-proposal-container"
        style={{ marginTop: "20px", backgroundColor: "#f5f7f8" }}
      >
        {/* Conditional Rendering of Form Sections */}
        {activeForm === "new-forms" && (
          <FormSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            title="New Course Proposal Forms"
            formType="new-forms" // Pass form type to conditionally show button
          />
        )}

        {activeForm === "updated-forms" && (
          <FormSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            title="Updated Course Proposal Forms"
            formType="updated-forms" // Pass form type to conditionally show button
          />
        )}
      </div>
    </div>
  );
}

// Reusable FormSection Component

function CourseProposalTable() {
  const handleNavigation = (courseCode) => {
    window.location.href = `/programme_curriculum/faculty_course_view?course=${courseCode}`;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">Created By</th>
          <th className="table-header">Course Name</th>
          <th className="table-header">Course Code</th>
          <th className="table-header">View</th>
          <th className="table-header">Submit</th>
          <th className="table-header">Archive</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-data">atul - Professor</td>
          <td className="table-data">Electric Vehicle and Mobility</td>
          <td className="table-data">ME8017</td>
          <td className="table-data">
            <button
              className="view-button"
              onClick={() => handleNavigation("ME8017")}
            >
              View
            </button>
          </td>
          <td className="table-data">
            <button className="submit-button">Submit</button>
          </td>
          <td className="table-data">
            <button className="archive-button">Archive</button>
          </td>
        </tr>
        <tr>
          <td className="table-data">atul - Professor</td>
          <td className="table-data">Lab based Project 1</td>
          <td className="table-data">CS206L</td>
          <td className="table-data">
            <button
              className="view-button"
              onClick={() => handleNavigation("CS206L")}
            >
              View
            </button>
          </td>
          <td className="table-data">
            <button className="submit-button">Submit</button>
          </td>
          <td className="table-data">
            <button className="archive-button">Archive</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function ArchivedCoursesTable() {
  const handleNavigation = (courseCode) => {
    window.location.href = `/programme_curriculum/faculty_course_view?course=${courseCode}`;
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">Created By</th>
          <th className="table-header">Course Name</th>
          <th className="table-header">Course Code</th>
          <th className="table-header">View</th>
          <th className="table-header">Restore</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-data">atul - Professor</td>
          <td className="table-data">Data Structures</td>
          <td className="table-data">CS101</td>
          <td className="table-data">
            <button
              className="view-button"
              onClick={() => handleNavigation("CS101")}
            >
              View
            </button>
            {/* <button className="view-button" onClick={() => window.location.href = "/programme_curriculum/faculty_course_view?course=CS101"}>View</button> */}
          </td>
          <td className="table-data">
            <button className="submit-button">Restore</button>
          </td>
        </tr>
        <tr>
          <td className="table-data">atul - Professor</td>
          <td className="table-data">Operating Systems</td>
          <td className="table-data">CS102</td>
          <td className="table-data">
            <button
              className="view-button"
              onClick={() => handleNavigation("CS102")}
            >
              View
            </button>
            {/* <button className="view-button" onClick={() => window.location.href = "/programme_curriculum/faculty_course_view?course=CS102"}>View</button> */}
          </td>
          <td className="table-data">
            <button className="submit-button">Restore</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

FormSection.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
};

export default Admin_course_proposal_form;
