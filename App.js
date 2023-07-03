// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import Cloud Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
//import NetInfo to get information about connection type and connection quality
import { useNetInfo }from '@react-native-community/netinfo';
//import useEffect
import { useEffect } from 'react';
//import Alert
import { Alert } from 'react-native';
//import Firestore Storage for Image Files
import { getStorage } from "firebase/storage";
//import Constants for env-variables
import Constants from 'expo-constants';

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // This web app's Firebase configuration
  const firebaseConfig = JSON.parse(Constants.manifest.extra.FIREBASE_CONFIG);

  //test
  console.log(JSON.parse(Constants.manifest.extra.FIREBASE_CONFIG));

  //define state that represents the network connectivity status
  const connectionStatus = useNetInfo();
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Firestore Storage
  const storage = getStorage(app);

  //display alert if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db} 
            storage={storage}
            {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
