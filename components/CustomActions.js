import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
//IMport ActionSheet from @expo
import { useActionSheet } from "@expo/react-native-action-sheet";
//import ImagePicker
import * as ImagePicker from 'expo-image-picker';
//Import Location from @expo-location
import * as Location from 'expo-location';
//Import Ref for creating an address for file locations
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const CustomActions = ({
  wrapperStyle, 
  iconTextStyle,
  onSend,
  storage,
  userID
}) => {
  //Call actionSheet
  const actionSheet = useActionSheet();
  //Image state
  const [image, setImage] = useState(null);
  //Location state
  const [location, setLocation] = useState(null);
  //Generate image reference function
  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };
  //Upload & Send Image function
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend({ image: imageURL })
    });
  };
  
  //pickImage
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
       let result = await ImagePicker.launchImageLibraryAsync();

       if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
       else Alert.alert("Permissions haven't been granted.");
    }
  };
  //takeImage
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };
  //getLocation
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };
  
  //Define onActionPress function
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            pickImage();
            return;
          case 1:
            console.log('user wants to take a photo');
            takePhoto();
            return;
          case 2:
            console.log('user wants to get their location');
            getLocation();
            return; 
          default:
        }
      },
    );
  };

 //Render CustomActions UI
 return (
  <TouchableOpacity 
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Button to open custom chat actions"
  accessibilityHint="Choose from a list of custom actions such as: Choose a photo, take a photo or send location"  
  style={[styles.container]}
    onPress={onActionPress}
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
  </TouchableOpacity>
  );
};

//StyleSheet for CustomActions.js
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;