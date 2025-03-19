<!-- npx sequelize-cli migration:generate --name create-users
npx sequelize-cli migration:generate --name create-content


npx sequelize-cli db:migrate -->
<!-- npx sequelize-cli db:seed:all -->

<!-- npx sequelize-cli db:migrate:undo:all -->

# Content Management System - Backend

## Description

This is the backend API for the Content Management System, allowing registered users to create, manage, and update their publicly viewable content. It provides authentication, user management, and content management functionalities.

## Features

- User authentication (JWT-based login & registration)
- Profile management (view & edit profile details)
- Content management (create, update, delete YouTube embed links)
- Role-based access control
- Secure API with authentication middleware
- PostgreSQL database integration using Sequelize ORM
- Data validation with Joi
- Follows SOLID design principles

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Joi for validation
- JWT for authentication

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/imranwebdeveloper/csm-express-backend.git
   cd csm-express-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and configure environment variables:

   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Run database migrations:

   ```sh
   npx sequelize db:migrate
   ```

5. Seed the database (optional):

   ```sh
   npx sequelize db:seed:all
   ```

6. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication Routes

```sh
POST /api/auth/register  - Register a new user
POST /api/auth/login     - Login and get JWT token
```

### User Routes

```sh
GET /api/users/         - Get all users
GET /api/users/:id      - Get user by ID
```

### Profile Routes

```sh
GET /api/profile        - Get authenticated user's profile
PUT /api/profile        - Update authenticated user's profile
```

### Content Routes

```sh
GET /api/contents/            - Get all public content
GET /api/contents/users       - Get authenticated user's content
GET /api/contents/:id         - Get content by ID
POST /api/contents/           - Create new content (authenticated)
PUT /api/contents/:id         - Update content (authenticated)
DELETE /api/contents/:id      - Delete content (authenticated)
```

## Running the Project

- **Start the Development Server:**

  ```sh
  npm run dev
  ```
