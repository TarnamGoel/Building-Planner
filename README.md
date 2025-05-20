# Canvas Drawing App

A Vue 3 based drawing app with shape tools, color selection, shape dragging, save/load functionality, and image download. The app includes a backend API for saving and loading user drawings from a database.

---

## Features

- Draw lines, rectangles, circles on a canvas  
- Select and change shape colors  
- Drag and resize shapes  
- Save drawings to backend database  
- Load saved drawings  
- Download canvas as PNG image  
- Responsive Vue 3 frontend  
- Backend API for persistent storage  

---

## Project Structure

Building-Planner/
├── backend/ # Node.js + Express backend API
├── frontend/ # Vue 3 frontend app
├── README.md # This file


---

## Prerequisites

- Node.js (v16 or newer recommended)  
- npm or yarn  
- MongoDB (local or cloud)  

---

## Backend Setup

1. Navigate to the backend folder:
cd backend

2. Install dependencies:
   npm install
   
4. Configure environment variables:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string

5. Start the backend server:
   npm start

## Frontend Setup
Navigate to the frontend folder:

cd frontend

Install dependencies:
npm install
(Optional) Configure API endpoint in your frontend config or .env file.

Start the frontend development server:
npm run dev
The frontend will be available at http://localhost:3000 (or your configured port).
