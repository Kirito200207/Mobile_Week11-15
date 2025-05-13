# Food Journal Tracker

A mobile application for tracking daily food intake with photo logging, categorization, and user authentication. Built with React Native and Expo.

## Overview

Food Journal Tracker helps users log meals with photos, descriptions, and categories (e.g., Breakfast, Lunch). It supports user accounts for data persistence and includes features like search, edit/delete entries, and password management.



## Key Features

1. User Authentication

- Register/login with email/password (minimum 6 characters).
- Secure session management via AsyncStorage .

2. Meal Logging

- Add entries with photos (camera or gallery).
- Compress images to optimize storage.
- Input meal descriptions and select categories (Breakfast/Lunch/Dinner/Snack).

3.Entry Management

- Edit/delete existing entries.
- Swipe-to-delete or multi-select delete.
- Search entries by description or category.

4.Categorization & Filtering

- Filter entries by meal type using a dropdown picker.

5. Settings & Security

- Change password with current password verification.
- Logout functionality to clear session.
## Prerequisites

- Node.js v18.18.0 (use nvm to manage versions).
- Expo CLI: npm install -g expo-cli .
- Mobile device or emulator (Android/iOS).

## Installation & Setup

1. Clone the repository :

```bash
git clone https://github.com/your-username/Mobile_Week11-15.git  
cd Mobile_Week11-15  
```


2. Install dependencies :

```bash
npm install  
```

3. Run the app :

```bash
npm start  
```

## Project Structure

Mobile_Week11-15/  
├── components/          # Reusable UI and logic components  
│   ├── auth/            # Authentication forms (AuthScreen.js)  
│   ├── camera/          # Camera component (CameraComponent.js)  
│   ├── database/        # SQLite setup and queries (database.js)  
│   └── journal/         # Journal UI components (JournalForm.js, JournalList.js, JournalEntry.js)  
├── screens/             # Screen-level components  
│   ├── auth/            # Login/registration screens (LoginScreen.js)  
│   ├── journal/         # Add/edit journal screens (AddJournal.js, EditJournal.js, CategoryView.js)  
│   ├── settings/        # Settings and password change screens (SettingsScreen.js, ChangePasswordScreen.js)  
│   └── homeScreen.js    # Home screen with search and entry list  
├── App.js               # App entry with navigation setup  
├── app.json             # Expo configuration (SDK, permissions, icons)  
├── package.json         # Dependencies and scripts  
├── index.js             # Expo root component registration  
└── .gitignore           # Files/directories to ignore in Git  
<<<<<<< HEAD

## Debug

1. 
Error identification process: After I had cloned the the provided repository and executed 'npm install' within the project directory, I encountered a problem when I launched the application.

Solution applied: It says that the Project is incompatible with this version of Expo Go. So I upgraded this project to SDK53 and it was solved.

2.
Error identification process: In the Add Journal interface, the Take Photo button cannot trigger the phone camera.

Solution applied: In the return section of AddJournal.js, there is a lack of logic to control the display of the CameraComponent using the showCamera state. So, I added conditional rendering of the camera component in the return section of AddJournal.js and handled the callback logic after taking a photo.


3.
Error identification process: After I finished the code and tried to launched the application, it encountered another problem.

Solution applied: To fix it, I use a tool called ’nvm’ to change the version of Node.js to v18.18.0. Also, there were some other versions that are not compatible. After fixed them, the application could launch now.


These improvements collectively resolved critical compatibility and functional issues, ensuring the application runs smoothly with the updated environment and corrected camera interaction logic.

4.
Error identification process: The execAsync method was found to be undefined in the database initialization code.

Solution applied: Updated the components/database/database.js file to use the new getAllAsync and runAsync APIs from expo-sqlite .

5.
Error identification process: Attempting to register with an existing email address triggered a unique constraint violation.

Solution applied: Improved error handling in authScreen.js to identify the specific constraint error and display a user-friendly alert message.

6.
Error identification process: Attempting to register with an existing email address triggered a unique constraint violation.

Solution applied: Improved error handling in authScreen.js to identify the specific constraint error and display a user-friendly alert message.

7.
Error identification process: ImagePicker.MediaTypeOptions was deprecated in expo-image-picker.

Solution applied: Updated to use the mediaTypes: ['images'] option instead.

8.
Error identification process: The new expo-sqlite version altered the structure of insert results, making it impossible to retrieve insertId correctly.

Solution applied: Added checks for both insertId and lastInsertRowId to ensure navigation uses the correct user ID.

