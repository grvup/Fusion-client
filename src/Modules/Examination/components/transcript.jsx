/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Table, Button, ScrollArea } from "@mantine/core";
import "../styles/transcript.css";

// eslint-disable-next-line react/prop-types
function Transcript() {
  const navigate = useNavigate();

  // Simulated student data
  const studentData = Array.from({ length: 50 }, (_, index) => ({
    rollNumber: `22BCS${(index + 1).toString().padStart(3, "0")}`,
    name: `Student ${index + 1}`,
  }));

  const handlePreview = (student) => {
    navigate(`/examination/generate-transcript/${student.rollNumber}`, {
      state: { student },
    });
  };

  const handleDownload = (student) => {
    // Implement download functionality here
    console.log(`Download transcript for ${student.rollNumber}`);
    // Example: trigger file download or generate a PDF
  };

  return (
    <div className="transcript-container">
      <ScrollArea className="table-container">
        <Table highlightOnHover className="transcript-table">
          <tbody>
            {studentData.map((student) => (
              <tr key={student.rollNumber} className="table-row">
                <td className="table-cell tc">
                  <div className="table-cell-content">{student.rollNumber}</div>
                </td>
                <td className="table-cell">
                  <Button
                    onClick={() => handlePreview(student)}
                    variant="subtle"
                    className="actions-button"
                    aria-label={`Preview transcript for ${student.name}`}
                  >
                    Preview
                  </Button>
                  <Button
                    onClick={() => handleDownload(student)}
                    variant="subtle"
                    className="actions-button"
                    aria-label={`Download transcript for ${student.name}`}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default Transcript;
