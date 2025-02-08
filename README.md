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
cd task-management-api
