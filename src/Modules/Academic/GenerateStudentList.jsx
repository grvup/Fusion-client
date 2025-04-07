import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Select,
  Tabs,
  Box,
  Space,
  TextInput,
  Loader,
} from "@mantine/core";
import axios from "axios";
import {
  generatexlsheet,
  getAllCourses,
  batchesRoute,
  generateprereport,
} from "../../routes/academicRoutes";

function GenerateStudentList() {
  const [activeTab, setActiveTab] = useState("rolllist");
  const [academicYear, setAcademicYear] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [batchOptions, setBatchOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("authToken"); // Get token from local storage
      if (!token) {
        setLoading(false); // Stop loading
        throw new Error("No token found"); // Handle the case where the token is not available
      }

      try {
        const response = await axios.get(getAllCourses, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data);
        setCourseOptions(response.data);
      } catch (error) {
        console.error("Error getting all courses:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    const fetchBatches = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false); // Stop loading
        return;
      }
      try {
        const response = await axios.get(batchesRoute, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Fetched Batches:", response.data);
        setBatchOptions(response.data.batches);
      } catch (fetchError) {
        console.error(fetchError);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    if (activeTab === "rolllist") {
      getCourses();
    } else {
      fetchBatches();
    }
  }, [activeTab]);

  const handleGenerateList = async () => {
    setLoading(true); // Start loading
    const token = localStorage.getItem("authToken"); // Get token from local storage
    if (!token) {
      setLoading(false); // Stop loading
      throw new Error("No token found"); // Handle the case where the token is not available
    }

    try {
      const response = await axios.post(
        generatexlsheet,
        {
          course,
          batch: academicYear,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${course}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error getting roll list:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const generatePreRegistrationReport = async () => {
    setLoading(true); // Start loading
    const token = localStorage.getItem("authToken"); // Get token from local storage
    if (!token) {
      setLoading(false); // Stop loading
      throw new Error("No token found"); // Handle the case where the token is not available
    }

    try {
      const response = await axios.post(
        generateprereport,
        {
          semester_no: semester,
          batch_branch: batch,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${batch}-${semester}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error getting roll list:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <Tabs.List style={{ justifyContent: "center" }}>
          <Tabs.Tab
            value="rolllist"
            style={{
              fontSize: "16px",
              padding: "12px 20px",
              minWidth: "100px",
            }}
          >
            Roll List
          </Tabs.Tab>
          <Tabs.Tab
            value="preregistration"
            style={{
              fontSize: "16px",
              padding: "12px 20px",
              minWidth: "220px",
            }}
          >
            Pre-Registration Report
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="rolllist" pt="xs">
          <Text
            size="lg"
            weight={700}
            mb="md"
            align="center"
            style={{ color: "#3B82F6" }}
          >
            Student Roll List
          </Text>

          <Group position="center" grow style={{ marginBottom: 16 }}>
            <TextInput
              label="Running Year"
              placeholder="Select year"
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
              }}
              style={{ flex: 1 }}
            />

            <Select
              label="This Semester Courses"
              placeholder="Select course"
              value={course}
              onChange={(val) => {
                setCourse(val);
              }}
              data={
                courseOptions
                  ? courseOptions.map((cour) => ({
                      value: cour.id.toString(),
                      label: `${cour.code} - ${cour.name}`,
                    }))
                  : []
              }
              searchable
              style={{ flex: 1 }}
            />
          </Group>

          <Space h="md" />

          {academicYear && course && (
            <Box>
              <Button
                size="sm"
                radius="sm"
                onClick={handleGenerateList}
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                Generate Student List
              </Button>
            </Box>
          )}

          <Space h="md" />
        </Tabs.Panel>

        <Tabs.Panel value="preregistration" pt="xs">
          <Text
            size="lg"
            weight={700}
            mb="md"
            align="center"
            style={{ color: "#3B82F6" }}
          >
            Pre Registration Report
          </Text>

          <Group position="center" grow style={{ marginBottom: 16 }}>
            <TextInput
              label="Semester"
              placeholder="Select Semester"
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value);
              }}
              style={{ flex: 1 }}
            />

            <Select
              label="Batch"
              placeholder="Select Batch"
              value={batch}
              onChange={(val) => {
                setBatch(val);
              }}
              data={
                batchOptions
                  ? batchOptions.map((bat) => ({
                      value: bat.batch_id.toString(),
                      label: `${bat.name} ${bat.discipline} ${bat.year}`,
                    }))
                  : []
              }
              searchable
              style={{ flex: 1 }}
            />
          </Group>
          <Box>
            <Button
              size="sm"
              radius="sm"
              onClick={generatePreRegistrationReport}
              style={{
                backgroundColor: "#3B82F6",
                color: "white",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              Generate Pre Registration Report
            </Button>
          </Box>
        </Tabs.Panel>
      </Tabs>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Loader variant="dots" />
        </div>
      )}
    </Card>
  );
}

export default GenerateStudentList;
