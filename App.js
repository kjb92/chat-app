import { StyleSheet } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import Cloud Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // This web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAvby18AjPtHhcQ1muO7PNCNa3uxr5GuHE",
    authDomain: "chatapp-70cc1.firebaseapp.com",
    projectId: "chatapp-70cc1",
    storageBucket: "chatapp-70cc1.appspot.com",
    messagingSenderId: "302452061868",
    appId: "1:302452061868:web:7b6f2c0bae271f9d675109"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen 
          name="Start"
          component={Start}
        />        
        <Stack.Screen 
          name="Chat"
        >
          {/* Passing the database on to the chats screen */}
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
