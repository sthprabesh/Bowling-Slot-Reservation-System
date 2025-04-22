# Project Phase 2 - Basic Structure and Main Functionalities

This document explains the development progress of the **Bowling Slot Reservation System** during Phase 2, highlighting the environment setup, architecture, database management, features, code documentation, testing, and user interface enhancements.

---

## 1. Environment
- The system is currently running locally for development and testing purposes.
- Future deployment is planned on **AWS** (Amazon Web Services) or a similar cloud hosting platform to ensure scalability and secure access for users.
- Cloud hosting will enhance performance and make the system globally accessible.

---

## 2. Backend
- Built using **Node.js**, a fast, asynchronous runtime for server-side application development.
- **Express.js**, a lightweight Node.js framework, is utilized to manage API endpoints and backend logic efficiently.
- Authentication is **session-based**, storing sessions on the server to track user authentication status.
- Key backend routes include:
  - `/auth/signup` → User registration with password hashing using `bcrypt`.
  - `/auth/login` → Validates credentials and creates user sessions.
  - `/auth/logout` → Clears the session to log users out.
  - `/booking/book` → Handles bowling slot bookings.
  - `/booking/reservations/:userId` → Fetches upcoming reservations for a user.
  - `/booking/edit/:bookingId` → Updates an existing booking.
  - `/booking/delete/:bookingId` → Deletes a reservation with restrictions.

---

## 3. Frontend
- Built with **React.js**, which ensures a modular, reactive, and user-friendly interface.
- **React Router** enables dynamic navigation across pages like the dashboard, slot booking, and account information.
- Each React component is paired with scoped CSS in a **styles folder**, ensuring that styles remain modular and do not conflict with others.
- State management with `useState` and `useEffect` ensures seamless updates based on user interactions.

---

## 4. Database
- The system uses **PostgreSQL**, a powerful relational database to securely store user and booking data.
- Database schema includes:
  - **Users Table** → Holds user details (name, email, phone, hashed password).
  - **Bookings Table** → Tracks reservations (date, time, lanes, and duration).
- Queries are optimized for:
  - Checking real-time availability of slots.
  - Efficient retrieval of upcoming and past reservations.
- The database is designed to handle larger user bases as the system scales.

---

## 5. Basic Structure and Architecture
- The backend is structured using the **MVC (Model-View-Controller) Architecture**:
  - **Model**: Manages database interactions and data logic (e.g., retrieving user or booking data).
  - **View**: Managed by React.js, rendering the user interface for dashboard, forms, and booking pages.
  - **Controller**: Acts as the intermediary, processing requests and managing the flow between the Model and View.
- This architecture ensures that the codebase is modular, easy to maintain, and scalable.

---

## 6. Functionalities
- Key Implemented Features:
  - **User Authentication** → Secure signup, login, and logout functionality using session management.
  - **Booking System** → Allows users to reserve bowling slots with validation for lane availability.
  - **Upcoming and Past Reservations** → Provides filtered views of future and previous bookings.
  - **Edit and Delete Bookings**:
    - Users can modify or cancel bookings if they are more than 24 hours away.
- Future Enhancements:
  - **Admin Panel** → For monitoring and managing lane availability and bookings.

---

## 7. Code Quality and Documentation
- Code is organized and modular for maintainability:
  - Separate components like `Login.jsx`, `Signup.jsx`, and `SlotBookingPage.jsx` make it easy to update or debug features.
  - Scoped CSS prevents style conflicts across components.
- Backend functions are commented to explain their purpose and logic.
- API documentation is maintained using **Postman**, detailing request structures and expected responses.

---

## 8. Testing and Error Handling
### Frontend Testing
- Validated navigation routes and ensured that UI elements are rendered correctly.
- Mocked API calls for success and failure scenarios in components such as Account Information, Login/Signup, Logout, and Slot Booking.

### Backend Testing
- Verified all API routes (signup, login, booking, edit, delete) using **Postman** to ensure reliability.
- Implemented error handling for scenarios like duplicate user registration, invalid login credentials, or restricted booking actions (e.g., edits within 24 hours).

### Fixes Implemented
- Resolved **CORS issues** to facilitate smooth communication between the frontend and backend.
- Improved database queries for fetching reservations more efficiently.

---

## 9. User Interface and Interaction
- **Dashboard**:
  - Includes a **sidebar** for easy navigation (left-centered for accessibility).
  - Displays a **welcome message** at the top center for clarity.
- **Slot Booking Page**:
  - Features a user-friendly booking form with error handling.
  - Full-screen background provides a polished and immersive user experience.
- **Styling Enhancements**:
  - Buttons have hover animations for added interactivity.
  - Responsive design ensures compatibility with both desktop and mobile screens.

---

## Summary Table

| **Aspect**         | **Details** |
|--------------------|------------|
| **Backend**       | Built with Node.js using Express.js for routing and session-based authentication. |
| **Frontend**      | Developed using React.js with modular components and dynamic navigation. |
| **Database**      | PostgreSQL storing user and booking data securely, with optimized queries. |
| **Functionalities** | User authentication, booking system, filtered reservations, edit/delete bookings. |
| **Testing**       | Thorough testing of API routes and UI components, including error handling. |
| **UI Design**     | Responsive, user-friendly interface with a polished and professional look. |
