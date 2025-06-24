






# 📚 Library Management System

This is a **backend project** for managing a library. It is built using the following technologies:

- **Express.js**
- **MongoDB**
- **Mongoose**
- **TypeScript**
- **Zod** for schema validation

---

## 🧱 Project Architecture

The project follows the **MVC (Model-View-Controller)** pattern, which helps keep the code clean and organized.

### ✅ Key Features

- 🔒 **Schema validation** using `Zod`
- 🔍 **Filtering capabilities** for efficient book and user searches
- 📦 **Business logic** for book availability and borrowing control
- 🧮 **MongoDB aggregation pipeline** usage for complex queries
- ⚙️ **Mongoose middlewares** (`pre` / `post`) for data hooks
- 📘 **Static methods** in models for reusable logic (e.g. checking if a book exists)

---

This backend is a great foundation for any library management application and demonstrates real-world use of TypeScript with a scalable Node.js architecture.


### Explanation

- **src/**: All TypeScript source code lives here.
- **app/**: Organizes core backend logic (routes, controllers, models).
- **server.ts**: Starts the Express server and connects to the database.
- **dist/**: Compiled output after running `tsc`.
- `.env`: Secrets and configuration (should be added to `.gitignore`).
- `package.json`: Lists dependencies and build/start scripts.
- `tsconfig.json`: TypeScript compiler settings.

---