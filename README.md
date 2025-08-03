# InspireHub

A Modern Learning & Mentorship Platform Built with the MERN Stack

## Project Overview

**InspireHub** is a full-featured learning and mentorship platform where experienced professionals share real-world roadmaps they followed to succeed in tech careers. Learners can explore structured learning paths across domains like full-stack development, AI, and data science.

---

## Features

### For Instructors

* **Create & Publish Roadmaps**: Add step-by-step learning paths with resources and timelines
* **Upload Custom Thumbnails**: Visualize roadmaps with personalized images
* **Event Management**: Host live events and mentorship sessions
* **Profile Management**: Showcase skills, experience, and tech stack

### For Learners

* **Browse Roadmaps**: Filter by category, domain, or skill level
* **Wishlist System**: Save roadmaps for personalized learning
* **Live Events**: Attend and replay instructor-led sessions
* **Guided Learning**: Select a primary roadmap for focused progress
* **Progress Tracking**: Monitor milestones and completion

### Authentication & Security

* **JWT Authentication**: Secure, token-based access
* **Email Verification**: OTP-based account confirmation via Nodemailer
* **Role-based Access**: Define permissions for learners, instructors, and admins
* **Protected Routes**: Ensure access to only authorized users

---

## Tech Stack

### 🔹 Frontend

* **React.js (Vite)** – Lightning-fast dev experience
* **Bootstrap** – Responsive, mobile-first UI components
* **Axios** – API interaction
* **React Router** – Client-side routing

### 🔸 Backend

* **Node.js** – Server-side JavaScript runtime
* **Express.js** – API and routing framework
* **MongoDB** – NoSQL database
* **Mongoose** – ODM for MongoDB
* **Multer** – Image uploads
* **JWT** – Authentication and session control
* **Nodemailer** – Email and OTP services

### Deployment & Environment

* **Backend**: Render
* **Frontend**: Netlify / Vercel
* **Database**: MongoDB Atlas
* **Environment**: `.env` variables for config management

---

## Getting Started

### Prerequisites

* Node.js (v14+)
* MongoDB (local or Atlas)
* Git

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/InspireHub.git
cd InspireHub
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inspirehub
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
```

Start the backend:

```bash
npm start
```

#### 3. Frontend Setup

```bash
cd ../eduall
npm install
```

Create a `.env` file in the `eduall/` directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### Access the Application

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000](http://localhost:5000)

---

## Project Structure

```
InspireHub/
├── backend/
│   ├── controllers/        # API controllers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # REST API endpoints
│   ├── middleware/         # Auth and error handling
│   ├── uploads/            # Uploaded files
│   └── server.js           # Entry point
├── eduall/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── utils/          # Helper functions
│   │   └── authContext.js  # Auth context provider
│   └── public/             # Static assets
└── README.md
```

---

## API Endpoints

### Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Login
* `POST /api/auth/send-otp` – Send OTP to email
* `POST /api/auth/verify-otp` – Verify OTP

### Roadmaps

* `GET /api/roadmaps` – Fetch all roadmaps
* `GET /api/roadmaps/:id` – Fetch roadmap by ID
* `POST /api/roadmaps` – Create roadmap (Instructor only)
* `PUT /api/roadmaps/:id` – Update roadmap (Instructor only)
* `DELETE /api/roadmaps/:id` – Delete roadmap (Instructor only)

### Users

* `GET /api/users/profile` – Get current user profile
* `PUT /api/users/profile` – Update profile info
* `POST /api/users/wishlist` – Add roadmap to wishlist
* `DELETE /api/users/wishlist/:id` – Remove from wishlist

---

## Key Components

### Frontend

* **SignUpInner** – OTP-based registration
* **HeaderOne** – Mobile-friendly navigation bar
* **RoadmapDetails** – Timeline UI for roadmaps
* **AuthContext** – Centralized auth logic

### Backend

* **JWT Auth** – Secure authentication
* **Multer Uploads** – Image file handling
* **Nodemailer OTP** – Email verification system
* **Role Middleware** – User-type authorization

---

## Responsive Design

* **Desktop** – Full-feature layout with side navigation
* **Tablet** – Adaptive cards and scroll views
* **Mobile** – Collapsible menus and streamlined UI
* **Small Devices** – Optimized for widths ≥320px

---

## Deployment Guide

### Backend (Render)

* Create Web Service on Render
* Link to GitHub repo
* Add environment variables via dashboard
* Build Command: `npm install`
* Start Command: `npm start`

### Frontend (Netlify / Vercel)

* Build: `npm run build`
* Deploy the `dist/` directory
* Set environment variables in hosting platform
* Add `_redirects` file for React Router support

---

## Project Status

* ✅ Core Features Implemented
* ✅ Responsive UI Complete
* ✅ Authentication System Operational
* ✅ API Integration Complete
* 🔄 Ongoing Improvements & Bug Fixes