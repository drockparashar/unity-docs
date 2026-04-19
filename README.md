# UnityDocs

**UnityDocs** is a real-time collaborative document editing platform built with the MERN stack and Socket.IO. Multiple users can open the same document simultaneously and see each other's changes instantly — no page refresh required.

🌐 **Live demo:** [unity-docs-lake.vercel.app](https://unity-docs-lake.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
  - [Running the Client](#running-the-client)
- [API Reference](#api-reference)
  - [Auth Routes](#auth-routes)
  - [Document Routes](#document-routes)
  - [Socket.IO Events](#socketio-events)
- [Data Models](#data-models)
- [Application Pages](#application-pages)
- [Deployment](#deployment)

---

## Features

- **User Authentication** – Register and log in with a username and password (passwords are hashed with bcrypt).
- **Document Dashboard** – Create new documents, view all your documents, and navigate directly to any of them.
- **Real-Time Collaborative Editing** – Multiple users editing the same document see changes broadcast live via Socket.IO.
- **Rich Text Editor** – Powered by [Quill](https://quilljs.com/), supporting:
  - Headings (H1–H6)
  - Bold, italic, underline, strikethrough, blockquote
  - Ordered and unordered lists with indent controls
  - Links and images
  - Format clearing
- **Shareable Document Links** – One-click copy of a shareable URL for any document.
- **Persistent Storage** – Document content is saved to MongoDB every time a user makes a change.
- **Toast Notifications** – Friendly feedback messages for actions such as login, document creation, etc.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Rich Text Editor | Quill v2, React Quill v2 |
| Real-Time | Socket.IO (client + server) |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Auth | bcrypt |
| Dev server | nodemon |
| Config | dotenv |

---

## Project Structure

```
unity-docs/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── assets/          # Static images (e.g. hero illustration)
│       ├── pages/
│       │   ├── Landing.js   # Home / hero page
│       │   ├── Signup.js    # User registration form
│       │   ├── Login.js     # User login form
│       │   ├── Dashboard.js # Document list & creation
│       │   ├── Editor.js    # Real-time Quill editor
│       │   ├── Header.js    # (shared header component)
│       │   └── Sidebar.js   # (shared sidebar component)
│       ├── styles/          # Component-scoped CSS files
│       ├── App.js           # Route definitions
│       └── index.js         # React entry point
│
└── server/                  # Express + Socket.IO backend
    ├── index.js             # Server entry point (Express + Socket.IO setup)
    └── src/
        ├── controllers/
        │   ├── getDocumentContent.js    # Fetch a document by ID
        │   └── handleDocumentUpdate.js  # Persist document changes to DB
        ├── models/
        │   ├── Document.js  # Mongoose schema for documents
        │   └── Users.js     # Mongoose schema for users
        └── routes/
            ├── auth.js      # /auth/register, /auth/login
            └── docs.js      # /doc/create, /doc/update, /doc/userDocs/:id
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Running the Server

```bash
cd server
npm install
npm start        # starts on http://localhost:3001 via nodemon
```

### Running the Client

```bash
cd client
npm install
npm start        # starts on http://localhost:3000
```

> **Note:** The client currently points to the hosted backend (`https://unity-docs-2.onrender.com`). To use a local server, replace every occurrence of that URL in `client/src/` with `http://localhost:3001`.

---

## API Reference

Base URL: `http://localhost:3001` (or the deployed server URL)

### Auth Routes

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | `{ name, username, password }` | Create a new user account |
| `POST` | `/auth/login` | `{ username, password }` | Log in; returns `{ userID }` |

### Document Routes

| Method | Endpoint | Body / Params | Description |
|--------|----------|---------------|-------------|
| `POST` | `/doc/create` | `{ title, author }` | Create a new document; returns the new document's `_id` |
| `PUT` | `/doc/update` | `{ _id, content }` | Overwrite a document's content |
| `GET` | `/doc/userDocs/:_id` | URL param: user ID | Fetch all documents belonging to a user |

### Socket.IO Events

The server listens on the same port as the HTTP server.

| Direction | Event | Payload | Description |
|-----------|-------|---------|-------------|
| Client → Server | `get` | `{ _id }` | Request initial content for a document; the socket is also joined to the document's room |
| Server → Client | `get` | `content` (Quill Delta object) | Returns the current document content |
| Client → Server | `update` | `{ _id, delta, content }` | Send a Quill Delta change; the server persists `content` and broadcasts `delta` to all other clients in the room |
| Server → Client | `updateContent` | `delta` (Quill Delta object) | Broadcast of a remote user's change to every other client in the room |

---

## Data Models

### User

| Field | Type | Notes |
|-------|------|-------|
| `username` | String | Required, unique |
| `name` | String | Required |
| `password` | String | Required, stored as bcrypt hash |

### Document

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required |
| `author` | ObjectId | Ref: `users` |
| `content` | Object | Quill Delta format; has a default welcome message |
| `createdAt` | Date | Auto-managed by Mongoose timestamps |
| `updatedAt` | Date | Auto-managed by Mongoose timestamps |

---

## Application Pages

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Landing` | Hero page with a "Get Started" call-to-action |
| `/signup` | `Signup` | Registration form (name, username, password) |
| `/login` | `Login` | Login form; stores `userID` in `localStorage` |
| `/user` | `Dashboard` | Lists the user's documents; create new documents |
| `/editor/:_id` | `Editor` | Quill rich-text editor with live Socket.IO sync |

---

## Deployment

| Service | URL |
|---------|-----|
| Frontend (Vercel) | https://unity-docs-lake.vercel.app |
| Backend (Render) | https://unity-docs-2.onrender.com |
