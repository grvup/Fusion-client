// viewinward.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Button,
  Box,
  Card,
  Table,
  Text,
  Group,
  Select,
  Textarea,
} from "@mantine/core";
import { fetchFacultyViewInwardFilesData } from "../api/api";

// CSS styles as JS objects
const pageStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const boxStyle = {
  border: `1px solid #ddd`,
  padding: "15px",
  marginBottom: "5px",
  borderRadius: "5px",
  backgroundColor: "white",
};

const unifiedBoxStyle = {
  padding: "15px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const textStyle = {
  margin: "5px 0",
};

const boldTextStyle = {
  fontWeight: "bold",
};

// Main Component
function ViewInward() {
  function formatDateWithRounding(isoDateString) {
    const date = new Date(isoDateString);
    // Round minutes up if seconds > 30
    const seconds = date.getSeconds();
    if (seconds > 30) {
      date.setMinutes(date.getMinutes() + 1);
    }
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let formatted = date.toLocaleString("en-US", options);
    // Handle edge cases (e.g., 11:59 -> 12:00)
    if (date.getMinutes() === 60) {
      date.setHours(date.getHours() + 1);
      date.setMinutes(0);
      formatted = date.toLocaleString("en-US", options);
    }
    return formatted.replace(/(AM|PM)/, (match) => match.toLowerCase());
  }
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // Extracting the ID from URL parameters
  const username = useSelector((state) => state.user.roll_no);
  const role = useSelector((state) => state.user.role);

  const [viewfileData, setViewFileData] = useState([]); // State to hold the fetched data
  const [viewcourseData, setViewCourseData] = useState([]); // State to hold the fetched data
  const [activeTab, setActiveTab] = useState("notesheet"); // State to track the active tab
  console.log(viewfileData, viewcourseData);
  useEffect(() => {
    const fetchData = async (uname, des) => {
      try {
        const response = await fetchFacultyViewInwardFilesData(id, uname, des);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setNoteData({
          createdBy: data.data.tracking?.current_id || "",
          designation: data.data.tracking?.current_design || "",
          fileId: data.data.proposal?.id || "",
          subject: data.data.proposal?.subject || "",
          description: data.data.proposal?.description || "",
          sentBy: data.data.tracking?.current_id || "",
          receivedBy: data.data.tracking?.receive_id || "",
          receivedByDesignation: data.data.tracking?.receive_design || "",
          remarks: data.data.tracking?.remarks || "",
          uploader: data.data.proposal?.uploader || "",
          uploaderDesignation: data.data.tracking?.current_design || "",
          discipline: data.data.tracking?.disciplines_name || "",
          disciplineAcronym: data.data.tracking?.disciplines_acronym || "",
          forwarddate: data.data.tracking?.forward_date || "",
        });
        setcourseDetails({
          code: data.data.proposal?.code || "",
          name: data.data.proposal?.name || "",
          // version: data.data.proposal?.version || "1.0",
          contactHours: {
            lecture: data.data.proposal?.lecture_hours || "0",
            tutorial: data.data.proposal?.tutorial_hours || "0",
            lab: data.data.proposal?.pratical_hours || "0",
            discussion: data.data.proposal?.discussion_hours || "0",
            project: data.data.proposal?.project_hours || "0",
          },
          credits: data.data.proposal?.credit || "0",
          prerequisites: {
            Info: data.data.proposal?.pre_requisits || "None",
            Courses: data.data.proposal?.pre_requisit_courses?.length
              ? data.data.proposal.pre_requisit_courses
                  .map(
                    (course) =>
                      `${course.code} - ${course.name}(v${course.version})`,
                  )
                  .join(", ")
              : "None",
          },
          syllabus: data.data.proposal?.syllabus || "",
          evaluationSchema: {
            quiz1: data.data.proposal?.percent_quiz_1 || "0%",
            midSem: data.data.proposal?.percent_midsem || "0%",
            quiz2: data.data.proposal?.percent_quiz_2 || "0%",
            endSem: data.data.proposal?.percent_endsem || "0%",
            project: data.data.proposal?.percent_project || "0%",
            labEvaluation: data.data.proposal?.percent_lab_evaluation || "0%",
            attendance: data.data.proposal?.percent_course_attendance || "0%",
          },
          references: data.data.proposal?.ref_books || "None",
        });
        setViewFileData(data.file_data);
        setViewCourseData(data.course_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(username, role);
  }, [id, username, role]);
  // State to hold the note data

  const [noteData, setNoteData] = useState({
    createdBy: "",
    fileId: "",
    subject: "",
    description: "",
    sentBy: "",
    receivedBy: "",
    remarks: "",
    uploader: "",
    uploaderDesignation: "",
  });
  const [discipline, setDiscipline] = useState(""); // State for discipline selection

  // Temporary Data for File 1
  const file1Data = {
    createdBy: "atul - Professor",
    fileId: "3",
    subject: "Dynamic Subject",
    description: "This is a dynamically fetched description.",
    sentBy: "atul - Professor Aug. 1, 2024, 12:18 p.m.",
    receivedBy: "vkjain - HOD (CSE)",
    remarks: "Dynamically fetched remarks.",
    uploader: "vkjain",
    uploaderDesignation: "HOD (CSE)",
  };

  // Temporary Data for File 2
  const [courseDetails, setcourseDetails] = useState({
    code: "CS101",
    name: "Introduction to Computer Science",
    // version: "1.0",
    contactHours: {
      lecture: "3hrs",
      tutorial: "1hr",
      lab: "2hrs",
      discussion: "1hr",
      project: "1hr",
    },
    credits: "3",
    // prerequisites: 'None',
    prerequisites: { Info: "none", Courses: "none" },
    syllabus: `Introduction to Computer Science, Programming Fundamentals, Data Structures, Algorithms, Basic OOP Concepts.`,
    evaluationSchema: {
      quiz1: "5%",
      midSem: "25%",
      quiz2: "5%",
      endSem: "40%",
      project: "10%",
      labEvaluation: "10%",
      attendance: "5%",
    },
    references: "Book1, Book2",
  });

  // Effect to set noteData when the active tab changes
  useEffect(() => {
    if (activeTab === "notesheet") {
      // setNoteData(file1Data); // Populate noteData with file1Data
    }
  }, [activeTab]);

  const disciplinesData = [
    { value: "CS", label: "Computer Science" },
    { value: "IT", label: "Information Technology" },
    // Add more disciplines as needed
  ];

  return (
    <Box style={pageStyle}>
      {/* Toggle Buttons */}
      <Group position="center" mb="lg" mt="lg">
        <Button
          variant={activeTab === "notesheet" ? "filled" : "outline"}
          onClick={() => setActiveTab("notesheet")}
        >
          Note Sheet
        </Button>
        <Button
          variant={activeTab === "attachments" ? "filled" : "outline"}
          onClick={() => setActiveTab("attachments")}
        >
          Attachments
        </Button>
      </Group>

      <Box className="course-top">
        <Group position="apart">
          <Box>
            <Text style={{ fontWeight: "bold", marginLeft: "10px" }}>
              Created By: {noteData.createdBy} - {noteData.designation}
            </Text>
          </Box>
          <Box>
            <Text style={boldTextStyle}>File ID: {noteData.fileId}</Text>
          </Box>
        </Group>
      </Box>

      <br />

      {/* Conditional Rendering based on Active Tab */}
      {activeTab === "notesheet" && (
        <Box
          style={{
            margin: "0 auto",
            backgroundColor: "#f9f9f9",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* <Box style={lineStyle}></Box> */}

          {/* <Box style={unifiedBoxStyle}>
            <Text style={{ ...textStyle, backgroundColor: '#fff', color: 'black', padding: '10px' }}>
              Subject - {noteData.subject}
            </Text>
             <Textarea value={`Description: ${noteData.description}`} readOnly style={{ backgroundColor: '#fff',marginTop: '10px', border: 'none' }} />
            <Group position="apart" style={{ marginTop: '10px' }}>
            <Text style={textStyle}>Sent By: {noteData.sentBy}</Text>
            <Text style={textStyle}>Received By: {noteData.receivedBy}</Text>
            </Group>
            <Text style={textStyle}>Remarks: {noteData.remarks}</Text>
          </Box> */}

          <Box style={unifiedBoxStyle}>
            <Text
              style={{
                ...textStyle,
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#fff",
                color: "black",
                padding: "10px",
              }}
            >
              <b>Subject</b> - {noteData.subject}
            </Text>
            <Text
              style={{
                ...textStyle,
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
                color: "black",
                padding: "10px",
              }}
            >
              <b>Description</b> - {noteData.description}
            </Text>

            <Box
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#fff",
                marginBottom: "5px",
                marginTop: "5px",
                borderRadius: "4px",
              }}
            >
              {/* <Group position="apart" style={{ marginTop: "10px" }}> */}
              <Text style={textStyle}>
                {" "}
                <b>Sent By:</b> {noteData.sentBy} - {noteData.designation}, {formatDateWithRounding(noteData.forwarddate)}
              </Text>
            </Box>
            <Box
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#fff",
                marginBottom: "5px",
                marginTop: "5px",
                borderRadius: "4px",
              }}
            >
              <Text style={textStyle}>
                <b>Received By:</b> {noteData.receivedBy} -{" "}
                {noteData.receivedByDesignation}
              </Text>
              {/* </Group> */}
            </Box>
            <Box
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#fff",
                marginBottom: "5px",
                borderRadius: "4px",
              }}
            >
              <Text style={textStyle}>
                {" "}
                <b>Remarks:</b> {noteData.remarks}
              </Text>
            </Box>
            {/* </Box> */}

            <Box style={boxStyle}>
              <Text>
                <b>Uploader:</b> {noteData.uploader}
              </Text>
            </Box>

            <Box style={boxStyle}>
              <Text>
                <b>Uploader Designation:</b> {noteData.uploaderDesignation}
              </Text>
            </Box>

            <Box style={boxStyle}>
              {/* <Select
              label={<Text style={boldTextStyle}>Disciplines</Text>}
              value={discipline}
              onChange={(value) => {
                setDiscipline(value);
              }}
              data={disciplinesData}
            /> */}
              <Text>
                <b>Discipline:</b> {noteData.discipline} -{" "}
                {noteData.disciplineAcronym}
              </Text>
            </Box>
          </Box>
        </Box>
      )}

      {activeTab === "attachments" && (
        <Card shadow="sm" padding="lg" className="course-card">
          <Text size="lg" weight={700} className="course-title">
            {courseDetails.code} - {courseDetails.name}
          </Text>
          <hr style={{ width: "80%" }} />

          <Text size="lg" padding="lg" className="course-title">
            Course Proposal Form by - {noteData.createdBy} - {noteData.designation}
          </Text>

          <Table className="course-table" striped highlightOnHover>
            <tbody>
              <tr>
                <td style={{ width: "50%", color: "blue", fontWeight: "bold" }}>
                  Course Code
                </td>
                <td style={{ width: "50%" }}>{courseDetails.code}</td>
              </tr>
              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>
                  Course Name
                </td>
                <td>{courseDetails.name}</td>
              </tr>

              <tr>
                <td style={{ padding: "0" }}>
                  <tr>
                    <td
                      rowSpan="5"
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      contactHours
                    </td>
                    <td
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Lecture
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Tutorial
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Lab
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Discussion
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Project
                    </td>
                  </tr>
                </td>

                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.lecture}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.tutorial}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.lab}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.discussion}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.contactHours.project}
                  </td>
                </tr>
              </tr>
              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>Credits</td>
                <td>{courseDetails.credits}</td>
              </tr>

              <tr>
                <td style={{ padding: "0" }}>
                  <tr>
                    <td
                      rowSpan="2"
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Pre-requisites
                    </td>
                    <td
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Info
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Courses
                    </td>
                  </tr>
                </td>

                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.prerequisites.Info}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.prerequisites.Courses}
                  </td>
                </tr>
              </tr>

              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>Syllabus</td>
                <td>{courseDetails.syllabus}</td>
              </tr>

              <tr>
                <td style={{ padding: "0" }}>
                  <tr>
                    <td
                      rowSpan="7"
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Evaluation Schema
                    </td>
                    <td
                      style={{
                        width: "10%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Quiz-1
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Mid-Sem-Exam
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Quiz-2
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      End-Sem-Exam
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Project
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Lab
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Course Attendance
                    </td>
                  </tr>
                </td>

                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.quiz1}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.midSem}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.quiz2}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.endSem}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.project}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.labEvaluation}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "3%", backgroundColor: "white" }}>
                    {courseDetails.evaluationSchema.attendance}
                  </td>
                </tr>
              </tr>

              {/* <tr>
                <td>Evaluation Schema</td>
                <td>
                  <div className="evaluation-schema">
                    <div className="evaluation-row">Quiz 1: {courseDetails.evaluationSchema.quiz1}</div>
                    <div className="evaluation-row">Mid-Sem Exam: {courseDetails.evaluationSchema.midSem}</div>
                    <div className="evaluation-row">Quiz 2: {courseDetails.evaluationSchema.quiz2}</div>
                    <div className="evaluation-row">End-Sem Exam: {courseDetails.evaluationSchema.endSem}</div>
                    <div className="evaluation-row">Project: {courseDetails.evaluationSchema.project}</div>
                    <div className="evaluation-row">Lab Evaluation: {courseDetails.evaluationSchema.labEvaluation}</div>
                    <div className="evaluation-row">Course Attendance: {courseDetails.evaluationSchema.attendance}</div>
                  </div>
                </td>
              </tr> */}

              <tr>
                <td style={{ color: "blue", fontWeight: "bold" }}>
                  References & Books
                </td>
                <td>
                  {courseDetails.references}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
      )}

      <style>{`
        .course-detail-container {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 20px;
        }

        .course-top {
            display: flex;
            align-items: flex-start;
            border-radius: 15px;
            gap: 20px;
            padding: 20px 0;
            background: rgb(249, 249, 249);
            box-shadow:rgba(0, 0, 0, 0.1) 0px 0px 15px;
        }

        .course-card {
          flex: 1;
          background-color: white;
          border-radius: 15px;
          padding: 20px;
        }

        .course-title {
          text-align: center;
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .course-table {
          width: 100%;
          margin-bottom: 20px;
          border-collapse: collapse;
        }

        .course-table td {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
        }

        .contact-hours, .evaluation-schema {
          display: flex;
          flex-direction: column;
        }

        .contact-row, .evaluation-row {
          padding: 8px;
          border: 1px solid gray;
          background-color: #f8f9fa;
        }

      
      `}</style>
    </Box>
  );
}

// CSS styles as JS objects

export default ViewInward;
