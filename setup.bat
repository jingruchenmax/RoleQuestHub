@echo off
echo Setting up RoleQuestHub...

:: Navigate to script directory
cd /d %~dp0

:: Create the client folder
mkdir client
cd client

:: Initialize a React project with Vite
echo Initializing React project with Vite...
call yarn create vite . --template react

:: Install dependencies
echo Installing dependencies...
call yarn install
call yarn add firebase tailwindcss postcss autoprefixer react-router-dom

:: Setup Tailwind CSS
npx tailwindcss init -p

:: Create src folder structure
mkdir src
cd src
mkdir components pages context firebase

:: Create empty JavaScript files
cd components
(
echo // Character Card Component
) > CharacterCard.js

(
echo // Documents Component
) > Documents.js

(
echo // Messages Component
) > Messages.js

(
echo // Admin Dashboard Component
) > AdminDashboard.js

(
echo // Grant Privileges Component
) > GrantPrivileges.js

cd ..

cd context
(
echo // Authentication Context
) > AuthContext.js
cd ..

cd pages
(
echo // Login Page
) > Login.js

(
echo // Home Page
) > Home.js

(
echo // Admin Page
) > Admin.js
cd ..

cd firebase
(
echo // Firebase Configuration
) > firebaseConfig.js
cd ..

:: Create main files
(
echo // Main App Component
) > App.js

(
echo // Main entry point
) > main.jsx

cd ..

echo RoleQuestHub project setup completed successfully!
pause
