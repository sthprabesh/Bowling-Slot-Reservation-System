## Project phase 1 - Definition and planning

## Bowling Slot Reservation System
Bowling Slot Reservation System repository!
  This project provides a platform for users to create account, log in, and reserve their preferred time. The goal is to provide a seamless and intuitive user experience for bowling enthusiasts, fostering efficient booking processes for both casual players and regular visitors.

## 1. User Personas

### User 1: Weekend Bowler John
- **Age**: 28
- **Occupation**: Freelance Photographer
- **Location**: Helsinki, Finland
- **Goals**:
  - Quickly book bowling slots for weekend relaxation with friends.
  - View past bookings for reference when planning new visits.
- **Pain Points**:
  - Finds traditional booking methods slow and frustrating.
- **Behavior**:
  - Prefers mobile-friendly platform for on-the-go reservations.
  - Logs in during weekdays to plan for upcoming weekends.
- **Technology Proficiency**: Intermediate

### User 2: Regular Player Mike
- **Age**: 38
- **Occupation**: IT Specialist
- **Location**: Espoo, Finland
- **Goals**:
  - Efficiently book regular slots for practice sessions.
  - Manage and edit bookings when schedule changes.
- **Pain Points**:
  - Annoyed by overly complex booking process.
- **Behavior**:
  - Accesses the platform from both mobile and desktop devices.
  - Requires clear confirmation and update for his bookings.
- **Technology Proficiency**: Advanced

## 2. Use Cases and User Flows

### Use Case 1: User Creates an Account/Logs In
**Description**: The user creates a new account or logs into an existing one to manage reservations.  
**Preconditions**: The user accesses the login/signup page.  
**Steps**:
1. The user clicks "Sign Up" or "Login."
2. For new users: Enter fullname, phone-number, email, and password.
3. For existing users: Enter email/phone-number and password.
4. The system authenticates credentials and redirects the user to their dashboard.
**Postconditions**: The user gains access to their dashboard.

### Use Case 2: User Books a Slot
**Description**: The user reserves a slot for bowling.  
**Preconditions**: The user is logged in.
**Steps**:
1. The user navigates to the booking page.
2. Selects a date, time, and lane from available options.
3. Confirms the booking.
4. The system displays a booking confirmation message.
**Postconditions**: The reservation is saved to the user's account.

### Use Case 3: User Edits/Cancels Booking
**Description**: The user modifies or cancels an existing booking.  
**Preconditions**: The user is logged in and has an active reservation.
**Steps**:
1. The user accesses their booking details.
2. Clicks "Edit" or "Cancel."
3. Makes changes or confirms the cancellation.
4. The system saves the changes or removes the booking.
**Postconditions**: The updated booking is saved or deleted.

### Use Case 4: User Views Booking History

**Description**: The user reviews their past bookings.
**Preconditions**: The user is logged in.
**Steps**:
1. The user navigates to the "Booking History" section.
2. The system displays a chronological list of previous bookings.
**Postconditions**: The user accesses historical booking data.

### Use Case 5: User Logs Out

**Description**: The user securely logs out of their account.
**Preconditions**: The user is logged in.
**Steps**:
1. The user clicks the "Log Out" button.
2. The system ends the session and redirects to the login page.
**Postconditions**: The user is logged out.

## 3. UI Prototypes

The UI design will be user friendly, ensuring a seamless booking experience for both mobile and desktop platform. The basic idea of the UI is presented through the Figma prototype, but it may change during the development phase. 

Prototype includes following pages:
- **Login/Sign Up Page**: User authentication system
- **Slot Booking Page**: Users select a date, time, and lane for reservation.
- **Booking History Page**: Displays past bookings.

**Link to Figma**: https://www.figma.com/design/1Sv6YXXptFatg5bV6XNzzV/Bowling-Reservation-UI?node-id=0-1&p=f&t=k2NHXSg2vM4rOjq7-0

## 4. Information Architecture and Technical Design

### Information Architecture
The site basically includes these sections:
- **Dashboard**- Displays button to book for the slot
- **Login/Sign Up Page**- For new users to sign up and old users to login
- **Slot Booking Page**- Allows user to select preferable date, time, and lane for reservation
- **Booking History Page**- Allows user to see their past bookings

### Technical Design
- **Frontend**:
    - Built with **React**, using components for each section

- **Backend**
    - Built with **Node.js** and **Express.js** to handle user authentication, booking creation, and data retrieval.
    - **Postman** to test the API endpoints while building the backend

- **Database**
    - **MongoDB** for storing user accounts and booking details.


## 5. Project Management and User Testing

### Project Management

- **Tools Used**: GitHub (for version Control)

- **Timeline**
    - **Week 1**: Define project requirements, create prototype in Figma and set-up repositories
    - **Week 2**: Develop frontend components and set up Node.js backend
    - **Week 3**: Integrate frontend with REST API, implement user authentication
    - **Week 4**: Test with users

### User Testing 

- **Testing Plan**: Create detail plan for testing for each feature
- **Feedback Collection**: Use surveys or interviews to gather feedback on design and functionality.
- **Improvements**: Use feedback to refine the UI, fix bugs, and improve user experience.