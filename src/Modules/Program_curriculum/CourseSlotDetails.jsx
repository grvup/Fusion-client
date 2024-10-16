import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for routing
import "./CourseSlotDetails.css"; // Separate CSS file for styling

function CourseSlotDetails() {
  const [courseSlot, setCourseSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulate fetching the course slot data from a server with dummy data
  useEffect(() => {
    const fetchDummyData = () => {
      const dummyCourseSlot = {
        id: 1,
        name: "NS1",
        semester: "CSE UG Curriculum v1.0, sem-1",
        type: "Natural Science",
        course_slot_info: "Sem 1, B.Tech UG",
        duration: 2,
        min_registration_limit: 10,
        max_registration_limit: 100,
        courses: [{ id: 101, code: "NS101", name: "Mathematics-I", credit: 4 }],
      };

      setCourseSlot(dummyCourseSlot);
    };

    fetchDummyData();
  }, []);

  const handleDelete = () => {
    setShowModal(false);
    alert("Course Slot Deleted (simulation).");
  };

  if (!courseSlot) return <div className="loading">Loading...</div>;

  return (
    <div className="flex-container">
      {/* Course Slot Details */}
      <div style={{display:'flex'}}>
      <div className="course-slot-container">

        
        <div className="course-slot-content">
          <div className="slot-description">
            <table className="course-info-table">
              <tbody>
                <tr>
                  <td colSpan="4">
                    <h2>Course Slot: {courseSlot.name}</h2>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <h3>Semester: {courseSlot.semester}</h3>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <h4>Type: {courseSlot.type}</h4>
                  </td>
                </tr>
                <tr className="course-slot-row">
                  <td>Info</td>
                  <td colSpan="3">{courseSlot.course_slot_info}</td>
                </tr>
                <tr className="course-slot-row">
                  <td>Duration</td>
                  <td colSpan="3">{courseSlot.duration} Semesters</td>
                </tr>
                <tr className="course-slot-row">
                  <td>Min Registration Limit</td>
                  <td>{courseSlot.min_registration_limit}</td>
                  <td>Max Registration Limit</td>
                  <td>{courseSlot.max_registration_limit}</td>
                </tr>
              </tbody>
            </table>

            {courseSlot.courses.length > 0 ? (
              <table className="course-list-table">
                <thead>
                  <tr className="table-header">
                    <td>Course Code</td>
                    <td>Course Name</td>
                    <td>Credits</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {courseSlot.courses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <Link to={`/courses/${course.id}`}>{course.code}</Link>
                      </td>
                      <td>{course.name}</td>
                      <td>{course.credit}</td>
                      <td>
                        <Link
                          to={`/edit-course/${course.id}`}
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
          to={`/edit-course-slot/${courseSlot.id}`}
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
          to={`/add-course-slot?semester_id=${courseSlot.semester}`}
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
