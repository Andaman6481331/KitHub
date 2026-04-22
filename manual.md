# KitHub Project Manual

Comprehensive guide for installation, configuration, and running the KitHub project.

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Installation](#-installation)
3. [Database Setup](#-database-setup)
4. [Configuration](#-configuration)
5. [Running the Project](#-running-the-project)
6. [Troubleshooting](#-troubleshooting)

---

## 🛠 Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: Version 18 or higher (Recommended: LTS)
- **Python**: Version 3.10 or higher
- **MySQL Server**: Standard installation (e.g., MySQL Community Server)
- **Expo Go App**: Installed on your physical mobile device (to test the frontend)

---

## 📥 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd KitHub
```

### 2. Root Dependencies
Install the tools required to run both frontend and backend concurrently.
```bash
npm install
```

### 3. Backend Setup
Navigate to the backend directory and set up a virtual environment.
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# or: source venv/bin/activate # Linux/Mac
pip install -r requirements.txt
cd ..
```

### 4. Frontend Setup
Navigate to the KitHub mobile app directory and install dependencies.
```bash
cd frontend/KitHub
npm install
cd ../..
```

---

## 🗄 Database Setup

The project uses a MySQL database named `kithub`.

### 1. Create Database
Log in to your MySQL console and run:
```sql
CREATE DATABASE kithub;
```

### 2. Create Items Table
Use the following schema to create the `items` table:
```sql
USE kithub;

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    stock INT DEFAULT 0,
    img_url VARCHAR(255),
    price1 DECIMAL(10, 2) DEFAULT 0.00,
    price2 DECIMAL(10, 2) DEFAULT 0.00,
    price3 DECIMAL(10, 2) DEFAULT 0.00,
    price4 DECIMAL(10, 2) DEFAULT 0.00,
    price5 DECIMAL(10, 2) DEFAULT 0.00
);
```

### 3. Database Credentials
The backend expects the following credentials in `backend/db_test.py`:
- **Host**: `127.0.0.1`
- **User**: `root`
- **Password**: `Andaman#1`

> [!NOTE]
> If your password differs, update the `pymysql.connect` calls in `backend/db_test.py`.

---

## ⚙️ Configuration

### Important: Local Network IP
For your physical phone to communicate with the backend, both must be on the **same Wi-Fi network**.

1. Find your computer's local IP address (e.g., `192.168.1.XX`).
2. Update the API endpoints in the following files:
    - `frontend/KitHub/app/search.tsx`
    - `frontend/KitHub/app/item-detail.tsx`
    - `frontend/KitHub/app/(tabs)/index.tsx` (if applicable)

Replace `192.168.1.40` with your actual local IP.

---

## 🚀 Running the Project

You can run both the backend and frontend simultaneously from the root directory.

### Start Everything (Recommended)
```bash
npm run dev
```

### Run Separately

**Backend:**
```bash
cd backend
.\venv\Scripts\activate
uvicorn db_test:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend/KitHub
npm start
```

---

## 📱 Testing on Mobile

1. Run the frontend using `npm start`.
2. A QR code will appear in your terminal.
3. Open the **Expo Go** app on your phone.
4. Scan the QR code.
5. The app will bundle and load on your device.

---

## ❓ Troubleshooting

- **Database Connection Error**: Ensure MySQL service is running and the credentials in `db_test.py` match your setup.
- **Frontend can't reach Backend**: Verify that your phone and laptop are on the same Wi-Fi and that you've updated the hardcoded IP addresses in the React Native code.
- **Missing YOLO Model**: Ensure `model2.pt` is present in the `backend/` directory.
