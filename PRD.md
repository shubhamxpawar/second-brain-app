# Second Brain App – Backend PRD

## 1. Overview

The **Second Brain App** is a personal knowledge management system that allows users to store, organize, and share digital content such as notes, links, tweets, videos, and documents.
The backend is responsible for authentication, data storage, content management, tagging, and secure sharing of user data.

This PRD defines the **backend scope, APIs, data models, and non-functional requirements**.

---

## 2. Goals & Objectives

### Primary Goals

* Provide a secure backend for storing personal knowledge content
* Enable fast retrieval of user notes without pagination (initial version)
* Allow users to share their entire “Second Brain” via a public link
* Support content categorization and tagging

### Non-Goals (for Week 15)

* No real-time collaboration
* No content editing history/versioning
* No search ranking or AI summarization

---

## 3. User Roles

### 3.1 Registered User

* Can create, read, and delete personal content
* Can tag and categorize content
* Can generate a shareable link
* Can view other users’ shared brains (read-only)

### 3.2 Public Viewer

* Can view shared brain content via a public link
* Cannot modify or delete content

---

## 4. Core Backend Features

### 4.1 Authentication & Authorization

* User Sign Up
* User Sign In
* JWT-based authentication
* Authorization middleware for protected routes

---

### 4.2 Content Management

#### Add New Content

* Users can add content of different types:

  * Tweet
  * Video
  * Document
  * Link
  * Text Note
* Each content item stores:

  * Title
  * Description (optional)
  * Type
  * Tags
  * Created timestamp

#### Fetch All Content (No Pagination)

* Fetch all content for a logged-in user
* Sorted by creation date (latest first)

#### Delete Content

* Users can delete only their own content
* Hard delete from database

---

### 4.3 Tags & Categorization

* Tags are user-defined strings
* A content item can have multiple tags
* Tags are stored as an array
* Used for filtering on frontend (backend returns raw data)

---

### 4.4 Shareable Brain Feature

#### Create Shareable Link

* User can generate a public shareable link
* Link maps to user ID (or share token)
* Link is read-only
* Shareable link can be regenerated (invalidating old links)

#### Fetch Shared Brain Content

* Fetch all content of another user using a share link
* Only public/read-only access
* No authentication required for viewing shared content

---

## 5. API Endpoints (High-Level)

### Authentication

* `POST /auth/signup`
* `POST /auth/signin`

### Content

* `POST /content`
* `GET /content`
* `DELETE /content/:id`

### Sharing

* `POST /share/create`
* `GET /share/:shareId`

---

## 6. Data Models (Logical)

### User

* id
* username

### Content

* id
* userId
* title
* description
* type 
* tags [string]
* createdAt

### Share

* id (share token)
* userId
* createdAt
* isActive

![schema](https://petal-estimate-4e9.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F0bdc898f-1952-4a81-9dd0-3c21d75912e5%2FScreenshot_2024-11-16_at_5.35.07_PM.png?table=block&id=1407dfd1-0735-804d-a2ac-e4f06a6f662b&spaceId=085e8ad8-528e-47d7-8922-a23dc4016453&width=1420&userId=&cache=v2)

---

## 7. Security Requirements

* Passwords must be hashed (bcrypt or equivalent)
* JWT tokens must expire
* Users must not access or delete other users’ content
* Share links must not expose private user details (email, password, etc.)

---

## 8. Performance Requirements

* Fetch all documents without pagination (acceptable for MVP)
* Average API response time < 300ms for normal load
* Database queries should be indexed on:

  * userId
  * createdAt

---

## 9. Error Handling

* Proper HTTP status codes:

  * 401 for unauthorized access
  * 403 for forbidden actions
  * 404 for missing resources
  * 500 for server errors
* Consistent error response structure

---

## 10. Tech Stack (Suggested)

* Backend: Node.js + Express
* Database: MongoDB
* Auth: JWT
* ORM/ODM: Mongoose
* Deployment: Any cloud platform (Render / Railway / Vercel backend)

---

## 11. Future Enhancements (Out of Scope)

* Pagination & infinite scroll
* Full-text search
* AI-powered tagging
* Role-based sharing (private/public per note)
* Analytics on shared brain views

---

