# StockQuest

**StockQuest** is a comprehensive stock portfolio management web application that empowers users to manage and track their investments. The platform provides tools to monitor stock performance, manage portfolios, and analyze market trends. StockQuest integrates with real-time stock data APIs to ensure users have up-to-date insights into their investments.

---

Website Demo Link : https://drive.google.com/file/d/1_hOu3Gn75tITtK8kYX848IP3WWJOF5SF/view?usp=drive_link 

Website Deployed Link : http://stockquest.s3-website.ap-south-1.amazonaws.com 

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

* [![Spring Boot][SpringBoot]][SpringBoot-url]
* [![JUnit][JUnit]][JUnit-url] -[Testing Frameworks]
* [![Mockito][Mockito]][Mockito-url] -[Testing Frameworks]
* [![React][React.js]][React-url]
* [![MySQL][MySQL]][MySQL-url]
* [![HTML5][HTML5]][HTML5-url]
* [![CSS3][CSS3]][CSS3-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![Chart.js][Chart.js]][Chart.js-url]
* [![AWS EC2][AWS EC2]][AWS-EC2-url]
* [![AWS RDS][AWS RDS]][AWS-RDS-url]
* [![AWS S3][AWS S3]][AWS-S3-url]
* [![JWT][JWT.io]][JWT-url]
* [![Axios][Axios]][Axios-url]




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

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[SpringBoot]: https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=white
[SpringBoot-url]: https://spring.io/projects/spring-boot
[React.js]: https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black
[React-url]: https://reactjs.org/
[AWS EC2]: https://img.shields.io/badge/AWS%20EC2-FF9900?style=flat&logo=amazon-aws&logoColor=white
[AWS-EC2-url]: https://aws.amazon.com/ec2/
[AWS RDS]: https://img.shields.io/badge/AWS%20RDS-527FFF?style=flat&logo=amazon-aws&logoColor=white
[AWS-RDS-url]: https://aws.amazon.com/rds/
[AWS S3]: https://img.shields.io/badge/AWS%20S3-569A31?style=flat&logo=amazon-aws&logoColor=white
[AWS-S3-url]: https://aws.amazon.com/s3/
[MySQL]: https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[JWT.io]: https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white
[JWT-url]: https://jwt.io/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/
[Chart.js]: https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartjs&logoColor=white
[Chart.js-url]: https://www.chartjs.org/
[HTML5]: https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS3]: https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[JUnit]: https://img.shields.io/badge/JUnit-25A162?style=flat&logo=junit&logoColor=white
[JUnit-url]: https://junit.org/junit5/
[Mockito]: https://img.shields.io/badge/Mockito-8A6E36?style=flat&logo=mockito&logoColor=white
[Mockito-url]: https://site.mockito.org/

