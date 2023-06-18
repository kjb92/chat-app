import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
//Import get data functions from Firestore
import { collection, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';

const Chat = ({ route, navigation, db }) => {
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

  //ASYNC: Fetch messages function; called in useEffect below
  const fetchMessages = async () => {
    const messagesDocuments = await getDocs(collection(db, "messages"));
    let newMessages = [];
    messagesDocuments.forEach(docObject => {
    newMessages.push({ id: docObject.id, ... docObject.data() })
    });
    setMessages(newMessages);
  };

  //Set navigation title to username
  useEffect(() => {
    navigation.setOptions({ title: username });
  }, []);

  //Get messages from Firestore
  useEffect(()=> {
    fetchMessages();
  }, [JSON.stringify(messages)]);//compare string representations of messages array

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