# AI_REFACTOR_GUIDE.md

## Objective

Refactor this Java/Spring Boot project into a maintainable layered architecture.

The project currently contains:

* Controllers returning `Map<String,Object>`
* Business logic inside controllers
* Entities used directly as API responses
* Mixed responsibilities across classes
* Manual JSON construction

The goal is to migrate toward a clean Spring Boot architecture while preserving existing behavior.

---

# Architecture Rules

## Layer Responsibilities

### Controller Layer

Controllers must:

* Accept HTTP requests
* Validate request parameters
* Delegate work to services
* Return named response DTOs, optionally wrapped in `ResponseEntity<NamedResponseDTO>` when status or headers matter

Controllers must NOT:

* Access repositories directly
* Contain business logic
* Build HashMaps for API responses
* Perform database operations

Example:

```java
@RestController
@RequestMapping("/api/affiliates")
public class AffiliateController {

    private final AffiliateService affiliateService;

    @GetMapping("/{id}")
        public AffiliateResponseDTO getAffiliate(
        @PathVariable Long id
    ) {
        return affiliateService.getAffiliate(id);
    }
}
```

---

### Service Layer

Services contain business logic.

Services may:

* Call repositories
* Perform calculations
* Validate business rules
* Coordinate multiple entities

Services must NOT:

* Return Entity objects directly
* Return HashMaps
* Contain HTTP-specific logic

Example:

```java
@Service
public class AffiliateService {

    public AffiliateResponseDTO getAffiliate(Long id) {
        Affiliate affiliate = repository.findById(id)
            .orElseThrow();

        return mapper.toResponse(affiliate);
    }
}
```

---

### Repository Layer

Repositories are responsible only for persistence.

Repositories must:

* Extend JpaRepository
* Perform queries

Repositories must NOT:

* Contain business logic
* Build DTOs

---

### Entity Layer

Entities represent database tables.

Entities must:

* Use JPA annotations
* Represent persistence state

Entities must NOT:

* Be returned directly from APIs
* Contain API formatting logic
* Contain response-specific fields

Example:

```java
@Entity
@Table(name = "affiliates")
public class Affiliate {
}
```

---

# DTO Rules

Every API request and response must use DTOs.

Create:

```text
dto/
 ├── request/
 └── response/
```

Examples:

```java
AffiliateRequest
AffiliateResponseDTO
LoginRequest
LoginResponseDTO
```

Controllers should only expose DTOs.
Use explicit names like `AffiliateResponseDTO`, `UserResponseDTO`, and `ErrorResponseDTO`.

Never expose Entities directly.

---

# Mapper Rules

Create:

```text
mapper/
```

Examples:

```java
AffiliateMapper
UserMapper
OrderMapper
```

Responsibilities:

* Entity -> DTO
* DTO -> Entity

Prefer MapStruct when practical.

Manual mapping is acceptable if MapStruct is not yet configured.

---

# API Response Rules

Forbidden:

```java
Map<String,Object>
HashMap<String,Object>
JSONObject
```

for fixed API contracts.

Required:

```java
AffiliateResponseDTO
UserResponseDTO
OrderResponseDTO
```

Each endpoint should have an explicit response DTO class.

---

# Package Structure

Organize by feature.

Preferred:

```text
affiliate/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 ├── dto/
 └── mapper/

user/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 ├── dto/
 └── mapper/
```

Avoid giant global packages.

---

# Date Handling

Do not call:

```java
.toString()
```

for dates.

Use:

```java
LocalDate
LocalDateTime
Instant
OffsetDateTime
```

and allow Jackson to serialize.

---

# Dependency Injection

Use constructor injection only.

Allowed:

```java
private final UserService userService;

public UserController(UserService userService) {
    this.userService = userService;
}
```

Avoid field injection:

```java
@Autowired
private UserService userService;
```

---

# Validation

Use Bean Validation.

Examples:

```java
@NotBlank
@NotNull
@Email
@Size
```

Request DTOs should validate inputs.

---

# Error Handling

Create:

```text
exception/
```

Use:

```java
@RestControllerAdvice
```

for global exception handling.

Do not return ad-hoc error maps.

---

# Logging

Use:

```java
private static final Logger log
```

or Lombok:

```java
@Slf4j
```

Avoid System.out.println().

---

# Refactoring Priorities

Priority 1:

* Replace Map<String,Object> responses with DTOs
* Prefer named `*ResponseDTO` classes over generic wrapper types

Priority 2:

* Move business logic from controllers to services

Priority 3:

* Create mappers

Priority 4:

* Introduce request DTO validation

Priority 5:

* Introduce global exception handling

Priority 6:

* Introduce MapStruct

Priority 7:

* Improve package structure

---

# Preserve Behavior

The AI agent must:

* Preserve endpoint URLs
* Preserve request payloads
* Preserve response JSON fields
* Preserve database schema
* Preserve business logic

Only improve architecture and code organization.

No functional changes unless explicitly required.
