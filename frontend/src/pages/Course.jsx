import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${API_URL}/courses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCourses(data);
      } else {
        setMessage("Failed to fetch courses");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server error");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${API_URL}/courses/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setCourses(
          courses.filter((course) => course.id !== id)
        );

        setMessage("Course deleted successfully");
      } else {
        setMessage("Failed to delete course");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server error");
    }
  };

  return (
    <Container className="mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Courses</h1>

        <Button
          variant="success"
          onClick={() => navigate("/create-course")}
        >
          Add Course
        </Button>
      </div>

      {message && (
        <Alert
          variant="info"
          dismissible
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}

      <div className="table-responsive">

        <Table bordered striped hover>

          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>

                  <td>{course.name}</td>

                  <td>{course.duration}</td>

                  <td>{course.description}</td>

                  <td>

                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        navigate(
                          `/edit-course/${course.id}`
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        handleDelete(course.id)
                      }
                    >
                      Delete
                    </Button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center"
                >
                  No courses found
                </td>
              </tr>
            )}

          </tbody>

        </Table>

      </div>

    </Container>
  );
};

export default Course;