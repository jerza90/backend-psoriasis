FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build
COPY pom.xml .
COPY src/ src/
RUN mvn clean package -DskipTests -q

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /build/target/psoriasis-backend-1.0.0.jar app.jar
COPY local-ebooks/ local-ebooks/
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
