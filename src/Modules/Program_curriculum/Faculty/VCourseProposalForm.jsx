import { React, useEffect, useState } from "react";
import {
  Textarea,
  TextInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
  Select,
} from "@mantine/core";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { fetchFacultySuperiorData, fetchDisciplinesData } from "../api/api";
import { host } from "../../../routes/globalRoutes";

function VCourseProposalForm() {
  const form = useForm({
    initialValues: {
      fileId: "",
      uploader: "",
      uploaderDesignation: "",
      receiverId: "",
      receiverDesignation: "",
      remarks: "",
      discipline: "",
    },
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const update = searchParams.get("update");

  const courseProposals = JSON.parse(
    sessionStorage.getItem(update === "0" ? "courseProposals" : "updateProposals")
  );
  const courseProposal = courseProposals.find(
    (proposal) => proposal.pk === parseInt(id, 10),
  );
  // console.log(courseProposal);
  const [superiorData, setSuperiorData] = useState(null);
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(form.values);
  // const courseProposalData = Object.entries(courseProposal.fields);
  // console.log(courseProposalData);
  useEffect(() => {
    const fetchSuperiorData = async () => {
      try {
        const response = await fetchFacultySuperiorData(
          courseProposal.fields.uploader,
          courseProposal.fields.designation,
        );
        const data = await response.json();
        console.log(data);
        setSuperiorData(data.superior_data);
        if (data.superior_data) {
          setReceiverOptions([
            {
              value: data.superior_data.username,
              label: `${data.superior_data.name} (${data.superior_data.designation})`,
            },
          ]);
          setDesignationOptions([
            {
              value: data.superior_data.designation,
              label: data.superior_data.designation,
            },
          ]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDisciplines = async () => {
      try {
        const response = await fetchDisciplinesData();
        // console.log(response);

        // const data = [...d.name, ...d.acronym, ...d.id];

        const disciplineList = response.map((discipline) => ({
          value: discipline.id.toString(),
          label: `${discipline.name} (${discipline.acronym})`,
        }));
        setDisciplines(disciplineList);
      } catch (fetchError) {
        console.error("Error fetching disciplines: ", fetchError);
      }
    };

    fetchSuperiorData();
    fetchDisciplines();

    if (id) {
      // Fetch data from API and set form values
      form.setValues({
        fileId: id,
        uploader: courseProposal.fields.uploader,
        uploaderDesignation: courseProposal.fields.designation,
      });
    }
  }, [courseProposal.fields.designation, courseProposal.fields.uploader]);

  useEffect(() => {
    if (superiorData) {
      form.setValues({
        ...form.values,
        receiverId: superiorData.username,
        receiverDesignation: superiorData.designation,
      });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!superiorData) return <div>No superior data found</div>;

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("authToken");

    try {
      // Prepare the payload with all form values
      const payload = {
        fileId: values.fileId,
        uploader: values.uploader,
        designation: values.uploaderDesignation,
        receiverId: values.receiverId,
        receiverDesignation: values.receiverDesignation,
        remarks: values.remarks,
        discipline: values.discipline,
      };
      const response = await fetch(
        `${host}/programme_curriculum/api/filetracking/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }
      if (response.ok) {
        // alert("Form submitted successfully!");
        navigate("/programme_curriculum/faculty_outward_files");
      }

      const responseData = await response.json();
      alert("Form submitted successfully!");
      console.log("Submission successful:", responseData);
      // Optionally redirect or reset the form
      // navigate('/success-page');
      // form.reset();
    } catch (errors) {
      console.error("Submission error:", errors);
      alert(`Error submitting form: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f5f7",
        display: "flex",
        flexDirection: "column",
        padding: "0",
      }}
    >
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          padding: "0",
          marginTop: "1rem",
        }}
      >
        {/* Form Section */}
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            margin: "0",
          }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="lg">
              <Text size="xl" weight={700} align="center">
                Course Proposal Form
              </Text>

              <TextInput
                label="File ID"
                placeholder="Enter File ID"
                value={form.values.fileId}
                onChange={(event) =>
                  form.setFieldValue("fileId", event.currentTarget.value)
                }
                required
              />

              <TextInput
                label="Uploader"
                placeholder="Uploader Name"
                value={form.values.uploader}
                onChange={(event) =>
                  form.setFieldValue("uploader", event.currentTarget.value)
                }
                required
              />

              <TextInput
                label="Uploader Designation"
                placeholder="Uploader Designation"
                value={form.values.uploaderDesignation}
                onChange={(event) =>
                  form.setFieldValue(
                    "uploaderDesignation",
                    event.currentTarget.value,
                  )
                }
                required
              />

              <Select
                label="Receiver ID"
                placeholder="---------------"
                data={receiverOptions}
                value={form.values.receiverId}
                onChange={(value) => form.setFieldValue("receiverId", value)}
                disabled={receiverOptions.length === 0}
                nothingFound="No receivers found"
                required
              />

              <Select
                label="Receiver Designation"
                placeholder="--------------"
                data={designationOptions}
                value={form.values.receiverDesignation}
                onChange={(value) =>
                  form.setFieldValue("receiverDesignation", value)
                }
                required
                disabled={designationOptions.length === 0}
                nothingFound="No designations found"
              />

              <Textarea
                label="Remarks"
                placeholder="Enter remarks here..."
                value={form.values.remarks}
                onChange={(event) =>
                  form.setFieldValue("remarks", event.currentTarget.value)
                }
              />

              <Select
                label="From Discipline"
                placeholder="Select Discipline"
                data={disciplines}
                value={form.values.discipline}
                onChange={(value) => form.setFieldValue("discipline", value)}
                required
                searchable
                clearable
                nothingFound="No disciplines found"
              />
            </Stack>

            <Group position="right" mt="lg">
              <Button variant="outline" className="cancel-btn">
                Cancel
              </Button>
              <Button type="submit" className="submit-btn">
                Submit
              </Button>
            </Group>
          </form>
        </div>
      </Container>

      <style>{`
        .submit-btn {
          background-color: #28a745;
          color: #fff;
        }

        .submit-btn:hover {
          background-color: #218838;
        }

        .cancel-btn {
          background-color: #dc3545;
          color: #fff;
        }

        .cancel-btn:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
}

export default VCourseProposalForm;
