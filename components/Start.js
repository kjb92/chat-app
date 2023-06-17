import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  //Get background image from local assets folder
  const imageBackground = require('../assets/background-image.png');
  //Get user icon from local assets folder
  const imageUserIcon = require('../assets/user-icon.svg');
    
  //React state: Username 
  const [username, setUsername] = useState("");
  //React state: Username 
  const [backgroundColor, setbackgroundColor] = useState("");

  //Define an array of colors
  const colorHexCodes = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  //Function when "Start Chatting" is clicked
  const handleStartChatting = () => {
    navigation.navigate('Chat', { username: username, backgroundColor: backgroundColor });
  };

  return (
   <View style={styles.flex}>
    {/* Image: Background Image */}
     <ImageBackground style={[styles.flex, styles.padd20]} source={imageBackground}>
      {/* Container: Top-Half of the Screen */}   
       <View style={[styles.flex, styles.alignCenter, styles.box1]}>
        {/* Text: App Title */} 
         <Text style={styles.appTitle}>App Title</Text>
       </View>
      {/* Container: Bottom-Half of the Screen */}   
       <View style={[styles.flex, styles.box2]}>
         <View style={[styles.flex, styles.col, styles.spreadVertically, styles.padd20]}>
          {/* Input: Enter your name */}
          <View style={[styles.row, styles.textInputOuter]}>
             <TextInput
              style={[styles.flex, styles.text, styles.textInputInner]}
              value={username}
              onChangeText={setUsername}
              placeholder='Your Name'
             >
             </TextInput>
           </View>
          {/* Select: Choose Background Color */}
           <View>
            <Text 
              style={[styles.text,
              { marginBottom: 10 },
              ]}>Choose Background Color:</Text>
            <View style={[styles.row]}>
              {colorHexCodes.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setbackgroundColor(color);
                  }}
                  style={[
                    styles.circle,
                    styles.alignCenter,
                    styles.justifyCenter,
                    { marginHorizontal: 5 },
                    backgroundColor === color && styles.circleSelected,
                  ]}
                >
                  <View
                    style={[
                      { backgroundColor: color },
                      { borderRadius: 50 },
                      { borderColor: '#FFFFFF' },
                      { borderWidth: 3 },
                      { width: 45 },
                      { height: 45 },
                  ]}>

                  </View>
                </TouchableOpacity>
              ))}
            </View>
           </View>
          {/* Button: Start Chatting */}
           <View>
             <TouchableOpacity style={[styles.button, styles.alignCenter, styles.justifyCenter]} onPress={handleStartChatting}>
                <Text style={[styles.buttonText]}>Start Chatting</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     </ImageBackground>
   </View>
 );
};

const styles = StyleSheet.create({ 
  flex: {
   flex: 1,
 },
 row: {
  flexDirection: 'row',
 },
 col: {
  flexDirection: 'column',
 },
 alignCenter: {
  alignItems: 'center',
 },
 justifyCenter: {
  justifyContent: 'center',
 },
 spreadVertically: {
  justifyContent: 'space-between',
 },
 spreadHorizontally: {
  alignItems: 'space-between',
 },
 padd20: {
  padding: 20,
 },
 box1: {
 },
 box2: {
  backgroundColor: '#FFFFFF',
 },
 appTitle: {
  fontSize: 45,
  fontWeight: '600',
  color: '#FFFFFF',
 },
 text: {
  fontSize: 16,
  fontWeight: '300',
  color: '#757083',
 },
 textInputOuter: {
  borderWidth: 1,
  borderRadius: 5,
  height: 50,
  padding: 15,
 },
 textInputInner: {
  opacity: 0.5,
 },
 button: {
  backgroundColor: '#757083',
  borderRadius: 5,
  padding: 10,
  height: 50,
 },
 buttonText: {
  fontSize: 16, 
  fontWeight: '600', 
  color: '#FFFFFF',
 },
 circle: {
  height: 50,
  width: 50,
  borderRadius: 50,
 },
 circleSelected: {
  borderWidth: 2,
  borderColor: '#000000',
 },
});

export default Start;