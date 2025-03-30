import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TextInput,
  Select,
  Checkbox,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import {
  adminFetchCurriculumSemesters,
  fetchProgram,
  fetchAllProgrammes,
} from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_replicate_curriculum_form({ existingData }) {
  const [loading, setLoading] = useState(true);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [error, setError] = useState(null);
  const [ugData, setUgData] = useState([]);
  const [pgData, setPgData] = useState([]);
  const [phdData, setPhdData] = useState([]);
  const [searchParams] = useSearchParams();
  const [curriculumData, setCurriculumData] = useState(null);
  const [programmeData, setProgrammeData] = useState(null);
  const [notification, setNotification] = useState(null);
  const form = useForm({
    initialValues: {
      curriculumName: existingData.curriculumName || "",
      // Initialize programme as empty since we'll set it after fetching data
      programme: "",
      workingCurriculum: existingData.workingCurriculum || false,
      versionNo: existingData.versionNo || 1.0,
      numSemesters: existingData.numSemesters || 1,
      numCredits: existingData.numCredits || 0,
    },
  });

  const navigate = useNavigate();

  const curriculumId = searchParams.get("curriculum");
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Authorization token not found");

        const response = await fetchAllProgrammes(token);
        console.log("All programs:", response);

        setUgData(response.ug_programmes || []);
        setPgData(response.pg_programmes || []);
        setPhdData(response.phd_programmes || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Failed to load programs. Please try again.");
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchPrograms();
  }, []);

  // Fetch curriculum and program data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const response = await adminFetchCurriculumSemesters(
          curriculumId,
          token,
        );
        console.log(response);
        setCurriculumData(response);

        if (response.programme_id) {
          const programmeResponse = await fetchProgram(response.programme_id);
          setProgrammeData(programmeResponse);

          // Update form with all curriculum data
          form.setValues({
            curriculumName: response.curriculum_name || "",
            // Set the programme value using the ID from the response
            programme: response.programme_id.toString(),
            workingCurriculum: response.working_curriculum || false,
            versionNo: response.version || 1.0,
            numSemesters: response.semesters ? response.semesters.length : 1,
            numCredits: response.num_credits || 0,
          });
        }
      } catch (err) {
        console.error("Error fetching curriculum data: ", err);
        setError("Failed to fetch curriculum data");
      } finally {
        setLoading(false);
      }
    };

    if (curriculumId) {
      fetchData();
    }
  }, [curriculumId]);
  console.log(curriculumData);
  console.log(programmeData);

  const getProgramOptions = () => {
    const formatProgramData = (program) => ({
      value: program.id.toString(),
      label: `${program.category} - ${program.name}${program.discipline__name ? ` (${program.discipline__name})` : ""}`,
    });

    const options = [];

    if (ugData.length > 0) {
      options.push({
        group: "UG Programs",
        items: ugData.map(formatProgramData),
      });
    }

    if (pgData.length > 0) {
      options.push({
        group: "PG Programs",
        items: pgData.map(formatProgramData),
      });
    }
    if (phdData.length > 0) {
      options.push({
        group: "PhD Programs",
        items: phdData.map(formatProgramData),
      });
    }
    return options;
  };
  // Handle form submission (Update API written directly in the form)
  const handleSubmit = async (values) => {
    try {
      localStorage.setItem("AdminCurriculumsCachechange", "true");
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token not found");

      const payload = {
        curriculum_name: values.curriculumName,
        programme: values.programme,
        working_curriculum: values.workingCurriculum,
        version_no: values.versionNo,
        num_semesters: values.numSemesters,
        num_credits: values.numCredits,
      };

      const response = await axios.post(
        `${host}/programme_curriculum/api/admin_replicate_curriculum/${curriculumId}/`,
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      setNotification({
        message: response.data.message || "Curriculum replicated successfully!",
        color: "green",
      });
      navigate("/programme_curriculum/acad_view_all_working_curriculums");
    } catch (err) {
      console.error("Error updating curriculum:", err);
      setNotification({
        message: err.response?.data?.message || "Failed to update curriculum.",
        color: "red",
      });
    }
  };
  if (loading || loadingPrograms) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("Program Options:", getProgramOptions());
  console.log("Current form values:", form.values);
  console.log("Programme Data:", programmeData);

  // useEffect(() => {
  //   if (curriculumData) {
  //     form.setValues({
  //       curriculumName: curriculumData.curriculum_name || "",
  //       programme: curriculumData.programme || "",
  //       workingCurriculum: curriculumData.workingCurriculum || false,
  //       versionNo: curriculumData.versionNo || 1.0,
  //       numSemesters: curriculumData.numSemesters || 1,
  //       numCredits: curriculumData.numCredits || 0,
  //     });
  //   }
  // }, [curriculumData]);

  // if (loading) return <div>Loading...</div>;

  // const handleSubmit = (values) => {
  //   console.log(values);
  //   // Add your logic to handle the edited data submission here
  // };

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
              <Stack spacing="lg">
                <Text size="xl" weight={700} align="center">
                  Replicate Curriculum Form
                </Text>

                {notification && (
                  <Notification
                    color={notification.color}
                    onClose={() => setNotification(null)}
                  >
                    {notification.message}
                  </Notification>
                )}

                <TextInput
                  label="Curriculum Name"
                  placeholder="Enter curriculum name"
                  value={form.values.curriculumName}
                  onChange={(event) =>
                    form.setFieldValue(
                      "curriculumName",
                      event.currentTarget.value,
                    )
                  }
                  required
                />

                <Select
                  label="Select for which Programme"
                  placeholder="-- Select Programme --"
                  data={getProgramOptions()}
                  value={form.values.programme}
                  onChange={(value) => form.setFieldValue("programme", value)}
                  error={form.errors.programme}
                  required
                  searchable
                  nothingFound="No programmes found"
                  maxDropdownHeight={280}
                  clearable={false}
                />

                <Checkbox
                  label="Working Curriculum"
                  checked={form.values.workingCurriculum}
                  onChange={(event) =>
                    form.setFieldValue(
                      "workingCurriculum",
                      event.currentTarget.checked,
                    )
                  }
                />

                <NumberInput
                  label="Curriculum Version No"
                  value={form.values.versionNo}
                  onChange={(value) => form.setFieldValue("versionNo", value)}
                  required
                />

                <NumberInput
                  label="Number of Semesters"
                  value={form.values.numSemesters}
                  onChange={(value) =>
                    form.setFieldValue("numSemesters", value)
                  }
                  required
                />

                <NumberInput
                  label="Number of Credits"
                  value={form.values.numCredits}
                  onChange={(value) => form.setFieldValue("numCredits", value)}
                  required
                />
              </Stack>

              <Group position="right" mt="lg">
                <Button variant="outline" className="cancel-btn">
                  Cancel
                </Button>
                <Button type="submit" className="submit-btn">
                  Save Changes
                </Button>
              </Group>
            </form>
          </div>

          {/* Right Panel Buttons */}
          {/* <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Group spacing="md" direction="column" style={{ width: "100%" }}>
              <Link to="/programme_curriculum/acad_admin_add_programme_form">
                <Button className="right-btn-curriculum">Add Programme</Button>
              </Link>

              <Link to="/programme_curriculum/acad_admin_add_batch_form">
                <Button className="right-btn-curriculum">Add Batch</Button>
              </Link>
              <Link to="/programme_curriculum/acad_admin_add_discipline_form">
                <Button className="right-btn-curriculum">Add Discipline</Button>
              </Link>
            </Group>
          </div> */}
        </div>
      </Container>

      <style>
        {`
            .right-btn-curriculum {
              width: 15vw;
            }
          `}
      </style>
    </div>
  );
}

Admin_replicate_curriculum_form.propTypes = {
  existingData: PropTypes.shape({
    curriculumName: PropTypes.string,
    programme: PropTypes.string,
    workingCurriculum: PropTypes.bool,
    versionNo: PropTypes.number,
    numSemesters: PropTypes.number,
    numCredits: PropTypes.number,
  }),
};

// Adding default props for dummy data
Admin_replicate_curriculum_form.defaultProps = {
  existingData: {
    curriculumName: "Default Curriculum",
    programme: "UG-Btech-CSE",
    workingCurriculum: true,
    versionNo: 2.0,
    numSemesters: 8,
    numCredits: 160,
  },
};

export default Admin_replicate_curriculum_form;
