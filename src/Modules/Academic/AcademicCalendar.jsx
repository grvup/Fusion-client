import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Alert,
  Modal,
  Group,
  TextInput,
  Loader,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import FusionTable from "../../components/FusionTable";
import {
  calendarRoute,
  editCalendarRoute,
  addCalendarRoute,
  deleteCalendarRoute,
} from "../../routes/academicRoutes";

function AcademicCalendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    description: "",
    from_date: null,
    to_date: null,
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchCalendarData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return console.error("No authentication token found!");

      try {
        const { data } = await axios.get(calendarRoute, {
          headers: { Authorization: `Token ${token}` },
        });

        const parsedEvents = data.map((event) => ({
          ...event,
          from_date: new Date(event.from_date), // Parse date strings
          to_date: new Date(event.to_date), // Parse date strings
        }));

        setEvents(parsedEvents);
      } catch (error1) {
        console.error("Error fetching calendar data:", error1);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [refreshTrigger]);

  const columnNames = ["Description", "Start Date", "End Date", "Actions"];

  // Formatting helpers
  const formatDateTime = (date) =>
    date?.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) || "";

  const handleEdit = (event) => {
    setEditingEvent({
      ...event,
      from_date: event.from_date,
      to_date: event.to_date,
    });
  };

  const handleSaveEdit = async () => {
    if (
      !editingEvent?.description ||
      !editingEvent.from_date ||
      !editingEvent.to_date
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const updatedEvent = {
        ...editingEvent,
        from_date: editingEvent.from_date.toLocaleDateString("en-CA"), // YYYY-MM-DD
        to_date: editingEvent.to_date.toLocaleDateString("en-CA"), // YYYY-MM-DD
      };
      console.log(updatedEvent);

      await axios.put(editCalendarRoute, updatedEvent, {
        headers: { Authorization: `Token ${token}` },
      });
      updatedEvent.from_date = new Date(updatedEvent.from_date);
      updatedEvent.to_date = new Date(updatedEvent.to_date);
      setEvents(
        events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)),
      );
      setEditingEvent(null);
      setError("");
      setRefreshTrigger((prev) => prev + 1);
    } catch (error1) {
      console.error(error1);
      setError("Failed to update event");
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.description || !newEvent.from_date || !newEvent.to_date) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const eventToAdd = {
        ...newEvent,
        from_date: newEvent.from_date.toLocaleDateString("en-CA"), // YYYY-MM-DD
        to_date: newEvent.to_date.toLocaleDateString("en-CA"), // YYYY-MM-DD
      };

      const { data } = await axios.post(addCalendarRoute, eventToAdd, {
        headers: { Authorization: `Token ${token}` },
      });

      setEvents([...events, data]);
      setAddModalOpen(false);
      setNewEvent({ description: "", from_date: null, to_date: null });
      setError("");
      setRefreshTrigger((prev) => prev + 1);
    } catch (error1) {
      console.error(error1);
      setError("Failed to create event");
    }
  };

  const handleDelete = async (event) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(deleteCalendarRoute, {
        headers: { Authorization: `Token ${token}` },
        data: { id: event.id },
      });
      setRefreshTrigger((prev) => prev + 1); // Increment the trigger after successful delete
    } catch (error1) {
      console.error(error1);
      setError("Failed to delete event");
    }
  };

  const mappedEvents = events.map((event) => ({
    Description: event.description,
    "Start Date": formatDateTime(event.from_date),
    "End Date": formatDateTime(event.to_date),
    "Last Updated": formatDateTime(event.timestamp),
    Actions: (
      <Group spacing="xs">
        <Button
          variant="outline"
          color="blue"
          size="xs"
          onClick={() => handleEdit(event)}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          color="red"
          size="xs"
          onClick={() => handleDelete(event)}
        >
          Delete
        </Button>
      </Group>
    ),
  }));

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", color: "#3B82F6" }}
      >
        Academic Calendar Management
      </Text>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Group position="center" py="xl">
            <Loader variant="dots" />
          </Group>
        </div>
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <FusionTable
              columnNames={columnNames}
              elements={mappedEvents}
              width="100%"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "1rem",
            }}
          >
            <Button
              style={{ backgroundColor: "#4CBB17", color: "white" }}
              onClick={() => setAddModalOpen(true)}
            >
              Add New Event
            </Button>
          </div>
        </>
      )}

      <Modal
        opened={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        title="Edit Event"
        size="lg"
      >
        {error && (
          <Alert color="red" mb="sm">
            {error}
          </Alert>
        )}

        <TextInput
          label="Description"
          value={editingEvent?.description || ""}
          onChange={(e) =>
            setEditingEvent({ ...editingEvent, description: e.target.value })
          }
          mb="md"
          required
        />

        <DatePickerInput
          label="Start Date"
          value={editingEvent?.from_date}
          onChange={(date) =>
            setEditingEvent({ ...editingEvent, from_date: date })
          }
          mb="md"
          clearable
          required
        />

        <DatePickerInput
          label="End Date"
          value={editingEvent?.to_date}
          onChange={(date) =>
            setEditingEvent({ ...editingEvent, to_date: date })
          }
          mb="md"
          clearable
          required
        />

        <Group position="right" mt="lg">
          <Button color="blue" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Event"
        size="lg"
      >
        {error && (
          <Alert color="red" mb="sm">
            {error}
          </Alert>
        )}

        <TextInput
          label="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          mb="md"
          required
        />

        <DatePickerInput
          label="Start Date"
          value={newEvent.from_date}
          onChange={(date) => setNewEvent({ ...newEvent, from_date: date })}
          mb="md"
          clearable
          required
        />

        <DatePickerInput
          label="End Date"
          value={newEvent.to_date}
          onChange={(date) => setNewEvent({ ...newEvent, to_date: date })}
          mb="md"
          clearable
          required
        />

        <Group position="right" mt="lg">
          <Button color="green" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Group>
      </Modal>
    </Card>
  );
}

export default AcademicCalendar;
