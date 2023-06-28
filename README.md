# chat app

A chat app for mobile devices built with React Native. The app will
provide users with a chat interface and options to share images and their
location.

# Table of Contents

1. [Key Features](#key-features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Project Background](#project-background)
5. [Dependencies](#dependencies)

# Key Features
- A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline.

# Technologies used

- React Native: A JavaScript framework for writing real, natively rendering mobile applications.
- Expo: A framework and a platform for universal React applications.
- Firebase: A Backend-as-a-Service (BaaS) app development platform that provides hosted backend services such as a realtime database, cloud storage, authentication, crash reporting, machine learning, remote configuration, and hosting for your static files.
- Gifted Chat: A complete chat UI solution for React Native applications.
- Async Storage: An asynchronous, unencrypted, persistent, key-value storage system for React Native.

# Getting started

Follow instructions to get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js
- Expo CLI
- A Google Firebase account

## Installation

1. Clone the repo
   ```
   git clone https://github.com/kjb92/chat-app.git
   ```
2. Install packages
   ```
   npm install
   ```
3. Install Expo CLI
   ```
   npm install -g expo-cli
   ```
4. Create a new Firebase project in your [Firebase console](https://console.firebase.google.com/). 

5. In the Firebase console, navigate to "Project settings" and then to the "General" tab. Here, you'll find your Firebase project's configuration object in the "Your apps" section. It'll look something like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "my-app.firebaseapp.com",
     databaseURL: "https://my-app.firebaseio.com",
     projectId: "my-app",
     storageBucket: "my-app.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:1234:web:ee873bd1234b2a1f4ee234",
     measurementId: "G-12345"
   };
   ```
   
6. Copy this configuration object to your clipboard.

7. In your project, navigate to the `Chat.js` file and replace the existing `firebaseConfig` object with the one you just copied.

8. In the Firebase console, navigate to the "Cloud Firestore" section and create a new database. Start in test mode.

9. Start the local server to run the app
   ```
   npx expo start
   ```

10. You should then be able to test the app on either your physical device in combination with the Expo App or by using an emulator such as Android Studio or iOS Simulator running on your local machine

# Project background

## Technical requirements
This project has been developed based on the following requirements: 

- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.

## User stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.



# Dependencies
```
"dependencies": {
  "@react-navigation/native": "^6.1.6",
  "@react-navigation/native-stack": "^6.9.12",
  "expo": "~48.0.18",
  "expo-status-bar": "~1.4.4",
  "firebase": "^9.13.0",
  "react": "18.2.0",
  "react-native": "0.71.8",
  "react-native-gifted-chat": "^2.4.0",
  "react-native-safe-area-context": "4.5.0",
  "react-native-screens": "~3.20.0",
  "react-native-svg-uri": "^1.2.3",
  "@react-native-async-storage/async-storage": "1.17.11",
  "@react-native-community/netinfo": "9.3.7",
  "expo-image-picker": "~14.1.1",
  "expo-location": "~15.1.1",
  "react-native-maps": "1.3.2"
},
"devDependencies": {
  "@babel/core": "^7.20.0"
}
```