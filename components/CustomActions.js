import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
//IMport ActionSheet from @expo
import { useActionSheet } from "@expo/react-native-action-sheet";
//import ImagePicker
import * as ImagePicker from 'expo-image-picker';
//Import Location from @expo-location
import * as Location from 'expo-location';

const CustomActions = ({
  wrapperStyle, 
  iconTextStyle,
  onSend,
  userID
}) => {
  //Call actionSheet
  const actionSheet = useActionSheet();
  //Image state
  const [image, setImage] = useState(null);
  //Location state
  const [location, setLocation] = useState(null);
  
  //Define pickImage
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
       let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null)
    }
  };
  //Define takeImage
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null)
    }
  };
  //Define getLocation
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
          default:
        }
      },
    );
  };

 //Render CustomActions UI
 return (
  <TouchableOpacity 
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
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;