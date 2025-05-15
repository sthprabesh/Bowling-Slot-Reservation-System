# Phase 4 – Project Presentation


## 🎯 Bowling Slot Reservation System


---

## 📝 Project overview

The Bowling Slot Reservation System is a web-based application designed to provide a seamless way for users to book bowling lanes online. The platform allows users to sign up, log in, reserve lanes, view booking history, and manage their reservations.

**Target Users**
- Bowling enthusiasts looking for an easy way to book lanes.

- Casual players who want a hassle-free way to ensure lane availability before arrival.

**Context**
- The project aims to simplify bowling lane reservations, replacing inefficient manual booking methods.

- With the frontend deployed via Azure Static Web Apps, users can access the platform online without setting up locally.

- The backend is manually run by users and is not hosted on Azure.

---

## 📌 Use case summary



| Use Case | Implemented (Yes/No) | Demonstration / Notes |
|----------|----------------------|------------------------|
|User creates an account or logs in to existing account  | Yes | Implemented using secure session handling. Demo at 2:05 in the video. |
| User books a slot | Yes | User reserves a slot by choosing date, time, number of lanes and duration. Demo at 3:40 in the video |
|User edits or cancels the booking  | Yes | User can modify and cancel bookings before 24 hours, otherwise subject to invoice. Demo at 4:40 in the video. |
|User views booking history  | Yes | Users can fetch past reservations. Demo at 4:20 in the video. |
|User logs out  | Yes | User securely logs out of his account. Demo at 6:55 in the video. |
|Admin deletes reservation  | No | Not prioritized but considered for future work. |
|Azure Frontend Deployment  | Yes | Frontend is deployed via Azure Static Web Apps, making it accessible online. Azure URL: https://zealous-coast-040c6d410.6.azurestaticapps.net/ |
|Backend Integration with Azure  | No | Backend remains local and is manually executed. |


---

## ✍️ Technical implementation



### Technologies Used
**Frontend**: React.js, TypeScript

**Backend**: Node.js, Express.js

**Database**: PostgreSQL (local setup, not cloud-hosted)

**Authentication**: LocalStorage session handling

**Hosting**: Azure Static Web Apps (only for frontend)

**Styling**: CSS

**Testing**: Postman, Playwright (E2E) & Vitest (Unit testing)

### Key Features & Implementation
**1.User Authentication**

- Users can register, log in, and maintain a session.

- Credentials are validated securely by the backend.

**2. Reservation System**

- Users book lanes with date, time, lanes, and duration selection.

- Bookings are stored in a local PostgreSQL database.

**3. Booking Management**

- Users can view past and upcoming reservations.

- Edits & cancellations are restricted within 24 hours of the scheduled time.

**4. Frontend Hosting via Azure**

- The React frontend is deployed using Azure Static Web Apps.

- Allows remote access to the application.

**5. Backend Execution**

- Backend runs manually using node server.js.

---

## 🚂 Development process

### Phase 1 - Planning
- Defined key use cases for booking, editing, and cancellation.

- Designed the database schema for users and reservations.

### Phase 2 - Initial Development
- Built the authentication system and login logic.

- Developed API endpoints for creating, retrieving, and managing reservations.

### Phase 3 - Feature Enhancements & Testing
- Implemented reservation filtering logic.

- Added restrictions for editing and canceling bookings.

- Conducted unit and E2E testing using Vitest and Playwright.

### Phase 4 - Deployment
- Azure Static Web Apps integration for frontend hosting.

- Backend remains locally executed instead of being hosted on Azure.

---

## ☀️ Reflection and future work

### What Worked Well
✔ Frontend hosting via Azure enabled easy access.
✔ Reservation management system implemented successfully. 
✔ Playwright E2E testing validated core workflows effectively.

### Challenges Faced
⚠  Azure App Service backend integration was skipped due to preference for manual execution.
⚠  Database hosting was kept local, limiting cloud accessibility. 
⚠  Vitest and Playwright conflicts required debugging.

### Future Improvements
🚀 Fully deploy backend on Azure App Service for remote access. 
🚀 Migrate PostgreSQL to a cloud-hosted database. 
🚀 Admin panel to manage and delete reservations.


---

## 📊 Work Hours Log


| Date  | Used hours | Subject(s) |  outcome |
| :---  |     :---:      |     :---:      |     :---:      |
| 25.03.2025 | 2 | Lecture- Introduction to Project  | Details on Project requirements |
| 31.03.2025 | 2 | Project Workshop 1  | Phase 1 discussion  |
| 02.04.2025 | 5 | Planning the phase 1  | Project topic discussion and user personas defined |
| 03.04.2025 | 5 | Project phase 1 - Definition and planning  | Use cases developed and figma prototype created. Other features will be added along the way.  |
| 04.04.2025 | 5 | Project phase 1 - Definition and planning  | Planned information architecture, technical design, and testing principles  |
| 05.04.2025 | 2 | Project phase 1 - Definition and planning  | Completed two detailed personas.  |
| 06.04.2025 | 3 | Project phase 1 - Definition and planning  | Finalized five use cases with clear descriptions and user flows.  |
| 07.04.2025 | 3 | Project phase 1 - Definition and planning  | Continued refining UI prototypes and technical design in figma.  |
| 08.04.2025 | 3 | Project phase 1 - Definition and planning  | Completed Phase 1 deliverables. Ready to proceed to the next phase of the project.  |
| 10.04.2025 | 5 | Project phase 2 - Basic Framework and Core Functionalities  | Started working for the Frontend and installed necessary dependencies.  |
| 11.04.2025 | 6 | Backend setup and API Design  | Created Express backend(server.js), Integrated PostgreSQL(db.js), designed API routes(booking.js, logout.js) and started testing with Postman.   |
| 12.04.2025 | 4 | Navigation and UI Design  | Applied styling(App.css, SlotBooking.css), designed navigation components.   |
| 14.04.2025 | 4 | Authentication  | Developed login and signup(auth.js) for authentication and bcrypt.js for password security.  |
| 15.04.2025 | 6 | Backend setup and API Design  | Extended API functionality for bookings, reservations, and testing with Postman. Initially, the edit and delete functionalities for reservations weren't working, so we resolved these issues later on.  |
| 16.04.2025 | 6 | Frontend Development  | Worked on integrating the dashboard and booking form components.  |
| 18.04.2025 | 5 | Frontend Testing  | Tested navigation and form validations, mocked API calls for key functionalities.  |
| 19.04.2025 | 7 | Backend Refinements  | Implemented advanced booking and cancellation logic, optimized database queries. Fixed issues with edit and delete reservations functionality.  |
| 20.04.2025 | 6 | Error Handling and Testing  | Enhanced backend error handling and fixed CORS issues for seamless communication.  |
| 21.04.2025 | 5 | UI Enhancements  | Improved design responsiveness and added CSS animations for buttons.  |
| 22.04.2025 | 5 | Deployment | Successfully deployed the project to GitHub for version control and collaboration.  |
| 09.05.2025 | 6 | Deployment | Successfully deployed frontend in cloud using Azure Static Web Apps |
| 13.05.2025 | 5 | Documentation | Phase 3 and Phase 4 documentation in process  |
| 15.05.2025 | 5 | Presentation | Video presentation and final work completed  |
| Total | 90+ hours |  |

## 🪢 Presentation link

Link to the video presentation: https://1drv.ms/v/c/f600ac6619c5836d/EXWc3_RswS1It6b4m0Dx0L0B2M5O7PTPL4xpFlKFpOBmew?e=Q5KcAM
