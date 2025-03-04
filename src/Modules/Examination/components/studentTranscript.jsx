import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const styles = {
  container: {
    fontSize: "13px",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    borderRadius: "15px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
    borderLeft: "10px solid #1E90FF",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    gap: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    border: "1px solid #ddd",
    textAlign: "center",
    padding: "8px",
    fontWeight: "bold",
    backgroundColor: "rgb(220, 220, 220)",
  },
  td: {
    border: "1px solid #ddd",
    textAlign: "center",
    padding: "8px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#1E90FF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

function StudentTranscript() {
  const studentData = {
    rollNo: "20BCS143",
    name: "Kshitiz Verma",
    programme: "Bachelor of Technology",
    discipline: "Computer Science & Engineering",
    semester: "VI",
    academicYear: "2023-24",
    courses: [
      {
        courseNo: "CS1001",
        courseTitle: "DSA",
        credits: "4",
        grade: "A",
      },
      {
        courseNo: "CS1002",
        courseTitle: "DBMS",
        credits: "4",
        grade: "A+",
      },
      {
        courseNo: "CS1003",
        courseTitle: "Computer Networks",
        credits: "4",
        grade: "A+",
      },
      {
        courseNo: "CS1004",
        courseTitle: "Operating System",
        credits: "4",
        grade: "A",
      },
      {
        courseNo: "CS1005",
        courseTitle: "Software Engineering",
        credits: "4",
        grade: "A",
      },
    ],
    semesterPerformance: [
      { semester: "I", spi: "7.5", cpi: "7.5" },
      { semester: "II", spi: "6.7", cpi: "7.0" },
      { semester: "III", spi: "6.7", cpi: "6.9" },
      { semester: "IV", spi: "6.4", cpi: "6.8" },
      { semester: "V", spi: "7.6", cpi: "6.9" },
      { semester: "VI", spi: "6.4", cpi: "6.8" },
      { semester: "VII", spi: "4.1", cpi: "6.5" },
      { semester: "VIII", spi: "7.6", cpi: "6.6" },
    ],
    finalCPI: "9",
  };

  const generatePDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.setFont("helvetica");

    // Header with student info
    doc.setFontSize(13);
    doc.text("Student Transcript", 105, 10, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Roll No: ${studentData.rollNo}`, 20, 20);
    doc.text(`Student Name: ${studentData.name}`, 20, 30);
    doc.text(`Programme: ${studentData.programme}`, 120, 20);
    doc.text(`Discipline: ${studentData.discipline}`, 120, 30);
    doc.text(`Semester: ${studentData.semester}`, 120, 40);
    doc.text(`Academic Year: ${studentData.academicYear}`, 120, 50);

    // Courses Table
    doc.autoTable({
      startY: 60,
      head: [["Course No.", "Course Title", "Credits", "Grade"]],
      body: studentData.courses.map((course) => [
        course.courseNo,
        course.courseTitle,
        course.credits,
        course.grade,
      ]),
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
    });

    // Semester Performance Table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [
        [
          "Semester",
          ...studentData.semesterPerformance.map((sem) => sem.semester),
          "Final",
        ],
      ],
      body: [
        ["SPI", ...studentData.semesterPerformance.map((sem) => sem.spi), ""],
        [
          "CPI",
          ...studentData.semesterPerformance.map((sem) => sem.cpi),
          studentData.finalCPI,
        ],
      ],
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
    });

    doc.save(`Transcript_${studentData.rollNo}.pdf`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <p>
            <strong>Roll No:</strong> {studentData.rollNo}
          </p>
          <p>
            <strong>Student Name:</strong> {studentData.name}
          </p>
          <p>
            <strong>Programme:</strong> {studentData.programme}
          </p>
        </div>
        <div>
          <p>
            <strong>Discipline:</strong> {studentData.discipline}
          </p>
          <p>
            <strong>Semester:</strong> {studentData.semester}
          </p>
          <p>
            <strong>Academic Year:</strong> {studentData.academicYear}
          </p>
        </div>
      </div>

      {/* Courses Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Course No.</th>
            <th style={styles.th}>Course Title</th>
            <th style={styles.th}>Credits</th>
            <th style={styles.th}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {studentData.courses.map((course, index) => (
            <tr key={index}>
              <td style={styles.td}>{course.courseNo}</td>
              <td style={styles.td}>{course.courseTitle}</td>
              <td style={styles.td}>{course.credits}</td>
              <td style={styles.td}>{course.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        style={{
          padding: "10px",
          backgroundColor: "rgb(220, 220, 220)",
          display: "flex",
          alignContent: "center",
          gap: "30px",
        }}
      >
        SPI <span> 9.4 </span>
      </p>
      <button onClick={generatePDF} style={styles.button}>
        Download as PDF
      </button>
    </div>
  );
}

export default StudentTranscript;
