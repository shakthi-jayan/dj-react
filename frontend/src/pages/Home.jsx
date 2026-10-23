
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Image,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      getStudents();
    }
  }, [isLoggedIn]);

  const getStudents = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return;
      }

      const res = await fetch(`${API_URL}/students/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setStudents(data);
      } else {
        setMessage("Failed to fetch students");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server error");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/students/?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setStudents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${API_URL}/students/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        setStudents(
          students.filter((student) => student.id !== id)
        );

        setMessage("Student deleted successfully");
      } else {
        setMessage("Failed to delete student");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsLoggedIn(false);
    setStudents([]);

    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>

          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Student Management System
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">

            <Nav className="ms-auto align-items-center">

              {isLoggedIn ? (
                <>
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => navigate("/students")}
                  >
                    Students
                  </Button>

                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => navigate("/courses")}
                  >
                    Courses
                  </Button>

                  <Button
                    variant="danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="success"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}

            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">

        {!isLoggedIn ? (
          <div className="text-center mt-5">

            <h1>Student Management System</h1>

            <p className="text-muted mt-3">
              Please login to manage students and courses.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

          </div>
        ) : (
          <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

              <h1>Students</h1>

              <Button
                variant="success"
                onClick={() =>
                  navigate("/create-student")
                }
              >
                Add Student
              </Button>

            </div>

            {/* Message */}
            {message && (
              <Alert
                variant="info"
                dismissible
                onClose={() => setMessage("")}
              >
                {message}
              </Alert>
            )}

            {/* Search */}
            <Form
              onSubmit={handleSearch}
              className="d-flex mb-4"
            >
              <Form.Control
                type="text"
                placeholder="Search Student"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="me-2"
              />

              <Button
                type="submit"
                variant="primary"
              >
                Search
              </Button>
            </Form>

            {/* Students */}
            <Row>

              {students.length > 0 ? (
                students.map((student) => (

                  <Col
                    key={student.id}
                    md={6}
                    lg={4}
                    xl={3}
                    className="mb-4"
                  >

                    <Card className="h-100 shadow-sm">

                      {student.profile_image && (
                        <Image
                          src={student.profile_image}
                          height={200}
                          className="card-img-top"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      )}

                      <Card.Body>

                        <Card.Title>
                          {student.name}
                        </Card.Title>

                        <Card.Text>

                          <strong>Email:</strong>{" "}
                          {student.email}

                          <br />

                          <strong>Phone:</strong>{" "}
                          {student.phone}

                          <br />

                          <strong>Course:</strong>{" "}
                          {student.course}

                          <br />

                          <strong>Address:</strong>{" "}
                          {student.address}

                        </Card.Text>

                        <div className="d-flex gap-2">

                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              navigate(
                                `/edit-student/${student.id}`
                              )
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleDelete(student.id)
                            }
                          >
                            Delete
                          </Button>

                        </div>

                      </Card.Body>

                    </Card>

                  </Col>

                ))
              ) : (
                <Col>
                  <Alert variant="secondary">
                    No students found.
                  </Alert>
                </Col>
              )}

            </Row>
          </>
        )}

      </Container>
    </>
  );
};

export default Home;