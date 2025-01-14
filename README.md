# Lendsqr Frontend Engineer Assessment

This project is a solution to the Lendsqr Frontend Engineer Assessment V2. It involves building a React application using TypeScript and SCSS based on the Figma design provided by Lendsqr.

## Project Overview

This application implements the following pages:
- **Login**
- **Dashboard**
- **User Page**
- **User Details Page**

### Key Features:
- Data is fetched from a mock API with 500 records.
- User details are stored and retrieved using **localStorage**  on the User Details page.
- The web app is **mobile responsive** to ensure it works across devices.
- Visual fidelity is maintained to match the **Figma design** as closely as possible.
- **Unit testing** has been implemented for both positive and negative scenarios.
- **Error handling** is applied throughout the application.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/lendsqr-fe-test.git
   cd lendsqr-fe-test

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Tech Stack
1. React: For building the UI components.
2. TypeScript: For type safety.
3. SCSS: For styling the components.
4. Mock API: Mock data generated using tools like Mocky.io or JSON Generator.
5. React Router: For page navigation.
6. localStorage For storing user details.

## Features & Implementation Details
1. Login Page
User can log in using provided credentials (mocked data).
Redirects to the dashboard page upon successful login.
2. Dashboard Page
Displays a list of users fetched from the mock API.
Pagination and sorting options are available to manage the records.
3. User Page
Displays details of the selected user.
Allows editing and viewing more information.
4. User Details Page
Stores and retrieves user details using localStorage or IndexedDB.
Mobile-responsive design with a clean layout.
