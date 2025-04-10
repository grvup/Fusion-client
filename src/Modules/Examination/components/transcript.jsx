import { useState } from "react";
import { Table, Button, ScrollArea } from "@mantine/core";
import "../styles/transcript.css";
import StudentTranscript from "./studentTranscript";

function Transcript({ data, semester }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const students = data?.students || [];

  const handlePreview = (student) => {
    setSelectedStudent(student); // Set the student to show transcript
  };

  const handleBack = () => {
    setSelectedStudent(null); // Go back to list view
  };

  const handleDownload = (student) => {
    console.log(`Download transcript for ${student.id_id}`);
  };

  return (
    <div className="transcript-container">
      {selectedStudent ? (
        <StudentTranscript student={selectedStudent} semester={semester} onBack={handleBack} />
      ) : (
        <ScrollArea className="table-container">
          {students.length > 0 ? (
            <Table highlightOnHover className="transcript-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Programme</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id_id} className="table-row">
                    <td className="table-cell tc">
                      <div className="table-cell-content">{student.id_id}</div>
                    </td>
                    <td className="table-cell">{student.programme}</td>
                    <td className="table-cell">
                      <Button
                        onClick={() => handlePreview(student)}
                        variant="subtle"
                        className="actions-button"
                      >
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleDownload(student)}
                        variant="subtle"
                        className="actions-button"
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="no-data">No transcript records available.</div>
          )}
        </ScrollArea>
      )}
    </div>
  );
}

export default Transcript;
