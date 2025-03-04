import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  TextInput,
  Select,
  FileInput,
  Button,
  Grid,
} from "@mantine/core";
import FusionTable from "../../components/FusionTable";

const API_BASE_URL = "https://your-api-endpoint.com";
const inputStyle = { width: "100%" };

function FinalRegistration() {
  const [courses, setCourses] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    modeOfPayment: "",
    transactionId: "",
    feeReceipt: null,
    actualFee: "",
    feePaid: "",
    lateFeeReason: "",
    feeDepositDate: "",
    utrNumber: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(paymentDetails).forEach((key) => {
      if (paymentDetails[key]) formData.append(key, paymentDetails[key]);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert(result.message || "Registration successful");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit registration");
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", color: "#3B82F6" }}
      >
        Final Registration For This Semester
      </Text>
      <FusionTable
        columnNames={[
          "ID",
          "Course Code",
          "Course Name",
          "Type",
          "Semester",
          "Credits",
        ]}
        elements={courses}
        width="100%"
      />
      <Text size="md" weight={700} mt="md">
        Total Credits:{" "}
        {courses.reduce((sum, course) => sum + course.credits, 0)}
      </Text>

      <Card mt="lg" p="md" shadow="xs" withBorder>
        <Text size="md" weight={700} color="blue" mb="md">
          Payment Details
        </Text>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select
              label="Mode of Payment"
              placeholder="Select payment method"
              data={[
                "Axis Easypay",
                "Subpaisa",
                "NEFT",
                "RTGS",
                "Bank Challan",
                "Education Loan",
              ]}
              value={paymentDetails.modeOfPayment}
              onChange={(value) => handleInputChange("modeOfPayment", value)}
              style={inputStyle}
            />
          </Grid.Col>
          {paymentDetails.modeOfPayment === "Education Loan" && (
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="UTR / Transaction Number"
                placeholder="Enter UTR number"
                value={paymentDetails.utrNumber}
                onChange={(e) => handleInputChange("utrNumber", e.target.value)}
                style={inputStyle}
              />
            </Grid.Col>
          )}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Challan No / Transaction ID"
              placeholder="Enter transaction ID"
              value={paymentDetails.transactionId}
              onChange={(e) =>
                handleInputChange("transactionId", e.target.value)
              }
              style={inputStyle}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <FileInput
              label="Fee Receipt (.pdf)"
              placeholder="Choose File"
              accept="application/pdf"
              onChange={(file) => handleInputChange("feeReceipt", file)}
              buttonLabel="Browse"
              style={inputStyle}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Actual Fee Amount"
              placeholder="Enter actual fee amount"
              type="number"
              value={paymentDetails.actualFee}
              onChange={(e) => handleInputChange("actualFee", e.target.value)}
              style={inputStyle}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Fee Amount Paid"
              placeholder="Enter paid fee amount"
              type="number"
              value={paymentDetails.feePaid}
              onChange={(e) => handleInputChange("feePaid", e.target.value)}
              style={inputStyle}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Reason for Late Fee (if any)"
              placeholder="Enter reason"
              value={paymentDetails.lateFeeReason}
              onChange={(e) =>
                handleInputChange("lateFeeReason", e.target.value)
              }
              style={inputStyle}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="Fee Deposit Date"
              placeholder="YYYY-MM-DD"
              type="date"
              value={paymentDetails.feeDepositDate}
              onChange={(e) =>
                handleInputChange("feeDepositDate", e.target.value)
              }
              style={inputStyle}
            />
          </Grid.Col>
        </Grid>
        <Button color="blue" fullWidth mt="md" onClick={handleSubmit}>
          Register
        </Button>
      </Card>
    </Card>
  );
}

export default FinalRegistration;
