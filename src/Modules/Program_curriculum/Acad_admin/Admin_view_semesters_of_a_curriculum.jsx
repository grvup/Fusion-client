import { ActionIcon, Table } from "@mantine/core";
import { Bell } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Admin_view_semesters_of_a_curriculum.css";
import { adminFetchCurriculumSemesters } from "../api/api";
/* eslint-disable jsx-a11y/control-has-associated-label */

function Admin_view_semesters_of_a_curriculum() {
  // Demo data (matches the example layout)
  const curriculum = {
    name: "CSE UG Curriculum",
    no_of_semester: 8,
    batches: ["2020", "2021"],
  };

  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddCourseSlotHovered, setIsAddCourseSlotHovered] = useState(false);
  const [isEditBatchHovered, setIsEditBatchHovered] = useState(false);
  const [isLinkedBatchHovered, setIsLinkedBatchHovered] = useState(false);

  const [isInstigateSemesterHovered, setIsInstigateSemesterHovered] =
    useState(false);

  const [searchParams] = useSearchParams();
  const curriculumId = searchParams.get("curriculum");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheKey = `CurriculumCache_${curriculumId}`;
        const timestampKey = `CurriculumTimestamp_${curriculumId}`;
        const cacheChangeKey = `CurriculumCacheChange_${curriculumId}`;

        const cachedData = localStorage.getItem(cacheKey);
        const timestamp = localStorage.getItem(timestampKey);
        const isCacheValid =
          timestamp && Date.now() - parseInt(timestamp, 10) < 10 * 60 * 1000;
        const cachedDataChange = localStorage.getItem(cacheChangeKey);

        if (cachedData && isCacheValid && cachedDataChange === "false") {
          setCurriculumData(JSON.parse(cachedData));
        } else {
          const token = localStorage.getItem("authToken");
          if (!token) throw new Error("Authorization token not found");

          const response = await adminFetchCurriculumSemesters(
            curriculumId,
            token,
          );
          setCurriculumData(response);

          localStorage.setItem(cacheKey, JSON.stringify(response));
          localStorage.setItem(timestampKey, Date.now().toString());
          localStorage.setItem(cacheChangeKey, "false");
        }
      } catch (error) {
        console.error("Error fetching curriculum data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [curriculumId]);

  // console.log(curriculumData)

  if (loading) return <div>Loading...</div>;
  const { curriculum_name, version, batches, unlikedbatches } = curriculumData;
  // console.log(batches)
  const { semesters } = curriculumData;
  const semesterWiseSlots = curriculumData.semesters.reduce((acc, semester) => {
    acc[`Semester ${semester.semester_no}`] = semester.slots;
    return acc;
  }, {});
  // console.log(semesterWiseSlots)
  const semester_credits = semesters.map((semester) => semester.credits);
  // console.log(semester_credits)
  // const semesterscnt = semesters.map(
  //   (semester) => `Semester ${semester.semester_no}`,
  // );
  const semesterscnt = semesters.map((semester) => ({
    label: `Semester ${semester.semester_no}`, // Display label
    value: `${semester.id}`, // Semester ID
  }));
  const maxSlots = Math.max(
    ...Object.values(semesterWiseSlots).map((slots) => slots.length),
  );

  return (
    <div style={{ position: "relative" }}>
      <h2>{curriculum_name} Table</h2>

      <button
        className="options-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Options
      </button>

      {/* Options visible on hover */}
      {isHovered && (
        <div
          className={`options-dropdown ${isHovered ? "open" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="dropdown-section">
            <h4 className="section-title">CURRICULUM</h4>
            <Link
              to={`/programme_curriculum/admin_edit_curriculum_form?curriculum=${
                curriculumId
              }`}
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btn green-btn">
                EDIT CURRICULUM
              </button>
            </Link>
            {/* <div
              className="instigate-semester"
              onMouseEnter={() => setIsInstigateSemesterHovered(true)}
              onMouseLeave={() => setIsInstigateSemesterHovered(false)}
            >
              <button className="add-instigate-semester-button">
                INSTIGATE SEMESTER
              </button>

              {isInstigateSemesterHovered && (
                <div className="instigate-semester-dropdown">
                  {semesterscnt.map((semester, index) => (
                    <Link
                      to={`/programme_curriculum/acad_admin_instigate_form?semester=${
                        semester.value
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <div key={index} className="instigate-semester-option">
                        <text>{semester.label}</text>
                        <ActionIcon variant="light">
                          <Bell size={20} />
                        </ActionIcon>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div> */}

            <div
              className="add-course-slot"
              onMouseEnter={() => setIsAddCourseSlotHovered(true)}
              onMouseLeave={() => setIsAddCourseSlotHovered(false)}
            >
              <button className="add-course-slot-button">
                ADD COURSE SLOT
              </button>

              {/* Semester options visible on hover */}
              {isAddCourseSlotHovered && (
                <div className="semester-dropdown">
                  {semesterscnt.map((semester, index) => (
                    <Link
                      to={`/programme_curriculum/acad_admin_add_courseslot_form?semester=${
                        semester.value
                      }&curriculum=${curriculumId}`} // Added curriculumId here
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <div key={index} className="semester-option">
                        <text>{semester.label}</text>
                        <text>+</text>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dropdown-section">
            <h4 className="section-title">BATCHES</h4>
            {batches.length > 0 ? (
              <button className="dropdown-btn blue-btn" disabled>
                BATCH ALREADY ATTACHED
              </button>
            ) : (
              <Link
                to={`/programme_curriculum/acad_admin_add_batch_form?curriculum_id=${curriculumId}`}
                style={{ textDecoration: "none" }}
              >
                <button className="dropdown-btn blue-btn">NEW BATCH</button>
              </Link>
            )}
            {/* <a
              href={`/programme_curriculum/acad_admin_add_batch_form?curriculum_id=${curriculumId}`}
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btn blue-btn">NEW BATCH</button>
            </a> */}
            {/* <a
              href="/programme_curriculum/admin_edit_batch_form"
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btn blue-btn">EDIT BATCH</button>
            </a> */}
            <div
              className="edit-batch"
              onMouseEnter={() => setIsEditBatchHovered(true)}
              onMouseLeave={() => setIsEditBatchHovered(false)}
            >
              <button className="dropdown-btn green-btn">EDIT BATCH</button>
              {/* Semester options visible on hover */}
              {isEditBatchHovered && (
                <div className="editbatch-dropdown">
                  {batches.length > 0 ? (
                    batches.map((batch, index) => (
                      <Link
                        to={`/programme_curriculum/admin_edit_batch_form?batch=${batch.id}`}
                        style={{ textDecoration: "none" }}
                        key={index} // Move the key here to avoid React warning
                      >
                        <div className="editbatch-option">
                          {batch.name} {batch.discipline} {batch.year}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="editbatch-option">
                      No batch is linked to this curriculum
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* <a
              href="/programme_curriculum/admin_edit_batch_form"
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btn blue-btn">LINK BATCH</button>
            </a> */}
            <div
              className="Link-slot"
              onMouseEnter={() => setIsLinkedBatchHovered(true)}
              onMouseLeave={() => setIsLinkedBatchHovered(false)}
            >
              <button className="dropdown-btn green-btn">LINK BATCH</button>
              {/* Semester options visible on hover */}
              {isLinkedBatchHovered && (
                <div className="Linkbatch-dropdown">
                  {batches.length > 0 ? (
                    <div className="editbatch-option">Batch already linked</div>
                  ) : (
                    unlikedbatches.map((batch, index) => (
                      <Link
                        to={`/programme_curriculum/admin_edit_batch_form?batch=${batch.id}&curriculum_id=${curriculumId}`}
                        style={{ textDecoration: "none" }}
                        key={index} // Move the key here to avoid React warning
                      >
                        <div className="Linkbatch-option">
                          {batch.name} {batch.discipline} {batch.year}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* <button className="dropdown-btn black-btn">LINK BATCH</button> */}
          </div>
        </div>
      )}
      <div className="table-container">
        <Table
          striped
          highlightOnHover
          style={{
            borderCollapse: "collapse",
            textAlign: "center",
            width: isHovered ? "calc(100% - 15vw)" : "100%", // Shrink table width when hovered
            transition: "width 0.3s ease", // Smooth transition
          }}
        >
          <thead>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }} />
              <td
                colSpan={semesterscnt.length}
                style={{ border: "1px solid black" }}
              >
                <h2>
                  {curriculum_name} &nbsp; v{version}
                </h2>
              </td>
            </tr>
            {batches.length > 0 && (
              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }} />
                <td
                  colSpan={curriculum.no_of_semester}
                  style={{ border: "1px solid black" }}
                >
                  <h4>
                    Batches:&nbsp;&nbsp;&nbsp;
                    {batches.map((batch, index) => (
                      <span key={index}>
                        {batch.name} {batch.discipline} {batch.year}
                        ,&nbsp;&nbsp;&nbsp;
                      </span>
                    ))}
                  </h4>
                </td>
              </tr>
            )}
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }} />
              {semesters.map((semester, index) => (
                <td key={index} style={{ border: "1px solid black" }}>
                  <Link
                    to={`/programme_curriculum/semester_info?semester_id=${semester.id}&curriculum_id=${curriculumId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <strong style={{ color: "blue", fontSize: "13px" }}>
                      Semester {semester.semester_no}
                    </strong>
                  </Link>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxSlots }).map((_, slotIndex) => (
              <tr key={slotIndex} style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>
                  Slot {slotIndex + 1}
                </td>
                {Object.values(semesterWiseSlots).map(
                  (slotRow, semesterIndex) => {
                    const slot = slotRow[slotIndex];
                    return (
                      <td
                        key={semesterIndex}
                        style={{ border: "1px solid black" }}
                      >
                        {slot && slot.name ? (
                          slot.courses.length === 1 ? (
                            <div>
                              <Link
                                to={`/programme_curriculum/course_slot_details?course_slot=${slot.id}&curriculum=${curriculumId}&semester=${semesters[semesterIndex].id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <p>
                                  <strong style={{ fontSize: "10px" }}>
                                    {slot.courses[0].code}
                                  </strong>
                                  <br />
                                  (L: {slot.courses[0].lecture_hours}, T:{" "}
                                  {slot.courses[0].tutorial_hours}, C:{" "}
                                  {slot.courses[0].credit})
                                </p>
                              </Link>
                            </div>
                          ) : (
                            <div>
                              <Link
                                to={`/programme_curriculum/course_slot_details?course_slot=${slot.id}&curriculum=${curriculumId}&semester=${semesters[semesterIndex].id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <strong style={{ fontSize: "10px" }}>
                                  {slot.name}
                                </strong>
                              </Link>
                            </div>
                          )
                        ) : (
                          <div />
                        )}
                      </td>
                    );
                  },
                )}
              </tr>
            ))}

            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>
                <strong style={{ color: "blue", fontSize: "12px" }}>
                  Start Date
                </strong>
              </td>
              {semesters.map((semester, index) => (
                <td key={index} style={{ border: "1px solid black" }}>
                  {semester.start_semester || "N/A"}
                </td>
              ))}
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>
                <strong style={{ color: "blue", fontSize: "12px" }}>
                  End Date
                </strong>
              </td>
              {semesters.map((semester, index) => (
                <td key={index} style={{ border: "1px solid black" }}>
                  {semester.end_semester || "N/A"}
                </td>
              ))}
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>
                <strong style={{ color: "blue", fontSize: "12px" }}>
                  Total Credits
                </strong>
              </td>
              {semester_credits.map((credit, index) => (
                <td key={index} style={{ border: "1px solid black" }}>
                  {credit}
                </td>
              ))}
            </tr>
            <tr style={{ border: "1px solid black", padding: "12px 45%" }}>
              <td style={{ border: "1px solid black" }}>
                <strong style={{ color: "blue", fontSize: "12px" }}>
                  Instigated
                </strong>
              </td>
              {semesters.map((semester, index) => (
                <td key={index} style={{ border: "1px solid black" }}>
                  {semester.is_instigated ? (
                    <div style={{ color: "green" }}>
                      <i className="icon checkmark" /> Yes
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      <i className="attention icon" /> Not Yet
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Admin_view_semesters_of_a_curriculum;
