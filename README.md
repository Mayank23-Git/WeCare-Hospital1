# WeCare Hospital - Modern Healthcare Platform & AI Doctor Assistant

A full-stack, enterprise-grade hospital management and outpatient appointment booking web application featuring an **AI-powered Doctor Recommendation Assistant** built with Google Gemini API, React (Vite), Node.js, Express, MongoDB (Mongoose), and JWT authentication.

---

## 🏥 Project Overview

**WeCare Hospital** provides a seamless, compassionate digital gateway for patients and healthcare administrators:

- **AI Doctor Recommendation Assistant**: Patients describe their symptoms, pain, or health complaints in plain conversational words (e.g., *"I have had a sore throat for three days and it hurts when I swallow"*). The assistant analyzes clinical patterns, highlights potential emergency red-flags, and matches the patient with existing specialist doctors and clinical departments.
- **Direct Appointment Booking**: One-click transition from AI recommendations or department/doctor directories into the appointment booking flow. Generates unique, verifiable Booking IDs (e.g., `WC-2026-90214`) with real-time status set to `Pending`.
- **Real-Time Booking Tracking**: Patients track their appointment in real-time across a 3-stage clinical triage timeline (`Pending` → `Under Review / Waiting` → `Confirmed`).
- **Comprehensive Clinical Directory**: 9 specialized hospital departments (Cardiology, Dermatology, Neurology, Orthopedics, Pediatrics, ENT, General Medicine, Gynecology, Dental) with 18+ credentialed senior physicians.
- **Secure Hospital Staff Admin Portal**: Role-based administrative dashboard protected by JWT. Hospital coordinators view all incoming appointment bookings, filter by status, and update statuses to `Confirmed` or `Waiting` with immediate synchronization.

---

## 🛠️ Technologies Used

### Frontend
- **React 19** with **Vite 8**
- **Tailwind CSS v4** for modern, responsive healthcare styling
- **Lucide React** for clinical iconography
- **Fetch API** for REST communication

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose** (with fallback in-memory datastore for zero-config preview)
- **JSON Web Token (JWT)** for administrative authentication
- **@google/genai SDK** with `gemini-3.8-flash` for server-side AI medical symptom triage
- **CORS** and **dotenv** for configuration and cross-origin resource sharing

---

## 📁 Folder Structure

```
wecare-hospital/
├── frontend/                     # Dedicated Frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar.jsx        # Navigation bar with emergency banner
│   │   │   ├── Footer.jsx        # Hospital footer, accreditations, disclaimer
│   │   │   ├── DoctorCard.jsx    # Doctor profile cards with booking CTA
│   │   │   ├── DepartmentCard.jsx# Department cards with service highlights
│   │   │   ├── DoctorModal.jsx   # Detailed physician biography dialog
│   │   │   └── StatusBadge.jsx   # Live appointment status badges
│   │   ├── pages/                # Main view pages
│   │   │   ├── HomePage.jsx      # Landing page with emergency highlights & CTAs
│   │   │   ├── AboutPage.jsx     # Mission, facilities, accreditations
│   │   │   ├── DepartmentsPage.jsx# Department directory & search
│   │   │   ├── DoctorsPage.jsx   # Doctors catalog with department filters
│   │   │   ├── BookingPage.jsx   # Interactive appointment booking form
│   │   │   ├── TrackBookingPage.jsx # Booking ID status tracking & timeline
│   │   │   ├── AiAssistantPage.jsx# ChatGPT-style Doctor Recommendation Assistant
│   │   │   └── AdminPage.jsx     # Secure staff login & booking management console
│   │   ├── services/
│   │   │   └── api.js            # Frontend REST API service client
│   │   ├── App.jsx               # Application root component
│   │   ├── main.jsx              # Vite entry point
│   │   └── index.css             # Tailwind CSS imports
│   └── package.json
│
├── backend/                      # Dedicated Express REST API & AI Service
│   ├── config/
│   │   └── db.js                 # MongoDB connection & fallback datastore
│   ├── controllers/
│   │   ├── aiController.js       # AI symptom recommendation & validation
│   │   ├── appointmentController.js # Appointment creation & tracking
│   │   ├── departmentController.js  # Department catalog queries
│   │   ├── doctorController.js   # Doctor catalog queries
│   │   └── adminController.js    # Admin login, stats & status updates
│   ├── models/
│   │   ├── Department.js         # Mongoose Department schema
│   │   ├── Doctor.js             # Mongoose Doctor schema
│   │   └── Appointment.js        # Mongoose Appointment schema
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT Bearer token authentication guard
│   ├── routes/
│   │   ├── aiRoutes.js           # POST /api/ai/doctor-recommendation
│   │   ├── appointmentRoutes.js  # POST /api/appointments, GET /:id
│   │   ├── departmentRoutes.js   # GET /api/departments, GET /:id
│   │   ├── doctorRoutes.js       # GET /api/doctors, GET /:id
│   │   └── adminRoutes.js        # POST /login, GET /appointments, PATCH /:id/status
│   ├── services/
│   │   └── geminiService.js      # @google/genai Gemini 3.8 Flash triage service
│   ├── data/
│   │   └── seedData.js           # Departments, doctors & demo appointments seed
│   ├── server.js                 # Standalone Express backend server
│   └── package.json
│
├── src/                          # Root frontend source (configured for AI Studio preview)
├── server.ts                     # Production full-stack SSR/static server
├── vite.config.ts                # Vite config with backend API middleware
├── .env.example                  # Environment variable template
├── .gitignore                    # Git exclusions
├── metadata.json                 # AI Studio capability metadata
└── README.md                     # Project documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root (copied from `.env.example`):

```bash
cp .env.example .env
```

Set the following variables:

| Variable | Description | Default / Example |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key for AI Doctor Assistant | *Your Gemini API key* |
| `MONGODB_URI` | MongoDB connection URI (Atlas or local) | `mongodb://localhost:27017/wecare_hospital` |
| `JWT_SECRET` | Secret key for signing admin authentication tokens | `wecare_super_secret_jwt_key_2026_secure` |
| `ADMIN_EMAIL` | Default administrator email | `admin@wecarehospital.com` |
| `ADMIN_USERNAME`| Default administrator username | `admin` |
| `ADMIN_PASSWORD`| Default administrator password | `wecareAdmin2026!` |
| `PORT` | Full-stack server port | `3000` |

---

## 🚀 How to Install and Run

### 1. Install Dependencies
In the root directory, install all required packages:
```bash
npm install
```

To install backend dependencies separately:
```bash
cd backend && npm install && cd ..
```

### 2. Start the Application

#### Option A: Full-Stack Development Mode (Recommended)
Runs both the React frontend and Express backend middleware seamlessly on port 3000:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Option B: Standalone Backend Server
To run only the Express backend REST API on port 5000:
```bash
npm run backend
# or: node backend/server.js
```

#### Option C: Production Full-Stack Build
```bash
npm run build
npm run start
```

---

## 🍃 How to Connect MongoDB

1. **Using MongoDB Atlas (Cloud - Recommended)**:
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - In Atlas, create a database user and allow your IP in Network Access.
   - Copy the connection string:
     ```
     MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/wecare_hospital?retryWrites=true&w=majority"
     ```
   - Paste it into your `.env` file.

2. **Using Local MongoDB**:
   - Ensure the MongoDB service is running:
     ```bash
     mongod --dbpath /path/to/data
     ```
   - In `.env`:
     ```
     MONGODB_URI="mongodb://localhost:27017/wecare_hospital"
     ```

3. **Built-in Resilience**:
   If no external MongoDB instance is running, WeCare Hospital automatically activates an in-memory fallback datastore with the exact same Mongoose queries, ensuring the app runs immediately without crashes.

---

## 🤖 How to Configure Gemini API

1. Obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).
2. In `.env`, set:
   ```bash
   GEMINI_API_KEY="AIzaSyYourGeneratedGeminiKey..."
   ```
3. The server communicates with Gemini using the `@google/genai` SDK (`gemini-3.8-flash` model) on the backend route `POST /api/ai/doctor-recommendation`.
4. The backend validates every recommendation to ensure only doctors and departments that actually exist in the hospital catalog are presented to the patient.

---

## 🔐 Administrative Access

Navigate to the **Admin Portal** link in the header or footer, or select the Admin tab:

- **Username / Email**: `admin` or `admin@wecarehospital.com`
- **Password**: `wecareAdmin2026!`

The Admin Dashboard provides real-time counts, status filtering, and one-click actions:
- **Confirm**: Sets status to `Confirmed`.
- **Waiting**: Sets status to `Under Review / Waiting`.
Updates synchronize directly to the database and reflect instantly on the patient's **Track Booking** screen.

---

## 🚢 Deployment

### Deploying to Cloud Run / Vercel / Render / Heroku
1. Build the production assets:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```
3. Configure the environment variables (`GEMINI_API_KEY`, `MONGODB_URI`, `JWT_SECRET`, `ADMIN_PASSWORD`) in your hosting provider's dashboard.

---

## ⚖️ Medical Safety Notice

The WeCare AI Doctor Assistant is designed strictly for navigational guidance and appointment scheduling assistance. It does not provide medical diagnoses, prescriptions, or dosages. Patients experiencing critical emergencies (such as severe chest pain, stroke signs, or trauma) are directed immediately to emergency medical services.
