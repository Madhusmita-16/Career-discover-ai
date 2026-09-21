export interface SampleJD {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  text: string;
}

export const sampleJDs: SampleJD[] = [
  {
    id: 'jd-java-backend',
    title: 'Senior Java Backend Engineer',
    company: 'FinTech Cloud Systems',
    location: 'Bangalore, India (Hybrid)',
    experience: '1-3 years',
    text: `Job Description — Senior Java Backend Engineer

About the Role:
We are seeking an ambitious Java Backend Engineer to join our core cloud platform engineering team. You will be responsible for building scalable microservices, RESTful APIs, and database solutions that power millions of daily transactions.

Key Responsibilities:
- Design, build, and maintain high-performance REST APIs and microservices using Java 17 and Spring Boot.
- Implement distributed caching with Redis and database queries optimization using PostgreSQL and JPA/Hibernate.
- Develop API contract schemas, conduct automated unit testing with JUnit/Mockito, and enforce security policies using Spring Security and OAuth2.
- Containerize applications using Docker and deploy services via AWS cloud infrastructure (EC2, S3, SQS).
- Collaborate with frontend engineers and product teams using Agile development practices.

Required Qualifications & Skills:
- Bachelor's degree in Computer Science, IT, or related engineering discipline.
- 1-3 years of professional backend development experience with Core Java 17, Spring Boot, Microservices, and REST APIs.
- Proficiency in SQL databases (PostgreSQL/MySQL), query optimization, and Redis caching.
- Strong understanding of Docker, Git, CI/CD pipelines, and cloud platforms (AWS/GCP).
- Solid knowledge of Data Structures, System Design patterns, and clean code principles.`
  },
  {
    id: 'jd-fullstack-react',
    title: 'Full Stack Engineer (Java & React)',
    company: 'Pulse NextGen Mobility',
    location: 'Remote / Bangalore',
    experience: '0-2 years',
    text: `Job Description — Full Stack Engineer (Java & React)

About the Position:
We are looking for a versatile Full Stack Developer to build intuitive web applications and high-availability backend APIs. You will work on both customer-facing React frontend portals and Spring Boot backend infrastructure.

Responsibilities:
- Build responsive, modern user interface components using React, TypeScript, HTML5, and CSS3.
- Develop secure, RESTful web services using Java, Spring Boot, and Node.js.
- Integrate frontend components with PostgreSQL and MongoDB database backends.
- Implement state management, API error handling, and web analytics dashboards.
- Participating in code reviews, bug fixes, and continuous delivery pipelines using Docker and GitHub Actions.

Qualifications:
- B.Tech/B.E. in CSE, Information Technology, or equivalent.
- Hands-on project experience with React.js, JavaScript, TypeScript, Java, and Spring Boot.
- Experience writing SQL queries, RESTful API consumption, and Git version control.
- Good problem-solving skills, communication, and interest in fast-paced product development.`
  },
  {
    id: 'jd-sde1-enterprise',
    title: 'Software Development Engineer I (SDE 1)',
    company: 'Global Enterprise Tech Corp',
    location: 'Bangalore / Hyderabad',
    experience: '0-1 year',
    text: `Job Description — Software Development Engineer I (SDE 1)

Role Overview:
We are looking for an energetic SDE 1 candidate with solid fundamentals in object-oriented programming, algorithm design, and microservices concepts.

Key Requirements:
- Degree in Computer Science with strong academic record (GPA 8.0+).
- Strong proficiency in Java or C++, Object-Oriented Programming (OOP), and Data Structures & Algorithms.
- Familiarity with Spring Boot, REST APIs, SQL databases (PostgreSQL/MySQL), and Maven/Gradle build tools.
- Experience building academic or personal projects involving web technologies, mobile apps, or cloud services.
- Familiarity with Docker, Linux CLI commands, and Git.
- Excellent analytical, debugging, and collaborative team communication skills.`
  }
];
