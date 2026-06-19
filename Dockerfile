FROM eclipse-temurin:17-jdk-alpine

LABEL maintainer="Psoriasis Backend Team"
LABEL description="Backend API for FreeFromPsoriasis and BebasPsoriasis ebook business"

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .
COPY .mvn/ .mvn/

# Copy source code
COPY src/ src/

# Build the application
RUN ./mvnw clean package -DskipTests

# Create a non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/psoriasis-backend-1.0.0.jar"]
