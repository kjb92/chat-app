import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { username, backgroundColor } = route.params;
 
  useEffect(() => {
    navigation.setOptions({ title: username });
  }, []);

  return (
   <View 
    style={[
      styles.container, 
      {backgroundColor: backgroundColor},
    ]}
    >
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;