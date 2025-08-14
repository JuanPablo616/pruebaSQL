# Financial Data Management System

## 📌 Description
This project organizes and manages financial data from fintech platforms like **Nequi** and **Daviplata** into a structured SQL database.  
It includes:
- Database creation (DDL)
- Mass data load from CSV
- CRUD operations for the `clients` entity
- Basic dashboard (frontend)
- Advanced SQL queries
- Postman collection for testing

The system was developed as part of the **Performance Test – Module 4 (SQL Databases)**.

---

## 🛠️ Technologies Used
- **MySQL** (Database)
- **Node.js** + **Express** (Backend API)
- **Multer** + **csv-parser** (CSV upload & processing)
- **Postman** (API testing)

---

## 📂 Project Structure
/project-root
│
├── backend/
│   ├── server.js        # Express API with CRUD, CSV upload & reports
│   ├── database.sql     # Database schema (DDL)
│   ├── uploads/         # Temporary folder for uploaded CSV files
│
├── frontend/
│   ├── index.html       # Basic dashboard for clients
│
├── postman/
│   ├── collection.json  # Postman collection with CRUD & reports
│
├── model/
│   ├── model_relational.png
│   ├── model_relational.pdf
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Database Setup
1. Import `database.sql` into MySQL:
```bash
mysql -u root -p < database.sql
```
2. Update database credentials in `server.js`.

---

### 2️⃣ Install Dependencies
From the backend folder:
```bash
npm install
```

---

### 3️⃣ Run Backend
```bash
node server.js
```
Server will run at:  
```
http://localhost:3000
```

---

### 4️⃣ Open Frontend
Open `frontend/index.html` in your browser.

---

## 📤 Mass Data Load (CSV)
You can upload a `.csv` file directly from the dashboard.

### CSV format example:
```csv
full_name,email,phone
Juan Perez,juan@example.com,3001234567
Maria Gomez,maria@example.com,3109876543
```

The upload will insert the data into the **clients** table automatically.

---

## 🔄 CRUD Endpoints
**Base URL:** `http://localhost:3000`

| Method | Endpoint           | Description            |
|--------|-------------------|------------------------|
| GET    | /clients          | Get all clients        |
| POST   | /clients          | Add a new client       |
| PUT    | /clients/:id      | Update client by ID    |
| DELETE | /clients/:id      | Delete client by ID    |

---

## 📊 Advanced Queries (Reports)
| Endpoint                                     | Description                              |
|----------------------------------------------|------------------------------------------|
| GET `/report/total-paid`                     | Total amount paid per client             |
| GET `/report/pending-invoices`               | Pending invoices with client & transaction |
| GET `/report/transactions-by-platform/:name` | Transactions by specific platform        |

Example:  
`GET /report/transactions-by-platform/Nequi`

---

## 📬 Postman Collection
Import `postman/collection.json` into Postman.  
Includes:
- CRUD for `clients`
- 3 advanced queries

---

## 🗄️ Normalization
The original Excel data was normalized to **3NF**:
1. **1NF:** Removed repeated groups & ensured atomic values.
2. **2NF:** Removed partial dependencies.
3. **3NF:** Removed transitive dependencies.

**Entities:**
- `clients`
- `invoices`
- `platforms`
- `transactions`

---

## 👤 Developer Info
**Name:** Juan Pablo Rojas  
**Clan:** Lovelace
**Email:**juan.rojas0616@gmail.com 


un placer haber sido parte de esta hermosa cohorte y hermoso clan, todos somos instantes, sin importar nada.
me llevo un bonito recuerdo de todos, gracias.

querían destronar a Lovelace y lo lograron.

---
