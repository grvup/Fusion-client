import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Faculty_course_proposal.css";
import { Button } from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fetchFacultyCourseProposalData } from "../api/api";
import { host } from "../../../routes/globalRoutes";

function FormSection({
  activeTab,
  setActiveTab,
  title,
  formType,
  courseProposals,
  onArchiveSuccess,
  // eslint-disable-next-line react/prop-types
  onRestoreSuccess,
}) {
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

      {formType === "new-forms" && (
        <a href="/programme_curriculum/new_course_proposal_form">
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
          <CourseProposalTable
            courseProposals={courseProposals}
            onArchiveSuccess={onArchiveSuccess}
          />
        ) : (
          <ArchivedCoursesTable
            courseProposals={courseProposals}
            onRestoreSuccess={onRestoreSuccess}
          />
        )}
      </div>
    </div>
  );
}

function Admin_course_proposal_form() {
  const [activeForm, setActiveForm] = useState("new-forms");
  const [activeTab, setActiveTab] = useState("new-courses");
  const [courseProposals, setCourseProposals] = useState([]);
  const username = useSelector((state) => state.user.roll_no);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    if (username) {
      const fetchFacultyCourseProposal = async (uname, des) => {
        try {
          const response = await fetchFacultyCourseProposalData(uname, des);
          // const data = await response.json();
          // console.log("API Response:", data);
          sessionStorage.setItem(
            "courseProposals",
            JSON.stringify(response.courseProposals),
          );
          setCourseProposals(response.courseProposals);
        } catch (error) {
          console.error("Error fetching courses: ", error);
        }
      };
      fetchFacultyCourseProposal(username, role);
    }
  }, [username, role]);

  const handleArchiveSuccess = (archivedId) => {
    setCourseProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.pk === archivedId
          ? { ...proposal, fields: { ...proposal.fields, is_archive: true } }
          : proposal,
      ),
    );
  };

  const handleRestoreSuccess = (restoredId) => {
    setCourseProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.pk === restoredId
          ? { ...proposal, fields: { ...proposal.fields, is_archive: false } }
          : proposal,
      ),
    );
  };

  const handleFormSwitch = (form) => {
    setActiveForm(form);
    setActiveTab("new-courses");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <Button
          onClick={() => handleFormSwitch("new-forms")}
          variant="subtle"
          style={{
            margin: "10px 1vw 10px 0px ",
            fontWeight: activeForm === "new-forms" ? "bold" : "normal",
            fontSize: "1.5vw",
            color: "black",
            backgroundColor: "transparent",
            boxShadow: activeForm === "new-forms" ? "0 2px 0px black" : "none",
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
              activeForm === "updated-forms" ? "0px 2px 0px black" : "none",
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
        {activeForm === "new-forms" && (
          <FormSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            title="New Course Proposal Forms"
            formType="new-forms"
            courseProposals={courseProposals}
            onArchiveSuccess={handleArchiveSuccess}
            onRestoreSuccess={handleRestoreSuccess}
          />
        )}

        {activeForm === "updated-forms" && (
          <FormSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            title="Updated Course Proposal Forms"
            formType="updated-forms"
            courseProposals={courseProposals}
            onArchiveSuccess={handleArchiveSuccess}
            onRestoreSuccess={handleRestoreSuccess}
          />
        )}
      </div>
    </div>
  );
}

function CourseProposalTable({ courseProposals, onArchiveSuccess }) {
  const handleNavigation = (id) => {
    window.location.href = `/programme_curriculum/view_a_course_proposal_form?proposalid=${id}`;
  };

  const handleArchive = async (id) => {
    console.log("Archived: ", id);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${host}/programme_curriculum/api/file_archive/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log("API Response: ", data);
      // Refresh the page after successful archive
      if (response.ok) {
        onArchiveSuccess(id);
        alert("Course archived successfully");
      } else {
        throw new Error(data.message || "Failed to archive course");
      }
      // window.location.reload();
    } catch (error) {
      console.error("Error archiving course: ", error);
      alert("Failed to archive course");
    }
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
        {courseProposals.length > 0 ? (
          courseProposals
            .filter((proposal) => proposal.fields.is_archive === false)
            .map((proposal, index) => (
              <tr key={index}>
                <td className="table-data">{proposal.fields.uploader}</td>
                <td className="table-data">{proposal.fields.name}</td>
                <td className="table-data">{proposal.fields.code}</td>
                <td className="table-data">
                  <button
                    className="view-button"
                    onClick={() => handleNavigation(proposal.pk)}
                  >
                    View
                  </button>
                </td>
                <Link
                  to={`/programme_curriculum/filetracking?id=${proposal.pk}`}
                >
                  <td className="table-data">
                    <button className="submit-button">Submit</button>
                  </td>
                </Link>
                <td className="table-data">
                  <button
                    className="archive-button"
                    onClick={() => handleArchive(proposal.pk)}
                  >
                    Archive
                  </button>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No course proposals available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function ArchivedCoursesTable({ courseProposals, onRestoreSuccess }) {
  const handleNavigation = (courseCode) => {
    window.location.href = `/programme_curriculum/faculty_course_view?course=${courseCode}`;
  };
  console.log(courseProposals);
  const handleRestore = async (id) => {
    console.log("Restoring: ", id);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${host}/programme_curriculum/api/file_unarchive/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      const data = await response.json();
      console.log("API Response: ", data);

      if (response.ok) {
        onRestoreSuccess(id);
        alert("Course restored successfully");
      } else {
        throw new Error(data.message || "Failed to archive course");
      }

      // Call parent component's callback to update state
      // if (onRestoreSuccess) {
      //   onRestoreSuccess(id);
      // }

      // alert("Course restored successfully");
    } catch (error) {
      console.error("Error restoring course: ", error);
      alert(error.message || "Failed to restore course");
    }
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
        {courseProposals.length > 0 ? (
          courseProposals
            .filter((proposal) => proposal.fields.is_archive === true)
            .map((proposal, index) => (
              <tr key={index}>
                <td className="table-data">{proposal.fields.uploader}</td>
                <td className="table-data">{proposal.fields.name}</td>
                <td className="table-data">{proposal.fields.code}</td>
                <td className="table-data">
                  <button
                    className="view-button"
                    onClick={() => handleNavigation(proposal.fields.code)}
                  >
                    View
                  </button>
                </td>
                <td className="table-data">
                  <button
                    className="submit-button"
                    onClick={() => handleRestore(proposal.pk)}
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No archived course proposals available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
FormSection.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  courseProposals: PropTypes.array.isRequired,
  onArchiveSuccess: PropTypes.func,
};

CourseProposalTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  courseProposals: PropTypes.array.isRequired,
  onArchiveSuccess: PropTypes.func,
};
ArchivedCoursesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  courseProposals: PropTypes.array.isRequired,
  onRestoreSuccess: PropTypes.func,
};

export default Admin_course_proposal_form;
