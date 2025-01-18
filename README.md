# EnrollmentSystem_Server

## Overview

The **EnrollmentSystem_Server** is a Node.js-based server that handles the back-end functionality of an enrollment system. It connects to a PostgreSQL database for data storage and management, making it easy for administrators to manage student enrollments, courses, and more.

## Getting Started

### Prerequisites

Before you can run the project, ensure you have the following installed on your system:

1. **Git** - To clone the repository.
2. **PGAdmin** - A PostgreSQL database management tool. Download it from [here](https://www.pgadmin.org/download/).
3. **Postman** - An API client used for testing and interacting with the API. Download it from [here](https://www.postman.com/downloads/).
4. **Node.js** - Make sure Node.js and npm (Node package manager) are installed. You can download Node.js from [here](https://nodejs.org/).

### Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/EnrollmentSystem_Server.git

2. **Navigate into the project directory:**

   ```bash
   cd EnrollmentSystem_Server

3. **Install dependencies:**

   In the project directory, run the following command to install the required npm packages:

   ```bash
   npm install

4. **Configure environment variables:**

    Create a .env file in the root of the project (if not already present) and add the necessary environment variables, such as your database credentials:
   
   ```bash
     DB_HOST="localhost"
     DB_USER="postgres"
     DB_PASSWORD="123123"
     DB_NAME="EnrollmentSystem_Database"
     DB_PORT=5432
     JWT_SECRET = "ENROLLMENT_CVSU"
     JWT_EXPIRES_IN = 2h

5. **Run the server:**

    After setting up the database and environment variables, start the server:

   ```bash
   npm run dev

6.  **API documentation:**

   ```bash
   http://localhost:3000/api-docs/#/




  
