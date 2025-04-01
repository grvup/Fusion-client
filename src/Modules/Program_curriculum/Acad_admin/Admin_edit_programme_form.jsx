import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
// import { useMediaQuery } from "@mantine/hooks";
import { fetchCurriculumData } from "../api/api";
import { host } from "../../../routes/globalRoutes";
// import { useMediaQuery } from "@mantine/hooks";

function Admin_edit_programme_form() {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const { id } = useParams();
  const navigate = useNavigate();
  const [programmeData, setProgrammeData] = useState([]);

  useEffect(() => {
    const fetchProgrammeData = async () => {
      try {
        console.log(id);
        const response = await fetchCurriculumData(id);
        const data = {
          id: response.program.id,
          name: response.program.name,
          begin_year: response.program.programme_begin_year,
          category: response.program.category,
        };
        setProgrammeData(data);
        console.log(response);
        // console.log("The programme data is: ", programmeData);
      } catch (error) {
        console.log("Error fetching data");
      }
    };
    fetchProgrammeData();
  }, [id]);

  const form = useForm({
    initialValues: {
      category: programmeData.category,
      programmeName: programmeData.name,
      year: programmeData.begin_year,
    },
  });

  useEffect(() => {
    if (programmeData) {
      form.setValues({
        category: programmeData.category,
        programmeName: programmeData.name,
        year: programmeData.begin_year,
      });
    }
  }, [programmeData]);

  const handleSubmit = async (values) => {
    try {
      const submitData = {
        category: values.category,
        name: values.programmeName,
        programme_begin_year: values.year,
        id: programmeData.id,
      };
      console.log("Edited Programme Data Submitted:", submitData);
      const response = await fetch(
        `${host}/programme_curriculum/api/admin_edit_programme/${id}/`,
        {
          method: "POST",
          body: JSON.stringify(submitData),
        },
      );
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("AdminProgrammesCachechange", "true");
        alert("Programme updated successfully!");
        console.log(response);
        navigate("/programme_curriculum/acad_view_all_programme");
      } else {
        throw new Error(result.status);
      }
    } catch (error) {
      console.log(error.status);
      // alert(error.message);
    }
    // Add API call or logic for submitting the updated programme data
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {(() => {
        console.log("The programme data is: ", programmeData);
        return null; // Returning null because we don't want anything to be displayed
      })()}

      {/* <Breadcrumbs>{breadcrumbItems}</Breadcrumbs> */}

      {/* Options Section */}
      {/* <Group spacing="xs" className="program-options" position="center" mt="md">
        <Text>Programs</Text>
        <Text className="active">Curriculums</Text>
        <Text>Courses</Text>
        <Text>Disciplines</Text>
        <Text>Batches</Text>
      </Group> */}

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
                  Edit Programme Form
                </Text>

                <Select
                  label="Programme Category"
                  placeholder="-- Select Category --"
                  data={["UG", "PG", "PhD"]}
                  value={form.values.category}
                  onChange={(value) => form.setFieldValue("category", value)}
                  required
                />

                <TextInput
                  label="Programme Name"
                  placeholder="Enter Programme Name"
                  value={form.values.programmeName}
                  onChange={(event) =>
                    form.setFieldValue(
                      "programmeName",
                      event.currentTarget.value,
                    )
                  }
                  required
                />

                <NumberInput
                  label="Programme Begin Year"
                  value={form.values.year}
                  onChange={(value) => form.setFieldValue("year", value)}
                  required
                />
              </Stack>

              <Group position="right" mt="lg">
                <Button variant="outline" className="cancel-btn">
                  Cancel
                </Button>
                <Button type="submit" className="submit-btn">
                  Update
                </Button>
              </Group>
            </form>
          </div>

          {/* Right Panel Buttons */}
        </div>
      </Container>

      <style>{`
        .right-btn-programme {
          width: 15vw;
        }
      `}</style>
    </div>
  );
}

Admin_edit_programme_form.propTypes = {
  programmeData: PropTypes.shape({
    category: PropTypes.string,
    programmeName: PropTypes.string,
    year: PropTypes.number,
  }),
};

export default Admin_edit_programme_form;
