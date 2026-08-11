# My To-Do List App

Hi! This is a full-stack To-Do List application I built using the MERN stack.

The app allows users to add, view, update, delete, search and complete tasks. I also added basic validation and error handling to make the application work better when incorrect data is entered or when a task cannot be found.

## Technologies Used

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

The project is divided into two main folders:

- **To-do Backend** - Contains the Node.js and Express backend, API routes, controllers, services and MongoDB connection.
- **To-do Frontend/todo-frontend** - Contains the React frontend created using Vite.

## Features

The application supports:

- Add a new task
- View all tasks
- Edit a task
- Delete a task
- Mark a task as completed
- Search for tasks by title
- Input validation
- Backend error handling
- Error messages displayed on the frontend

## How to Run It Locally

### Requirements

- Node.js
- npm
- MongoDB Atlas account/database

### 1. Setup Backend

Open the terminal and go to the backend folder:

```bash
cd "To-do Backend"
npm install
```

Start the backend:

```bash
node index.js
```

### 2. Setup Frontend

Open another terminal:

```bash
cd "To-do Frontend/todo-frontend"
npm install
npm run dev
```

## API Endpoints

The main API endpoints are:

| Method | Endpoint                  | Purpose            |
| ------ | ------------------------- | ------------------ |
| POST   | `/tasks`                  | Add a new task     |
| GET    | `/tasks`                  | Get all tasks      |
| GET    | `/tasks/search?title=...` | Search tasks       |
| PUT    | `/tasks/:id`              | Update a task      |
| PATCH  | `/tasks/:id/status`       | Update task status |
| DELETE | `/tasks/:id`              | Delete a task      |

## API Testing

I tested the backend APIs using Postman.
I tested both valid and invalid requests for the main API operations:
The Postman collection/testing files are included in the project for reference.

## Deployment

### Backend

The backend is deployed on Render.

Backend URL:

[https://todo-backend-fc8s.onrender.com](https://todo-backend-fc8s.onrender.com)

### Frontend

The frontend is deployed on Netlify.

Live application:

[https://todotasklist-app.netlify.app/](https://todotasklist-app.netlify.app/)

## Changes Made After Testing

While testing the application, I made some changes to improve the project:

* Added `try-catch` error handling in backend controllers.
* Added validation for required task fields.
* Added error responses when a task is not found.
* Added error handling in the frontend.
* Added an error message that is displayed to the user.
* Fixed the search functionality.
* Added the loading states.
* Added responsiveness to the application.
* Tested the API endpoints using Postman.
* Updated the frontend to use the API service instead of repeating the backend URL in every request.

## What I Learned

Through this project, I learned how the frontend, backend and database communicate with each other.

I also learned:

* How to create REST APIs using Express.js.
* How to perform CRUD operations with MongoDB and Mongoose.
* How to connect a React frontend to a backend API.
* How to validate input on the backend.
* How to handle errors using `try-catch`.
* How to test APIs using Postman.
* How to deploy the frontend and backend separately.
* Handling various errors that can occur during the development of the app.
* Network routing and dealing with HTTP requests.

## Conclusion

This project helped me understand the basic structure of a full-stack application and how different parts of the application work together.
