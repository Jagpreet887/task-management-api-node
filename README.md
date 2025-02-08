# 📝 Task Management API

A backend API for a Task Management System built with **Node.js, Express, Sequelize, and PostgreSQL**.  
This API allows users to **create, update, delete, and retrieve tasks** with dynamic status updates.

---

## 📌 Features  
✅ Create, update, delete, and retrieve tasks  
✅ Automatically calculates task **status** (`Pending`, `Due Today`, `Overdue`, `Completed`)  
✅ Ensures **validations** (e.g., `due_date` cannot be in the past)  
✅ Supports **custom date formats** (`dd-mm-yyyy`, `dd-mm-yyyyTHH:MM:SS`)  
✅ Uses **Sequelize ORM** for database operations  
✅ Optional **deployment to AWS Lambda with API Gateway**  

---

## 🚀 **Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Jagpreet887/task-management-api-node.git
cd task-management-api-node
```

### **2️⃣ Install Dependencies**
```sh
npm install
```
## **3️⃣ Set Up Environment Variables**
```env
DB_HOST=localhost
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=tasks_db
DB_PORT=5432
PORT=5000 # defalut port is 5000
```
## **4️⃣ Start the Server**
```sh
npm run server
```

---

# 📌 API Endpoints & Payloads
## **1️⃣ Create a Task**
✅ API Path: `POST /tasks`

## **Request Payload**
```sh
{
  "title": "Finish project",
  "description": "Complete backend development",
  "due_date": "15-02-2025"
}
```
## **Response**
```sh
{
  "id": 1,
  "title": "Finish project",
  "description": "Complete backend development",
  "due_date": "2025-02-15",
  "status": "Pending",
  "completed_at": null,
  "created_at": "2025-02-08T11:09:52.581Z",
  "updated_at": "2025-02-08T11:09:52.589Z",
}
```
## **2️⃣ Retrieve All Tasks**
✅ API Path: `GET /tasks`

## **Response**
```sh
[
  {
    "id": 1,
    "title": "Finish project",
    "description": "Complete backend development",
    "due_date": "2025-02-15",
    "status": "Pending",
    "completed_at": null,
    "created_at": "2025-02-08T11:09:52.581Z",
    "updated_at": "2025-02-08T11:09:52.589Z",
  },
  {
    "id": 2,
    "title": "Submit report",
    "description": "Send final report",
    "due_date": "2025-02-08",
    "status": "Due Today",
    "completed_at": null,
    "created_at": "2025-02-08T11:09:52.581Z",
    "updated_at": "2025-02-08T11:09:52.589Z",
  }
]
```
## **3️⃣ Retrieve a Task by ID**
✅ API Path: `GET /tasks/:id`

## **Response**
```sh
{
    "id": 1,
    "title": "Finish project",
    "description": "Complete backend development",
    "due_date": "2025-02-15",
    "status": "Pending",
    "completed_at": null,
    "created_at": "2025-02-08T11:09:52.581Z",
    "updated_at": "2025-02-08T11:09:52.589Z",
  }
```
## **4️⃣ Update a Task**
✅ API Path: `PUT /tasks/:id`

## **Request Payload**
```sh
{
  "title": "Finish project",
  "description": "Complete backend development",
  "due_date": "15-02-2025"
}
```
## **Response**
```sh
{
  "id": 1,
  "title": "Finish project",
  "description": "Complete backend development",
  "due_date": "2025-02-15",
  "status": "Pending",
  "completed_at": null,
  "created_at": "2025-02-08T11:09:52.581Z",
  "updated_at": "2025-02-08T11:09:52.589Z",
}
```
## **5️⃣ Mark a Task as Completed**
✅ API Path: `PUT /tasks/:id/complete`

## **Response**
```sh
{
  "id": 1,
  "title": "Finish project",
  "description": "Complete backend development",
  "due_date": "2025-02-15",
  "status": "Pending",
  "completed_at": null,
  "created_at": "2025-02-08T11:09:52.581Z",
  "updated_at": "2025-02-08T11:09:52.589Z",
}
```
## **6️⃣ Delete a Task**
✅ API Path: `DELETE /tasks/:id`

## **Response**
```sh
{
  "id": 1,
  "title": "Finish project",
  "description": "Complete backend development",
  "due_date": "2025-02-15",
  "status": "Pending",
  "completed_at": null,
  "created_at": "2025-02-08T11:09:52.581Z",
  "updated_at": "2025-02-08T11:09:52.589Z",
}
```
## **7️⃣ Search Tasks by Keyword**
✅ API Path: `GET /tasks/search?keyword=project`

## **Response**
```sh
[
  {
    "id": 1,
    "title": "Finish project",
    "description": "Complete backend development",
    "due_date": "2025-02-15",
    "status": "Pending",
    "completed_at": null,
    "created_at": "2025-02-08T11:09:52.581Z",
    "updated_at": "2025-02-08T11:09:52.589Z",
  }
]
```