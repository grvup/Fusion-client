import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, ScrollArea, Container, Button } from "@mantine/core";
import "./Faculty_view_all_courses.css";

const CURRICULUM_DATA = {
  info: {
    programName: "B.Des",
    programCategory: "UG",
    programBeginYear: "2021",
  },
  workingCurriculums: [
    {
      name: "Design UG Curriculum",
      version: "1.0",
      batch: ["B.Des 2021", "B.Des 2022"],
      semesters: 8,
    },
    {
      name: "Design UG Curriculum",
      version: "2.0",
      batch: ["B.Des 2023"],
      semesters: 8,
    },
  ],
};

function BDesView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  const handleBack = () => {
    navigate(-1);
  };

  const renderInfo = () => (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ fontSize: "24px", textAlign: "left", marginBottom: "20px" }}>
        B.Des
      </h2>
      <Table
        highlightOnHover
        verticalSpacing="sm"
        style={{ border: "2px solid #1e90ff" }} // Blue border
      >
        <tbody>
          <tr style={{ backgroundColor: "#15ABFF54" }}>
            <td
              style={{ fontWeight: "bold", padding: "10px", textAlign: "left" }}
            >
              Programme Category
            </td>
            <td style={{ padding: "10px" }}>
              {CURRICULUM_DATA.info.programCategory}
            </td>
          </tr>
          <tr style={{ backgroundColor: "#fff" }}>
            <td
              style={{ fontWeight: "bold", padding: "10px", textAlign: "left" }}
            >
              Programme Name
            </td>
            <td style={{ padding: "10px" }}>
              {CURRICULUM_DATA.info.programName}
            </td>
          </tr>
          <tr style={{ backgroundColor: "#15ABFF1C" }}>
            <td
              style={{ fontWeight: "bold", padding: "10px", textAlign: "left" }}
            >
              Programme Begin Year
            </td>
            <td style={{ padding: "10px" }}>
              {CURRICULUM_DATA.info.programBeginYear}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

  const renderWorkingCurriculums = () => (
    <div style={{ marginTop: "20px" }}>
      <ScrollArea>
        <Table
          highlightOnHover
          verticalSpacing="sm"
          style={{ border: "2px solid #1e90ff" }} // Blue border
        >
          <thead>
            <tr style={{ backgroundColor: "#15ABFF54" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Version</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Batch</th>
              <th style={{ padding: "10px", textAlign: "left" }}>
                No. of Semesters
              </th>
            </tr>
          </thead>
          <tbody>
            {CURRICULUM_DATA.workingCurriculums.map((curr, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#fff" : "#15ABFF1C",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#15ABFF1C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    idx % 2 === 0 ? "#fff" : "#15ABFF1C";
                }}
              >
                <td style={{ padding: "10px" }}>
                  <a
                    href={`/programme_curriculum/view_curriculum?curriculum=${curr.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {curr.name}
                  </a>
                </td>
                <td style={{ padding: "10px" }}>{curr.version}</td>
                <td
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {curr.batch.map((b, i) => (
                    <React.Fragment key={i}>
                      <span
                        style={{
                          marginRight: "10px",
                          textDecoration: "none",
                        }}
                      >
                        {b}
                      </span>
                      {i < curr.batch.length - 1 && (
                        <span style={{ margin: "0 10px" }}>|</span>
                      )}
                    </React.Fragment>
                  ))}
                </td>
                <td style={{ padding: "10px" }}>{curr.semesters}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );

  const renderObsoleteCurriculums = () => (
    <div style={{ marginTop: "20px" }}>
      <Table
        highlightOnHover
        verticalSpacing="sm"
        style={{ border: "2px solid #1e90ff" }} // Blue border
      >
        <thead>
          <tr style={{ backgroundColor: "#15ABFF54" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Version</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Batch</th>
            <th style={{ padding: "10px", textAlign: "left" }}>
              No. of Semesters
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No Curriculum Available
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

  return (
    <Container
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        marginLeft: "0",
        width: "100%",
      }}
    >
      <Button onClick={handleBack} style={{ marginBottom: "20px" }}>
        Back
      </Button>

      <div style={{ marginBottom: "20px" }}>
        <Button
          variant={activeTab === "info" ? "filled" : "outline"}
          onClick={() => setActiveTab("info")}
          style={{ marginRight: "8px" }}
        >
          B.Des Info
        </Button>
        <Button
          variant={activeTab === "working" ? "filled" : "outline"}
          onClick={() => setActiveTab("working")}
          style={{ marginRight: "8px" }}
        >
          Working Curriculums
        </Button>
        <Button
          variant={activeTab === "obsolete" ? "filled" : "outline"}
          onClick={() => setActiveTab("obsolete")}
          style={{ marginRight: "8px" }}
        >
          Obsolete Curriculums
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {activeTab === "info" && renderInfo()}
        {activeTab === "working" && renderWorkingCurriculums()}
        {activeTab === "obsolete" && renderObsoleteCurriculums()}
      </div>
    </Container>
  );
}

export default BDesView;
