import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Course from "./pages/Course";
import Login from "./pages/Login";

import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";

import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Students */}
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-student"
          element={
            <ProtectedRoute>
              <CreateStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-student/:id"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />

        {/* Courses */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-course/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;