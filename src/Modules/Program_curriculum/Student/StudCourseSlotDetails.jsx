import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Assuming you're using react-router for routing
import "../CourseSlotDetails.css"; // Separate CSS file for styling
import { studentFetchCourseSlotDetails } from "../api/api";

function StudCourseSlotDetails() {
  const { id } = useParams(); // Get course slot ID from the URL
  const [courseSlot, setCourseSlot] = useState(null); // State to hold course slot data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getCourseSlotData = async () => {
      try {
        console.log("Fetching course slot data for ID:", id);
        const data = await studentFetchCourseSlotDetails(id);
        setCourseSlot(data);
      } catch (err) {
        console.error("Error fetching course slot data:", err);
        setError("Failed to load course slot data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCourseSlotData();
    }
  }, [id]);

  // Render loading, error, or the main content
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!courseSlot) return <div>No course slot data available</div>;

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
                    </tr>
                  </thead>
                  <tbody>
                    {courseSlot.courses.map((course) => (
                      <tr key={course.id}>
                        <td>
                          <Link
                            to={`/programme_curriculum/student_course/${course.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {course.code}
                          </Link>
                        </td>
                        <td>{course.name}</td>
                        <td>{course.credit}</td>
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
      </div>
    </div>
  );
}

export default StudCourseSlotDetails;
