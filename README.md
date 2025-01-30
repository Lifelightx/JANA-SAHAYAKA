# Citizen Grievance Analytics Portal
We are live here- https://janasahayaka.onrender.com/

## Overview
The Citizen Grievance Analytics Portal provides a platform for rural citizens to lodge grievances, departments to manage complaints, and administrators to monitor the system through analytics. This full-stack solution promotes transparency, accountability, and efficiency in grievance redressal.

---

## Table of Contents
1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Features](#features)
4. [Workflow](#workflow)
5. [Implementation Details](#implementation-details)
6. [Analytics and Visualization](#analytics-and-visualization)
7. [Security](#security)
8. [How to Run the Project](#how-to-run-the-project)
9. [Technologies Used](#technologies-used)
10. [License](#license)

---

## Introduction
### Purpose
The system aims to simplify the grievance redressal process by enabling citizens to file complaints, track resolutions, and hold departments accountable. 
---

## System Architecture
### Frontend
1. **Citizen Portal**: Enables citizens to lodge grievances, track their statuses, and view updates.
2. **Department Portal**: Allows officials to manage complaints and update their statuses.
3. **Admin Portal**: Provides dashboards and analytics for complaint trends and department performance.

### Backend
1. **Centralized API Server**: Handles business logic, database interactions, and authentication.
2. **Middleware**: Implements role-based access control to ensure secure communication.
3. **Database Design**: NoSQL database (MongoDB) organizes collections for complaints, users, departments, and admins.

---

## Features
### Citizen Portal
- File grievances with categories like healthcare, education, and infrastructure.
- Track complaint statuses and view updates in real time.
- User authentication for secure and personalized access.
  
![WhatsApp Image 2025-01-25 at 15 12 16_f29714d5](https://github.com/user-attachments/assets/28b6f213-96ae-4ce9-b497-91ebe697c5bf)
![WhatsApp Image 2025-01-25 at 15 13 08_3b1a70e4](https://github.com/user-attachments/assets/0cb5a9f8-67c6-4e59-a7e6-1dec9e53558f)
![WhatsApp Image 2025-01-25 at 15 14 59_343530d9](https://github.com/user-attachments/assets/5f4547fb-71b1-46f1-b112-4d8fc3e752b8)
![WhatsApp Image 2025-01-25 at 15 16 23_85aa5437](https://github.com/user-attachments/assets/11c18df0-bd83-400c-a178-cf3f4b5f9ec4)

### Department Portal
- Manage assigned complaints and update statuses.
- Dashboard for active and resolved grievances.

### Admin Portal
- Analyze complaint trends using Chart.js for visualizations.
- Generate reports for department efficiency and recurring issues.

---

## Workflow
### Citizen Workflow
1. Register/login to file grievances by selecting categories.
2. Track real-time statuses and updates.
3. View all previous complaints in the dashboard.

### Department Workflow
1. Log in to access assigned complaints.
2. Update complaint statuses and provide resolution notes.

### Admin Workflow
1. Monitor data trends using analytics.
2. Generate reports for resolution rates and recurring issues.

---

## Implementation Details
### Frontend Stack
1. **React.js**: For building responsive interfaces.
2. **Styling Frameworks**: Tailwind CSS or Bootstrap for UI design.

### Backend Stack
1. **Express.js**: Handles server-side logic and routing.
2. **RESTful APIs**: Provide structured and scalable endpoints.

### Database Integration
1. **MongoDB**: For managing data storage.

---

## Analytics and Visualization
1. **Trend Analysis**: Visualizes complaint trends by category and district using Chart.js.
2. **Performance Metrics**: Tracks department efficiency and resolution rates.
3. **Recurring Issues**: Identifies common problems across categories and districts.

---

## Security
1. **Authentication and Authorization**: Ensures role-based access control.
2. **Data Validation**: Prevents errors and maintains data integrity.
3. **Secure API Endpoints**: Protects sensitive information.

---

## How to Run the Project
### Prerequisites
- Node.js
- MongoDB
- React

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Navigate to the respective directories (e.g., FRONTEND, BACKEND, ADMIN) and install dependencies:
   ```bash
    npm install
3. Start Frontend and Backend
   ```bash
   npm run dev
## Technologies Used
1. Frontend(React, Tailwind)
2. Backend(Nodejs, Express js)
3. Database(MongoDB)
4. Analytics(Chart js)

