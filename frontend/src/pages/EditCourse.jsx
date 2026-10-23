import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    getCourse();
  }, [id]);

  const getCourse = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${API_URL}/courses/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setFormData({
          name: data.name || "",
          duration: data.duration || "",
          description: data.description || "",
        });
      } else {
        setError("Course not found");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load course");
    }
  };

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

      const res = await fetch(
        `${API_URL}/courses/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        navigate("/courses");
      } else {
        setError("Failed to update course");
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
            Edit Course
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
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="me-2"
            >
              Update Course
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

export default EditCourse;