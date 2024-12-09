(a) How to Run the Project:
To run the project, follow these steps:

Setup Environment:

Ensure you have Node.js and npm (Node Package Manager) installed on your system.
If you don’t have Node.js, you can download and install it from the official Node.js website.
Clone the Project:

Clone the project repository from GitHub:
bash
Copy code
git clone <repository-url>
Install Dependencies:

Navigate to the project directory:
bash
Copy code
cd <project-directory>
Install the necessary dependencies using npm:
bash
Copy code
npm install
Start the Development Server:

Run the development server:
bash
Copy code
npm start
This will start the application at http://localhost:3000.
Access the Application:

Open a web browser and navigate to http://localhost:3000.
You should see the login page where you can enter email, password, and optionally check the 'Remember Me' checkbox to stay logged in.
Testing:

Use different test emails (with and without 'remember me' checked) to test the login functionality.
You can check the local storage (localStorage.getItem('rememberMe')) to verify if the login state is correctly being stored.
(b) Design Choices Made:
Gradient Background:

Chosen to create an attractive visual appearance.
Enhances the aesthetics by using a smooth color transition from blue to pink.
Helps in setting the mood of the application, which is a login page.
Form Structure:

Used a simple form layout with input fields for email, password, and a checkbox for 'Remember Me'.
Each input field has placeholder text and validation error messages are displayed below them.
The form layout is responsive, adjusts well on smaller screens (e.g., mobile devices).
A Formik form library is used to manage form state and validation.
Error Handling:

Used the ErrorMessage component from Formik to display validation errors directly below the input fields.
Integrated react-toastify for displaying success and error messages when logging in.
Toast messages are visually distinct and provide feedback to the user.
Local Storage:

Implemented localStorage to persist user data (email and password) if the 'Remember Me' checkbox is checked.
This enhances the user experience by reducing the need to re-enter credentials on subsequent visits.
Responsive Design:

The form adjusts to various screen sizes using Tailwind CSS utilities (md:flex-row, max-w-lg, etc.).
Ensures a consistent user experience across devices.
(c) Assumptions or Limitations:
Assumptions:

Local Storage is Available: It is assumed that localStorage is available and will not be cleared by browser privacy settings.
No Backend/API: The login functionality relies solely on local storage without an integrated backend API, meaning it does not support features like session management, password recovery, or multi-factor authentication.
Email Existence: Assumes that only registered users with valid emails will be allowed to log in.
Limitations:

No Backend Validation: The application does not validate the login credentials against a real backend database, which could lead to security issues (e.g., weak passwords, brute-force attacks).
Password Security: Passwords are stored in plain text in local storage, which is not secure and should not be used in production applications.
Lack of Advanced Features: The application does not include features such as password recovery, user account management, or logout functionality.
Cross-browser Consistency: The design may not look identical across all browsers due to CSS inconsistencies.
Mobile Optimization: The responsive design is a good start but might not handle all edge cases on mobile devices perfectly without further testing and adjustments.
Accessibility: The design may not be fully accessible for users with disabilities, requiring further improvements.
