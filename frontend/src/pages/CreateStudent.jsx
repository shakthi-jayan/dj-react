import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CreateStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    address: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const token = localStorage.getItem("access_token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("course", formData.course);
      data.append("address", formData.address);

      if (profileImage) {
        data.append("profile_image", profileImage);
      }

      const res = await fetch(`${API_URL}/students/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (res.ok) {
        navigate("/students");
      } else {
        const result = await res.json();
        console.log(result);
        setError("Failed to create student");
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
            Add Student
          </h2>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>

              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>

              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Profile Image</Form.Label>

              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProfileImage(e.target.files[0])
                }
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="me-2"
            >
              Save Student
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/students")}
            >
              Cancel
            </Button>

          </Form>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default CreateStudent;