# My To-Do List App
This is a MERN stack Application bulit as a practice project on MERN stack

This app allows users to add, view, update, delete, search and complete tasks. I also added basic validation and error handling to make the application work better when incorrect data is entered or when a task cannot be found.
## Technologies Used
### Frontend
React,Vite,Axios,CSS
### Backend
Node.js,Express.js,MongoDB,Mongoose,CORS,dotenv

## How to Run It Locally

### 1. Setup Backend

Open the terminal and go to the backend folder:

cd "To-do Backend"
node index.js

### 2. Setup Frontend

Open another terminal:
cd "To-do Frontend/todo-frontend"
npm install
npm run dev

## API Endpoints feature I implemeted

The main API endpoints are:
POST   : `/tasks`                  ,To Add a new task     
GET    : `/tasks`                  ,To Get all tasks      
GET  : `/tasks/search?title=...` ,ToSearch tasks       
PUT : `/tasks/:id`              ,To Update a task      
PATCH : `/tasks/:id/status`       ,To Update task status 
DELETE : `/tasks/:id`              ,To Delete a task      

## API Testing

I tested the backend APIs using Postman.
I tested both valid and invalid requests for the main API operations:
The testing files are included in the project for reference.

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
*Added the loading states 
* Added responsiveness to the application.
* Tested the API endpoints using Postman.
* Updated the frontend to use the API service instead of repeating the backend URL in every request.

## What I Learned

Through this project,I learned about the communication between the frontend,backend and the database
* Handling various errors that can occur during the development of the app
* network routing and to deal with http requests
* Testing through Postman Application 

## Conclusion

This project helped me understand the basic structure of a full-stack application and how different parts of the application work together and communicate with each other.
