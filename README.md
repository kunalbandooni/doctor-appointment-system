# 🏥 Doctor Appointment Booking System (NestJS)

A simple RESTful API using **NestJS** to manage doctors and appointments. This app supports:

- Viewing available time slots for a doctor
- Booking appointments in available time slots
- Viewing all appointments

---

## 📦 Tech Stack

- **Node.js** with **NestJS**
- **TypeScript**
- **Swagger** (API documentation)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kunalbandooni/doctor-appointment-system.git
cd doctor-appointment-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
npm run start:dev
```

The server runs at `http://localhost:3000`

---

## 📘 API Documentation

Once the server is up, you can visit the Swagger UI to explore and test APIs:

`http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── appointment/
│   ├── controller/
│   ├── service/
│   ├── dto/
│   └── entities/
├── doctor/
│   ├── controller/
│   ├── service/
│   ├── dto/
│   └── entities/
├── utils/
├── data/
├── seed/
└── main.ts
```

## 🧠 Business Logic

- Doctors define working hours (e.g., 09:00 to 17:00).
- Appointment slots are fixed (e.g., 30 minutes).
- Time slot availability considers existing appointments.

---

## 📝 Notes

- No database is used — data is in-memory only (reset on restart).
- Appointment overlaps and time validation are handled internally.
- Support appointment cancellation and rescheduling
- Swagger helps you explore all APIs easily.

---

## ✅ To-Do (Optional Enhancements)

- Add database support (PostgreSQL)
- Add unit and integration tests
- Add pagination and filtering for appointments (get all lists)

---

## 🧑‍💻 Author

Developed by [Kunal Bandooni]  
📧 [kbandooni1@gmail.com]

---