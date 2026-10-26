# DJ-React

A full-stack web application that combines a Django backend with a React frontend for managing students and courses. The project includes Django REST Framework APIs, JWT-based authentication, media upload support, and a React interface for CRUD operations.

## Overview

This application is designed to manage educational data such as:

- Students
- Courses
- Student profile images
- JWT-based login and protected routes
- REST API endpoints for data access and manipulation

The project contains both:

- A Django application for server-side views, ORM, authentication, and API services
- A React + Vite frontend for a modern user interface

## Tech Stack

### Backend
- Python
- Django 5.2
- Django REST Framework
- Simple JWT
- SQLite database

### Frontend
- React 19
- Vite
- React Router DOM
- React Bootstrap
- JavaScript

## Features

- Student management (create, read, update, delete)
- Course management (create, read, update, delete)
- Image upload for student profiles
- Search functionality for students
- Pagination for student listings
- JWT authentication for protected API access
- React-based dashboard and forms for front-end operations
- CORS-enabled API communication between Django and React

## Project Structure

```text
.
├── api/
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── backend/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── media/
├── templates/
├── db.sqlite3
├── manage.py
├── requirements.txt
├── README.md
├── index.py
├── index.html
├── script.js
├── sample.js
├── contenttypesexample.py
└── .gitignore
```

## Backend Models

### Student
- `name`
- `email` (unique)
- `phone`
- `address`
- `profile_image`
- `course` (foreign key to Course)

### Course
- `name`
- `duration`
- `description`

## API Endpoints

The Django backend exposes both traditional HTML views and REST API routes.

### Authentication
- `POST /api/token/` - obtain JWT token
- `POST /api/token/refresh` - refresh access token

### Students
- `GET /api/students/`
- `POST /api/students/`
- `GET /api/students/<id>/`
- `PUT /api/students/<id>/`
- `DELETE /api/students/<id>/`

### Courses
- `GET /api/courses/`
- `POST /api/courses/`
- `GET /api/courses/<id>/`
- `PUT /api/courses/<id>/`
- `DELETE /api/courses/<id>/`

The project also includes non-API view routes for student and course management pages.

## Frontend Features

The React app includes pages for:

- Login
- Student list dashboard
- Create student
- Edit student
- Course list
- Create course
- Edit course

Routes are protected using a local access token stored in browser storage.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shakthi-jayan/dj-react.git
cd dj-react
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Linux/macOS
# or
venv\Scripts\activate      # Windows
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply Database Migrations

```bash
python manage.py migrate
```

### 5. Create a Superuser (optional)

```bash
python manage.py createsuperuser
```

### 6. Run the Backend

```bash
python manage.py runserver
```

The Django app will typically run at:

```text
http://127.0.0.1:8000/
```

### 7. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 8. Run the Frontend

```bash
npm run dev
```

The Vite frontend will usually run at:

```text
http://127.0.0.1:5173/
```

## Environment Notes

The frontend includes a `.env` file for frontend environment configuration. Ensure it matches your local backend URL setup if needed.

## Default Admin Access

You can access Django admin at:

```text
http://127.0.0.1:8000/admin/
```

## Notes

- This project is a learning/demo application combining server-rendered Django patterns with a modern React interface.
- A significant portion of the backend is structured around educational CRUD operations.
- The project uses SQLite for local development and is not configured as a production-ready deployment by default.

## License

This project does not currently declare a license file in the repository root. If you plan to distribute it publicly, consider adding a license such as MIT or Apache 2.0.

## Contributing

Contributions are welcome. If you'd like to improve the project, feel free to fork the repository and submit a pull request.
