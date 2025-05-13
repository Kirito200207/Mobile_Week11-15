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
