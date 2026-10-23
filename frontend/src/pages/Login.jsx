import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch(`${API_URL}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
      setError("Unable to connect to server");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="shadow">

        <Card.Body>
          <Card.Title className="text-center mb-4">
            Student Management System
          </Card.Title>

          <h4 className="text-center mb-4">
            Login
          </h4>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
            >
              Login
            </Button>

          </Form>
        </Card.Body>

      </Card>
    </Container>
  );
};

export default Login;