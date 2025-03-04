import React from "react";
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
import { useForm } from "@mantine/form";

function VCourseProposalForm() {
  const form = useForm({
    initialValues: {
      fileId: "",
      uploader: "",
      uploaderDesignation: "",
      receiverId: "",
      receiverDesignation: "",
      remarks: "",
      disciplines: "",
    },
  });

  const handleSubmit = (values) => {
    console.log("Form Submitted: ", values);
    alert("Form Submitted!");
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
      {/* Breadcrumbs Section */}
      {/* <Container
        fluid
        style={{
          padding: "0",
          marginTop: "0.5rem",
        }}
      >
        
      </Container> */}

      {/* Options Section */}

      {/* Main Layout */}
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
                data={[
                  { value: "1", label: "User 1" },
                  { value: "2", label: "User 2" },
                  { value: "3", label: "User 3" },
                ]}
                value={form.values.receiverId}
                onChange={(value) => form.setFieldValue("receiverId", value)}
                required
              />

              <Select
                label="Receiver Designation"
                placeholder="--------------"
                data={[
                  { value: "professor", label: "Professor" },
                  { value: "hod", label: "HOD" },
                  { value: "dean", label: "Dean" },
                ]}
                value={form.values.receiverDesignation}
                onChange={(value) =>
                  form.setFieldValue("receiverDesignation", value)
                }
                required
              />

              <Textarea
                label="Remarks"
                placeholder="Enter remarks here..."
                value={form.values.remarks}
                onChange={(event) =>
                  form.setFieldValue("remarks", event.currentTarget.value)
                }
              />

              <TextInput
                label="Disciplines"
                placeholder="Enter Disciplines"
                value={form.values.disciplines}
                onChange={(event) =>
                  form.setFieldValue("disciplines", event.currentTarget.value)
                }
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
