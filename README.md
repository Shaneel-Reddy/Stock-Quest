# StockQuest

**StockQuest** is a comprehensive stock portfolio management web application that empowers users to manage and track their investments. The platform provides tools to monitor stock performance, manage portfolios, and analyze market trends. StockQuest integrates with real-time stock data APIs to ensure users have up-to-date insights into their investments.

---

Website Demo Link : https://drive.google.com/file/d/1_hOu3Gn75tITtK8kYX848IP3WWJOF5SF/view?usp=drive_link

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation Instructions](#installation-instructions)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)


---

## Technologies Used

- **Frontend**: ReactJS,Bootstrap,Html,CSS,Javascript
- **Backend**: Spring Boot (Java)
- **Database**: MySQL
- **Cloud Services**: AWS (EC2, S3, RDS)
- **API Integration**: Finnhub API, Twelvedata API, Gemini API, NewsAPI 

---

## Prerequisites

Ensure the following software is installed on your local machine:

- **Java 17+** (for backend)
- **Node.js** (latest version recommended)
- **MySQL** (or AWS RDS instance for production)
- **Maven** (for backend build)
- **Git** (for version control)

---

## Installation Instructions

### 1. Clone the Repository

Clone the `StockQuest` repository to your local development environment.

```bash
git clone https://github.com/Shaneel-Reddy/stockquest.git
cd stockquest
```

### 2. Set Up Backend (Spring Boot)

#### a. Navigate to the backend directory:

```bash
cd backend
```

#### b. Configure application.properties
In the backend directory, configure the application.properties file with your database connection details.
```bash
spring.datasource.url=jdbc:mysql://<db-endpoint>:3306/stockquest
spring.datasource.username=<db-username>
spring.datasource.password=<db-password>
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

#### c. Build the Backend
Use Maven to build the backend Spring Boot application:

```bash
mvn clean install
```

#### d. Run the Backend
Run the backend application locally:

```bash
mvn spring-boot:run
```
Your backend will be accessible at http://localhost:8080.

### 3. Set Up Frontend (ReactJS)
#### a. Navigate to the frontend directory:
```bash
cd frontend
```
#### b. Install Dependencies
Install the necessary Node.js dependencies:

```bash
npm install
```
#### c. Run the Frontend
Start the React development server:

```bash
npm run dev
```
Your frontend will be accessible at http://localhost:5173 (or the port configured).

---

## Running the Application
Once both the backend and frontend are running locally, you can access StockQuest by navigating to the frontend URL http://localhost:5173. The frontend will make API calls to the backend at http://localhost:8080.

---

## Configuration
### API Endpoints Configuration
Make sure the frontend is configured to point to the correct backend API URL. By default, the frontend expects the backend to be running locally at http://localhost:8080.

If the backend is hosted on AWS EC2, update the frontend API URL in your React application:
```
const apiUrl = "http://<ec2-public-ip>:8080";
```

## Deployment
### 1. Deploying the Backend (Spring Boot)
To deploy the Spring Boot application to AWS EC2, follow these steps:

Step 1: SSH into your EC2 instance.

Step 2: Upload the built JAR file using SCP.

Step 3: Start the Spring Boot application using the following command:
```bash
java -jar stockquest-0.0.1-SNAPSHOT.jar
```
Ensure that your EC2 instance security group allows incoming traffic on port 8080.

### 2. Deploying the Frontend (ReactJS)
To deploy the frontend React application to AWS S3:

Step 1: Build the production-ready frontend:
```bash
npm run build
```
Step 2: Upload the contents of the build directory to your S3 bucket configured for static website hosting.
### 3. Deploying the Database (AWS RDS)
To deploy the MySQL database:

Create an RDS instance (e.g., db.t4g.micro).
Configure your Spring Boot application to connect to the RDS endpoint.

--- 

## Troubleshooting
CORS Issues: Ensure CORS is properly configured in the backend (CorsConfigurationSource in Spring Boot).

MySQL Connection Errors: Double-check your database connection string and credentials in application.properties.

Frontend Not Loading: Ensure the S3 bucket has the correct permissions for public access and the static website hosting configuration is set up correctly.

API Not Responding: Verify that the Spring Boot application is running and accessible on the correct port.

---
