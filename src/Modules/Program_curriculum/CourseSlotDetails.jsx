import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom"; // Assuming you're using react-router for routingimport { Link, useSearchParams, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import "./CourseSlotDetails.css"; // Separate CSS file for styling
import axios from "axios"; // Import axios for making HTTP requests
import { fetchCourseSlotData } from "./api/api";
import { host } from "../../routes/globalRoutes"; // Adjust the import path as needed
// import { Modal, Button, Group, Text } from "@mantine/core"; // Import Mantine components

function CourseSlotDetails() {
  const [courseSlot, setCourseSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const courseslotId = searchParams.get("course_slot");
  const curriculumId = searchParams.get("curriculum");
  const semesterId = searchParams.get("semester");

  // Simulate fetching the course slot data from a server with dummy data
  useEffect(() => {
    const loadCourseSlotData = async () => {
      try {
        const data = await fetchCourseSlotData(courseslotId);
        setCourseSlot(data);
      } catch (err) {
        // setError("Failed to fetch course slot data.");
        console.error("Error loading course slot data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourseSlotData();
  }, [courseslotId]);

  const handleDeleteCourseSlot = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `${host}/programme_curriculum/api/admin_delete_courseslot/${courseslotId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert("Course slot deleted successfully!");
        navigate(
          `/programme_curriculum/view_curriculum?curriculum=${curriculumId}`,
        ); // Redirect after deletion
      }
    } catch (error) {
      console.error("Error deleting course slot:", error);
      alert("Failed to delete course slot.");
    } finally {
      setShowModal(false); // Close the modal
    }
  };

  const handleDelete = () => {
    handleDeleteCourseSlot();
  };

  if (loading) return <div>Loading...</div>;
  if (!courseSlot) return <div className="loading">Loading...</div>;

  return (
    <div className="flex-container">
      {/* Course Slot Details */}
      <div style={{ display: "flex" }}>
        <div className="course-slot-container">
          <div className="course-slot-content">
            <div className="slot-description">
              <table className="course-info-table">
                <tbody>
                  <tr>
                    <td colSpan="4">
                      <h2>Course Slot: {courseSlot.course_slot.name}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <h3>
                        Semester: {courseSlot.course_slot.curriculum.name} v
                        {courseSlot.course_slot.curriculum.version}, sem-
                        {courseSlot.course_slot.curriculum.semester_no}
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <h4>Type: {courseSlot.course_slot.type}</h4>
                    </td>
                  </tr>
                  <tr className="course-slot-row">
                    <td>Info</td>
                    <td colSpan="3">
                      {courseSlot.course_slot.course_slot_info}
                    </td>
                  </tr>
                  <tr className="course-slot-row">
                    <td>Duration</td>
                    <td colSpan="3">
                      {courseSlot.course_slot.duration} Semesters
                    </td>
                  </tr>
                  <tr className="course-slot-row">
                    <td>Min Registration Limit</td>
                    <td>{courseSlot.course_slot.min_registration_limit}</td>
                    <td>Max Registration Limit</td>
                    <td>{courseSlot.course_slot.max_registration_limit}</td>
                  </tr>
                </tbody>
              </table>

              {courseSlot.course_slot.courses.length > 0 ? (
                <table className="course-list-table">
                  <thead>
                    <tr className="table-header">
                      <td>Course Code</td>
                      <td>Course Name</td>
                      <td>Credits</td>
                      {/* <td /> */}
                    </tr>
                  </thead>
                  <tbody>
                    {courseSlot.course_slot.courses.map((course) => (
                      <tr key={course.id} style={{ textAlign: "center" }}>
                        <td>
                          <Link
                            to={`/programme_curriculum/admin_course/${course.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {course.code}
                          </Link>
                        </td>
                        <td>{course.name}</td>
                        <td>{course.credit}</td>
                        <td>
                          <Link
                            to={`/programme_curriculum/acad_admin_edit_course_form/${course.id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-courses">No Courses Available</div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-container">
          <Link
            to={`/programme_curriculum/admin_edit_course_slot_form/${courseslotId}`}
            className="edit-course-slot-btn"
          >
            Edit Course Slot
          </Link>
          <button
            className="remove-course-slot-btn"
            onClick={() => setShowModal(true)}
          >
            Remove Course Slot
          </button>
          <Link
            to={`/programme_curriculum/acad_admin_add_courseslot_form?semester=${semesterId}&curriculum=${curriculumId}`}
            className="add-course-slot-btn"
          >
            Add Course Slot
          </Link>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              Warning <i className="attention icon" />
            </h2>
            <p>Are you sure you want to remove this course slot?</p>
            <div className="modal-actions">
              <button className="confirm-remove-btn" onClick={handleDelete}>
                Remove
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseSlotDetails;
