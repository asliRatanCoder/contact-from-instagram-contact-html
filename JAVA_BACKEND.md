# Java Backend Service (Optional)

This guide explains how to set up an optional Java backend service for advanced contact processing.

## Overview

While the React frontend handles all file conversion entirely in the browser (no backend needed), you can optionally add a Java backend for:

- Advanced contact deduplication
- Batch processing
- Contact validation
- Database storage
- Email verification
- Contact merging

## Setup Instructions

### Prerequisites

- Java 11 or higher
- Maven 3.6+
- Spring Boot 3.x

### Project Structure

```
backend/
├── src/
│   ├── main/java/com/contactrestorer/
│   │   ├── ContactRestorer.java
│   │   ├── controller/
│   │   │   └── ContactController.java
│   │   ├── service/
│   │   │   ├── ContactParserService.java
│   │   │   ├── ContactConverterService.java
│   │   │   └── ContactValidationService.java
│   │   ├── model/
│   │   │   └── Contact.java
│   │   └── exception/
│   │       └── ContactProcessingException.java
│   └── resources/
│       └── application.yml
├── pom.xml
└── README.md
```

### Maven pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.contactrestorer</groupId>
    <artifactId>contact-restorer-backend</artifactId>
    <version>1.0.0</version>
    <name>Contact Restorer Backend</name>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.5</version>
    </parent>

    <properties>
        <java.version>11</java.version>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- H2 Database (for development) -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- JSOUP for HTML parsing -->
        <dependency>
            <groupId>org.jsoup</groupId>
            <artifactId>jsoup</artifactId>
            <version>1.15.3</version>
        </dependency>

        <!-- OpenCSV for CSV handling -->
        <dependency>
            <groupId>com.opencsv</groupId>
            <artifactId>opencsv</artifactId>
            <version>5.7</version>
        </dependency>

        <!-- Lombok for reducing boilerplate -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### Sample Contact Controller

```java
package com.contactrestorer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = {"http://localhost:3000", "https://yourdomain.github.io"})
public class ContactController {

    @Autowired
    private ContactParserService parserService;

    @Autowired
    private ContactValidationService validationService;

    /**
     * Upload and parse HTML file
     */
    @PostMapping("/parse")
    public ResponseEntity<?> parseHtml(@RequestParam("file") MultipartFile file) {
        try {
            String htmlContent = new String(file.getBytes());
            var contacts = parserService.parseFromHtml(htmlContent);
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    /**
     * Validate contacts
     */
    @PostMapping("/validate")
    public ResponseEntity<?> validateContacts(@RequestBody List<Contact> contacts) {
        var validatedContacts = validationService.validateAll(contacts);
        return ResponseEntity.ok(validatedContacts);
    }

    /**
     * Deduplicate contacts
     */
    @PostMapping("/deduplicate")
    public ResponseEntity<?> deduplicateContacts(@RequestBody List<Contact> contacts) {
        var deduplicatedContacts = parserService.deduplicate(contacts);
        return ResponseEntity.ok(deduplicatedContacts);
    }
}
```

## Building and Running

```bash
# Build the project
mvn clean package

# Run the application
mvn spring-boot:run

# Or run the JAR directly
java -jar target/contact-restorer-backend-1.0.0.jar
```

The backend will start on `http://localhost:8080`

## API Endpoints

### Parse HTML

```
POST /api/contacts/parse
Content-Type: multipart/form-data

Parameters:
- file: HTML file containing contacts

Response:
{
  "contacts": [
    {
      "id": "uuid",
      "name": "John Doe",
      "phone": "+1234567890",
      "email": "john@example.com",
      "address": "123 Main St"
    }
  ],
  "total": 1,
  "parseTime": "100ms"
}
```

### Validate Contacts

```
POST /api/contacts/validate
Content-Type: application/json

Request:
{
  "contacts": [...]
}

Response:
{
  "valid": 45,
  "invalid": 2,
  "warnings": ["Invalid email format in contact #3"]
}
```

### Deduplicate

```
POST /api/contacts/deduplicate
Content-Type: application/json

Response:
{
  "original": 100,
  "duplicates": 15,
  "unique": 85,
  "contacts": [...]
}
```

## CORS Configuration

Update `application.yml`:

```yaml
spring:
  application:
    name: contact-restorer-backend

server:
  port: 8080
  servlet:
    context-path: /api

logging:
  level:
    root: INFO
    com.contactrestorer: DEBUG
```

## Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM maven:3.8-openjdk-11 AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:resolve
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

Build and run:

```bash
docker build -t contact-restorer-backend .
docker run -p 8080:8080 contact-restorer-backend
```

## Connecting Frontend to Backend

Update `src/utils/contactParser.js` to use backend:

```javascript
export const parseContactsFromHTML = async (htmlContent) => {
  const formData = new FormData();
  const blob = new Blob([htmlContent], { type: "text/html" });
  formData.append("file", blob, "contacts.html");

  try {
    const response = await fetch("http://localhost:8080/api/contacts/parse", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Backend error");

    const data = await response.json();
    return data.contacts;
  } catch (error) {
    console.log("Backend unavailable, using local parser");
    // Fallback to local parsing
    return parseContactsLocally(htmlContent);
  }
};
```

## Production Considerations

1. **Database**: Replace H2 with PostgreSQL or MySQL
2. **Authentication**: Add Spring Security for user accounts
3. **Rate Limiting**: Implement to prevent abuse
4. **Monitoring**: Use Spring Boot Actuator
5. **Logging**: Use ELK Stack or similar
6. **Error Handling**: Implement comprehensive exception handling
7. **Testing**: Aim for >80% code coverage

## Performance Optimization

- Implement caching for large files
- Use batch processing for bulk operations
- Enable compression
- Implement pagination for results
- Use async processing for heavy tasks

## Security Best Practices

- Validate all uploads
- Sanitize HTML input (use JSoup with SafeList)
- Implement rate limiting
- Add HTTPS/TLS
- Keep dependencies updated
- Regular security audits

## Troubleshooting

### Port already in use

```bash
# Change port in application.yml
server:
  port: 9080
```

### CORS errors

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

## References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [JSOUP Documentation](https://jsoup.org/)
- [OpenCSV Documentation](https://opencsv.sourceforge.net/)
