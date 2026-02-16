# 🚀 Gidy.ai – Client (Frontend)

The frontend application for Gidy.ai Profile Management Platform built using React, TypeScript, and SCSS.

This client provides a responsive and modern interface where users can create, edit, and manage their professional profiles with a centralized Light/Dark theme system.

---

## 🌟 Features

Profile Creation & Editing  
Users can dynamically create and update their professional profile details.

Education & Experience Management  
Dedicated modular components for handling education and work experience.

Career Goals Section  
Structured goal management with real-time UI updates.

Profile Image Upload  
Integrated image upload and display functionality.

Global Light/Dark Theme System (Innovation)  
A centralized theme architecture using React state and SCSS variables for smooth and scalable theme switching.

Fully Responsive Design  
Optimized for mobile, tablet, and desktop devices.

Backend API Integration  
Connected to Railway-deployed Node.js backend.

---

## 🛠️ Tech Stack

- React.js (v18+)
- TypeScript
- SCSS (Modular Styling)
- Axios
- Vite

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/gidy-ai-profile.git
cd gidy-ai-profile/client

2️⃣ Install Dependencies
npm install

3️⃣ Environment Configuration

Create a .env file inside the /client directory:

VITE_API_URL=http://localhost:5000


For production, replace this with your Railway backend URL.

4️⃣ Run Development Server
npm run dev


Frontend runs at:

http://localhost:5173

💡 Innovation – Centralized Theme Architecture

Instead of toggling theme styles inside individual components:

A global theme state is managed at the root level

SCSS variables define color palettes

:root and [data-theme='dark'] strategies control theme changes

Smooth switching without unnecessary re-renders

Accessible color contrast maintained in both modes

This demonstrates scalable frontend architecture beyond basic CRUD functionality.

🚀 Deployment

Frontend deployed on Vercel
Connected securely to Railway backend
Database hosted on MongoDB Atlas

👨‍💻 Author

Madesh Mohan
MERN Stack Developer
