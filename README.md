# RentNest 🏠

RentNest is a modern, full-stack property rental and booking platform designed to bridge the gap between property owners and tenants. It provides owners with powerful analytics tools to track earnings and manage properties, while offering tenants a seamless browsing and booking experience.

## 🚀 Live Demo
Experience the live application here: **[https://rentnest-app.vercel.app](https://your-live-url-here.com)** *(Replace with your actual URL)*

---

## 📌 Purpose
The main purpose of RentNest is to simplify the house/property renting process. Property owners often struggle to manage multiple listings, track monthly bookings, and calculate total earnings accurately. RentNest automates this by providing an intuitive dashboard with visual charts. For tenants, it acts as a reliable marketplace to discover and book verified properties easily.

---

## ✨ Key Features

### For Property Owners:
* **Analytics Dashboard:** View total earnings, total properties listed, and total bookings at a single glance.
* **Monthly Earnings Chart:** A dynamic interactive chart showing earnings distribution over the last 12 months.
* **Property Management:** Easily list new properties, update descriptions, set prices, and monitor booking status.

### For Tenants & General Users:
* **Advanced Discovery:** Browse through available apartments, houses, or rooms with detailed specifications.
* **Seamless Booking:** Instant booking functionality that securely logs data directly into the system.
* **Responsive UI:** Fully optimized for Mobile, Tablet, and Desktop screens with a clean dark-mode aesthetic.

---

## 🛠️ Tech Stack & NPM Packages Used

### Front-end (Next.js App Router)
* **next** (v14/v15) - The React framework for production.
* **react / react-dom** - Core UI library.
* **@heroui/react** (formerly NextUI) - Used for modern, pre-built UI components like Cards, Buttons, and Layouts.
* **@gravity-ui/icons** - Integrated for clean, lightweight, and modern iconography across the dashboard.
* **recharts** / **chart.js** (via `OwnerChart`) - Utilized for rendering responsive data visualization graphs.
* **tailwindcss** - Utility-first CSS framework for fast and adaptive styling.

### Back-end (Node.js & Express)
* **express** - Fast, unopinionated, minimalist web framework for the API server.
* **mongodb** - NoSQL database used to store property listings, user info, and booking timelines.
* **cors** - Middleware to enable cross-origin resource sharing between Front-end and Back-end.
* **dotenv** - For managing secure environment variables locally and in production.

---

## 💻 Getting Started

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine.

