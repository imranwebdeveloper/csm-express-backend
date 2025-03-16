<!-- npx sequelize-cli migration:generate --name create-users
npx sequelize-cli migration:generate --name create-content

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate -->

# Content Management API

This is a backend API for managing user-generated content with authentication, pagination, and content operations.

## Features

- User authentication with JWT
- Role-based access control (Admin & User)
- CRUD operations for content
- Pagination support
- Sequelize ORM with PostgreSQL

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/imranwebdeveloper/csm-express-backend
   cd your-repo
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:

   ```env
   DATABASE_URL=mysql://user:password@localhost:3306/dbname
   JWT_SECRET=your_secret_key
   ```

4. Run database migrations and seed data:

   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a token

### Content Management

- `GET /api/contents` - Fetch all content (Admin only)
- `GET /api/contents/user` - Fetch user's content
- `POST /api/contents` - Create content
- `PUT /api/contents/:id` - Update content
- `DELETE /api/contents/:id` - Delete content

## Pagination

To paginate results, add `?page=1&limit=10` to endpoints that support it.
