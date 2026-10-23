import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${API_URL}/courses/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate("/courses");
      } else {
        const data = await res.json();
        console.log(data);
        setError("Failed to create course");
      }
    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  };

  return (
    <Container className="mt-5">

      <Card className="shadow">

        <Card.Body>

          <h2 className="mb-4">
            Add Course
          </h2>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>
                Course Name
              </Form.Label>

              <Form.Control
                type="text"
                name="name"
                placeholder="Enter course name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Duration
              </Form.Label>

              <Form.Control
                type="text"
                name="duration"
                placeholder="Example: 3 Months"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="me-2"
            >
              Save Course
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </Button>

          </Form>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default CreateCourse;