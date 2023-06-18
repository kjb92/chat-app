import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  //Get username and background color form route parameters
  const { username, backgroundColor } = route.params;
  //Messages state
  const [messages, setMessages] = useState([]);
   //Send function
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  };
  //Chat bubble customization
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#3a86ff'
        },
        left: {
          backgroundColor: '#fff'
        }
      }}
    />
  };

  //Set navigation title to username
  useEffect(() => {
    navigation.setOptions({ title: username });
  }, []);

  //Pull in messages; sample messages for now
  useEffect(()=> {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  //Render chat UI
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {/* Keyboard-Fix for android */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
    </View>
 );
}

//StyleSheet for Chat.js
const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;