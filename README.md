
# Project Overview

This project is a RESTful API built with [NestJS](https://nestjs.com/), using [TypeScript](https://www.typescriptlang.org/) and [TypeORM](https://typeorm.io/) for data persistence. The database of choice is [SQLite](https://www.sqlite.org/index.html), chosen for its simplicity and ease of setup.

---

## Design Decisions

### 1. **Framework Choice: NestJS**
- **Why NestJS?**  
  NestJS provides a scalable, modular architecture with built-in support for decorators, dependency injection, middleware, and guards. This structure helps separate concerns and makes the codebase easier to test and maintain.

- **Benefits:**
  - Clean separation of concerns (Controllers, Services, Repositories).
  - Built-in support for testing.
  - Easily extensible.

---

### 2. **Database: SQLite**
- **Why SQLite?**  
  SQLite was chosen for its lightweight, file-based storage, making it ideal for prototyping, local development, and small-scale applications.

- **Trade-offs:**
  - **Pros**:
    - No need to run an external DB server.
    - Simple to set up and use.
    - Good for development and testing.
  - **Cons**:
    - Not suitable for production at scale.
    - No built-in support for concurrent writes.
    - Harder to manage in a distributed environment.

---

### 3. **ORM: TypeORM**
- **Why TypeORM?**  
  TypeORM integrates seamlessly with NestJS and supports decorators and entity-based models, reducing boilerplate and aligning with the TypeScript-first approach.

- **Trade-offs:**
  - Type-safe and declarative models.
  - Automatic migrations and schema sync.
  - Runtime errors can occur if entities are misconfigured.
  - Slower compile-time compared to lighter ORMs like Prisma.

---

### 4. **Validation and Serialization**
- Implemented using `class-validator` and `class-transformer`.
- DTOs help enforce request shape and ensure only valid data reaches the service layer.

---

### 5. **Testing**
- Service and controller layers are unit-tested using Jest.
- Mocked database interactions using dependency injection.

---

### 6. **Documentation**
- Swagger is integrated using `@nestjs/swagger` for auto-generating API documentation.
- The API is live and can be accessed through `https://stackron-api.onrender.com/api-docs`
---
S