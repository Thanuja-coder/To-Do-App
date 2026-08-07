# My To-Do List App 

Hey there! This is a full-stack To-Do List application I built to practice my skills with the MERN stack (MongoDB, Express.js, React, Node.js). It's a simple but fully functional app where you can create, read, update, delete, and even search for tasks!

## Project Structure

I divided the project into two main folders to keep things organized:
- **To-do Backend**: This is where my Node.js and Express server lives, connected to a MongoDB database.
- **To-do Frontend/todo-frontend**: This is my React frontend, which I set up using Vite for super fast builds.

## How to Run It Locally

### What you need first
Make sure you have these installed on your computer:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- A MongoDB cluster (I used MongoDB Atlas)

### Setup Instructions

1. **Get the code** (clone or download the repo).
2. **Set up the Backend:**
   Open your terminal, go to the backend folder, and install the dependencies:
   ```bash
   cd "To-do Backend"
   npm install
   ```
3. **Set up the Frontend:**
   Open a new terminal window for the frontend and do the same:
   ```bash
   cd "To-do Frontend/todo-frontend"
   npm install
   ```

## Setting up the Database (.env)

For the backend to work, you need to tell it how to connect to the database.

Create a `.env` file inside the `To-do Backend` folder and add your MongoDB connection string like this:
```env
# Example .env configuration
MONGO_URI=mongodb://<your_username>:<your_password>@ac-shard-00-00.mongodb.net:27017,ac-shard-00-01.mongodb.net:27017,ac-shard-00-02.mongodb.net:27017/?ssl=true&replicaSet=your_replica_set_name&authSource=admin&retryWrites=true&w=majority&appName=your-cluster-name
```
*(Note (I had issue with DNS so used this): If you run into DNS issues with `mongodb+srv://`, use the standard `mongodb://` string as shown above. More on that below!)*

## Starting the App

You'll need two terminal windows running at the same time to see the full app.

**1. Fire up the Backend Server**
```bash
cd "To-do Backend"
npm run dev
```
*It should start on `http://localhost:8081` and you should see a "Database Connected..." message in the console.*

**2. Start the React Frontend**
```bash
cd "To-do Frontend/todo-frontend"
npm run dev
```
*Vite will start the frontend on `http://localhost:5173`. Just click that link in your terminal to open the app!*

---
## Netlify Deployment link 
Link: https://todotasklist-app.netlify.app/

## My Learning Journey & Challenges 🚀

Building and integrating this full-stack app was a huge learning experience. Here are some of the biggest hurdles I faced and how I figured them out:

### 1. The Dreaded MongoDB Connection Error (`ECONNREFUSED`)
**What happened:** When I first tried to connect my backend to MongoDB Atlas, my Node server kept crashing with an `ECONNREFUSED querySrv` error. It turned out this was a weird network/DNS issue with my ISP not liking the modern `mongodb+srv://` connection string.
**How I fixed it:** After some digging, I learned how to bypass the SRV lookup. I used a command line tool called `nslookup` to find the actual host nodes and replica set name, and then switched my `.env` file to use the older standard `mongodb://` connection string instead. It worked perfectly after that!

### 2. Environment Variables Getting Stuck
**What happened:** Even after I fixed my MongoDB connection string in the `.env` file, my `nodemon` server kept crashing with the same old error! It took me a while to realize my terminal had cached the old environment variable.
**How I fixed it:** I tweaked my backend code to force it to read the latest `.env` file by updating it to `require("dotenv").config({ override: true })`. This saved me from having to restart my terminal completely every time I changed a variable.

### 3. The Classic CORS Error
**What happened:** When I finally got the backend running and tried to fetch tasks from my React frontend, the browser threw a massive red error in the console. It was the classic CORS (Cross-Origin Resource Sharing) block preventing port 5173 from talking to port 8081.
**How I fixed it:** I installed the `cors` package in my backend and added `app.use(cors())` to my Express server. This opened up the API so my frontend could finally get the data.

### 4. React State Mess with the "Edit Task" Form
**What happened:** In my React app, I originally put the "Edit Task" input form straight inside my `tasks.map()` loop. Because of this, clicking the "Edit" button caused the edit form to magically pop open under *every single task in the list* all at once! 
**How I fixed it:** I realized I needed to track *which* task was being edited. I added some conditional rendering (`editId === task._id && (...)`) so the form only shows up under the specific task I clicked on. It looks much cleaner now!
