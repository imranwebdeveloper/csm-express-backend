# Ticket Support API 🎫

An Express.js-based backend API for managing customer support tickets.

## 🚀 Features

- User authentication (Customers & Admins)
- Role-based access control (RBAC)
- Customers can create, view, and delete tickets
- Admins can manage tickets and update their status
- Ticket replies & status management
- Secure API with JWT authentication
- Prisma ORM with PostgreSQL

## 📦 Installation

1️⃣ **Clone the repository**

```sh
git clone https://github.com/your-username/ticket-support-api.git
cd ticket-support-api
```

2️⃣ **Install dependencies**

```sh
npm install
```

3️⃣ **Set up environment variables**  
Create a `.env` file and add:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ticketdb"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

4️⃣ **Run database migrations**

```sh
npx prisma migrate dev --name init
```

5️⃣ **Start the server**

```sh
npm run dev
```

## 🔑 Login Credentials

### **Admin Login:**

**Email:** admin@gmail.com  
**Password:** Password

### **Customer Login:**

**Email:** customer@gmail.com  
**Password:** Password

## 🛠 Role-Based Features

### **Customer Capabilities:**

✅ Create, submit, view, and delete their own complaint tickets.  
✅ Each ticket consists of a **subject** and **description**.  
✅ Upon submission, tickets are **automatically assigned to an Admin**.

### **Admin Capabilities:**

✅ View **all tickets** submitted by customers.  
✅ Reply to tickets and **update their status** ( "OPEN" or "Closed").  
✅ **Dashboard** to manage all incoming tickets.

## 🛠 API Endpoints

| Method | Endpoint             | Description            | Auth |
| ------ | -------------------- | ---------------------- | ---- |
| POST   | `/api/auth/register` | Register a new user    | ❌   |
| POST   | `/api/auth/login`    | User login & JWT token | ❌   |
| GET    | `/api/tickets`       | Get all tickets        | ✅   |
| POST   | `/api/tickets`       | Create a new ticket    | ✅   |
| PUT    | `/api/tickets/:id`   | Update ticket status   | ✅   |
| DELETE | `/api/tickets/:id`   | Delete a ticket        | ✅   |

🔑 **Auth:**  
✅ = Requires Bearer Token authentication

## 🛠 Tech Stack

- **Backend:** Express.js, Node.js
- **Database:** MySQL, Prisma ORM
- **Authentication:** JWT
