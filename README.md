
# 🚗 Vehicle Parts Searcher

Simple full-stack web application for browsing and managing vehicle parts.

- 👤 Users can register & login
- 🔍 Users can search parts by name
- 📋 Users can view all available parts
- 🛠️ Admin can add new vehicle parts

---

## 📌 Tech Stack

### Backend
- ASP.NET Core Web API
- Dapper (micro-ORM)
- SQL Server

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript + Fetch API

---

## 📂 Project Structure

```
VehiclePartsSearcher/
├── Backend/                  # ASP.NET Core API
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Contracts/            (optional interfaces)
│   ├── Program.cs
│   ├── appsettings.json
│   └── ...
├── Frontend/
│   ├── login.html
│   ├── register.html
│   ├── admin.html
│   ├── parts.html
│   ├── css/
│   │   └── parts.css
│   ├── js/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── parts.js
└── README.md
```

---

## ⚙️ Features

**Regular User**
- Register account
- Login
- View all parts
- Search parts by name (partial match)

**Admin**
- Login (admin role)
- Add new vehicle parts

---

## 🗄️ Database Setup

Run this SQL script once:

```sql
CREATE DATABASE VehiclePartsDB;
GO

USE VehiclePartsDB;
GO

CREATE TABLE Users (
    Id       INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,     -- plain text (demo only!)
    Role     VARCHAR(20) NOT NULL        -- 'user' or 'admin'
);

CREATE TABLE VehicleParts (
    Id       INT IDENTITY(1,1) PRIMARY KEY,
    PartName VARCHAR(100) NOT NULL,
    Vehicle  VARCHAR(100) NOT NULL,
    Price    DECIMAL(10,2) NOT NULL
);
GO

-- Create default admin (CHANGE PASSWORD in real projects!)
INSERT INTO Users (Username, Password, Role)
VALUES ('admin', 'admin123', 'admin');
```

> **Security warning**: Passwords are stored in plain text here for learning purposes.  
> In real applications → use proper password hashing (BCrypt, Argon2, Identity, etc.).

---

## 🔗 Important API Endpoints

Base URL: `http://localhost:5186` (adjust port if different)

| Method | Endpoint                     | Description                  | Payload / Query params                     | Auth?     |
|--------|------------------------------|------------------------------|--------------------------------------------|-----------|
| POST   | `/api/User/register`         | Register new user            | JSON: `{"username":"...","password":"..."}`| No        |
| POST   | `/api/User/login`            | Login                        | JSON: `{"username":"...","password":"..."}`| No        |
| GET    | `/api/Vehicle/all`           | Get all parts                | —                                          | No        |
| GET    | `/api/Vehicle/search?name=…` | Search by part name          | `?name=brake` or `?name=pad`               | No        |
| POST   | `/api/Vehicle`               | Add new part (admin only)    | JSON: `{"partName":"…","vehicle":"…","price":250.00}` | Admin |

---

## ▶️ How to Run

### 1. Backend (API)

1. Open the project in **Visual Studio**
2. Restore NuGet packages
3. Update connection string in `appsettings.json`
4. Press **F5** to run  
   → API usually starts at: `http://localhost:5186`

### 2. Enable CORS (critical for frontend!)

In `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

app.UseCors("AllowAll");
```

### 3. Frontend

1. Open the `Frontend` folder in **VS Code**
2. Install **Live Server** extension
3. Right-click `login.html` / `parts.html` → **Open with Live Server**
4. Or open files directly (some browsers may block fetch without http server)

---

## 🔍 Example – Search "brake"

```http
GET http://localhost:5186/api/vehicle/search?name=brake
```

Example response:

```json
[
  {
    "id": 3,
    "partName": "Brake Pads",
    "vehicle": "Toyota Corolla",
    "price": 89.99
  }
]
```

---

