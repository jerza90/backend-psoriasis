# Psoriasis Backend API

Backend service for the FreeFromPsoriasis / BebasPsoriasis ebook business.

## Tech Stack

- **Java 17** + **Spring Boot 3.2**
- **PostgreSQL** with JPA/Hibernate
- **Stripe** for payment processing
- **BCrypt** for password hashing
- **Maven** build tool

## Project Structure

```
src/main/java/com/psoriasis/
├── controller/        # REST controllers
│   ├── AuthController.java
│   ├── CheckoutController.java
│   ├── UserController.java
│   └── WebhookController.java
├── service/           # Business logic
│   ├── UserService.java
│   ├── CheckoutService.java
│   └── EmailService.java
├── model/             # JPA entities
│   ├── User.java
│   └── Order.java
├── dto/               # Request/response DTOs
├── repository/        # Spring Data JPA repos
└── config/            # App configuration
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login (email + password) |
| POST | `/api/auth/register` | Send registration OTP |
| POST | `/api/auth/verify-registration` | Verify OTP + create account |
| POST | `/api/auth/forgot-password` | Send password-reset OTP |
| POST | `/api/auth/reset-password` | Verify OTP + reset password |

### Checkout
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout/create-session` | Create Stripe checkout session |
| GET | `/api/checkout/session/{id}` | Get session status |
| GET | `/api/checkout/session/{id}/download` | Download ebook (after payment) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/username/{username}` | Get user by username |
| GET | `/api/users/email/{email}` | Get user by email |
| GET | `/api/users/exists/username/{username}` | Check username |
| GET | `/api/users/exists/email/{email}` | Check email |

### Webhooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/stripe` | Stripe payment events |

## Development

```bash
# Build
./mvnw clean package

# Run
./mvnw spring-boot:run

# Or with Docker
docker-compose up --build
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL JDBC URL |
| `DATABASE_USER` | DB username |
| `DATABASE_PASSWORD` | DB password |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `FRONTEND_URL` | Frontend URL for checkout redirects and CORS |
| `FRONTEND_ALLOWED_ORIGINS` | Comma-separated allowed CORS origins |
| `MAIL_HOST` | SMTP host |
| `MAIL_PORT` | SMTP port |
| `MAIL_USERNAME` | SMTP user |
| `MAIL_PASSWORD` | SMTP password |
