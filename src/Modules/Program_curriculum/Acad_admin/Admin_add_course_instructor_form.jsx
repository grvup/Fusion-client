import React, { useState } from "react";
import {
  Select,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
  Flex,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Admin_add_course_instructor() {
  const [activeSection, setActiveSection] = useState("manual");
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    initialValues: {
      courseName: "",
      instructor: "",
      year: 2024,
      semester: "",
      runningBatch: false,
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFile(file);
        alert(`File "${file.name}" uploaded successfully!`);
        setIsUploading(false);
      }, 1000);
    } else {
      alert("Please choose a file to upload.");
    }
  };

  const handleCancel = () => {
    setFile(null);
    setUploadedFile(null);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          width: "100%",
          margin: "0 0 0 -3.2vw",
        }}
      >
        <div
          style={{
            maxWidth: "290vw",
            width: "100%",
            display: "flex",
            gap: "2rem",
            padding: "2rem",
            flex: 4,
          }}
        >
          {/* Form Section */}
          <div style={{ flex: 4 }}>
            <form
              onSubmit={form.onSubmit(handleSubmit)}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              <Text size="xl" weight={700} align="center">
                Course Instructor Form
              </Text>

              <Flex justify="flex-start" align="center" mb={10}>
                <Button
                  variant={activeSection === "manual" ? "filled" : "outline"}
                  onClick={() => setActiveSection("manual")}
                  style={{ marginRight: "10px" }}
                >
                  Manual Form
                </Button>
                <Button
                  variant={activeSection === "excel" ? "filled" : "outline"}
                  onClick={() => setActiveSection("excel")}
                  style={{ marginRight: "10px" }}
                >
                  Upload via Excel
                </Button>
              </Flex>

              <Stack spacing="lg">
                {activeSection === "manual" ? (
                  <>
                    <Select
                      label="Select Course"
                      placeholder="-- Select Course Name --"
                      data={["Course 1", "Course 2", "Course 3"]}
                      value={form.values.courseName}
                      onChange={(value) =>
                        form.setFieldValue("courseName", value)
                      }
                      required
                    />

                    <Select
                      label="Select Instructor"
                      placeholder="-- Select Instructor --"
                      data={[
                        "Instructor 1",
                        "Instructor 2",
                        "Instructor 3",
                        "Instructor 4",
                      ]}
                      value={form.values.instructor}
                      onChange={(value) =>
                        form.setFieldValue("instructor", value)
                      }
                      required
                    />

                    <NumberInput
                      label="Select Year"
                      defaultValue={2024}
                      value={form.values.year}
                      onChange={(value) => form.setFieldValue("year", value)}
                      required
                    />

                    <Select
                      label="Select Semester Number"
                      placeholder="-- Select Semester --"
                      data={["1", "2", "3", "4", "5", "6", "7", "8"]}
                      value={form.values.semester}
                      onChange={(value) =>
                        form.setFieldValue("semester", value)
                      }
                      required
                    />

                    <Group position="right" mt="lg">
                      <Button variant="outline" className="cancel-btn">
                        Cancel
                      </Button>
                      <Button type="submit" className="submit-btn">
                        Submit
                      </Button>
                    </Group>
                  </>
                ) : (
                  <>
                    <Text size="xl" weight={700}>
                      Upload Course Instructors via Excel
                    </Text>

                    <FileInput
                      label="Choose File"
                      placeholder="No file chosen"
                      onChange={setFile}
                      disabled={uploadedFile !== null}
                      style={{
                        width: "250px", // Set a fixed width
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    />

                    <Group position="right" mt="lg">
                      <Button
                        variant="outline"
                        className="cancel-btn"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>

                      {!uploadedFile ? (
                        <Button
                          onClick={handleUpload}
                          variant="filled"
                          color="blue"
                          disabled={isUploading || !file}
                        >
                          {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                      ) : (
                        <Button
                          component="a"
                          href={URL.createObjectURL(uploadedFile)}
                          download={uploadedFile.name}
                          variant="filled"
                          color="green"
                        >
                          See Uploaded File
                        </Button>
                      )}
                    </Group>
                  </>
                )}
              </Stack>
            </form>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {" "}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Admin_add_course_instructor;
