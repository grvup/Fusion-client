import React, { useState } from "react";
import { Breadcrumbs, Anchor, Group, Text, Switch, Button, Textarea } from "@mantine/core";

function InstigateSemesterForm() {
  const [startSemester, setStartSemester] = useState("");
  const [endSemester, setEndSemester] = useState("");
  const [instigateSemester, setInstigateSemester] = useState(false);
  const [semesterInfo, setSemesterInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      startSemester,
      endSemester,
      instigateSemester,
      semesterInfo,
    });
  };

  const breadcrumbItems = [
    { title: "Program and Curriculum", href: "#" },
    { title: "Curriculums", href: "#" },
    { title: "CSE UG Curriculum", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <div style={containerStyle}>
      {/* <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

      <Group spacing="xs" className="program-options" mt="md">
        <Text>Programmes</Text>
        <Text className="active">Curriculums</Text>
        <Text>Courses</Text>
        <Text>Disciplines</Text>
        <Text>Batches</Text>
      </Group> */}

      <div style={formContainerStyle}>
        {/* Heading for Instigate Form */}
        <h1 style={mainHeadingStyle}>Instigate Semester Form</h1>
        
        <h2 style={headerStyle}>CSE UG Curriculum v1.0, sem-1</h2>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formRowStyle}>
            <div style={formGroupStyle}>
              <label htmlFor="startSemester">Start Semester:</label>
              <input
                type="date"
                id="startSemester"
                value={startSemester}
                onChange={(e) => setStartSemester(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label htmlFor="endSemester">End Semester:</label>
              <input
                type="date"
                id="endSemester"
                value={endSemester}
                onChange={(e) => setEndSemester(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={checkboxContainerStyle}>
            <label htmlFor="instigateSemester">Instigate Semester:</label>
            <Switch
              id="instigateSemester"
              checked={instigateSemester}
              onChange={() => setInstigateSemester(!instigateSemester)}
              style={checkboxStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="semesterInfo">Information:</label>
            <Textarea
              id="semesterInfo"
              value={semesterInfo}
              onChange={(e) => setSemesterInfo(e.target.value)}
              placeholder="Semester Information"
              style={textareaStyle}
            />
          </div>

          <div style={buttonContainerStyle}>
            <Button
              variant="outline"
              onClick={() => console.log("Cancelled")}
              style={cancelButtonStyle}
            >
              Cancel
            </Button>
            <Button type="submit" style={submitButtonStyle}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Inline CSS styles
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start", // Align content to the left
  padding: "20px",
};

const formContainerStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "70vw", // Optional: Restrict max width
  margin: "20px 0", // Adjust top-bottom margin
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

};

const mainHeadingStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "10px",
  textAlign: "center", // Align heading to the left
};

const headerStyle = {
  textAlign: "left", // Align text to the left
  marginBottom: "20px",
  fontSize: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const formRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px", // Space between form fields
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const checkboxContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
};

const checkboxStyle = {
  marginLeft: "10px",
};

const textareaStyle = {
  padding: "10px",
  borderRadius: "4px",
  // border: "1px solid #ccc",  
  height: "80px",
  margin:'0 0vw 0 -0.75vw'
};

const buttonContainerStyle = {
  display: "flex",
  
};

const cancelButtonStyle = {
  backgroundColor: "#ccc",
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  margin:'0 2vw 0 0vw'
};

const submitButtonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

export default InstigateSemesterForm;
