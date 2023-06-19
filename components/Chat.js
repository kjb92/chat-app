import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
//Import get data functions from Firestore
import { collection, doc, getDocs, addDoc, setDoc, Timestamp, onSnapshot } from "firebase/firestore";
import { async } from '@firebase/util';

const Chat = ({ route, navigation, db }) => {
  //Get username and background color form route parameters
  const { username, backgroundColor } = route.params;
  //Messages state
  const [messages, setMessages] = useState([]);
  
  //Send function
  const onSend = (newMessages) => {
    //TBD: addDoc in Forestore
    addMessage(newMessages[0]);
    //Update messages
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
    newMessages.push({ 
      _id: docObject.id,
      text: docObject.text,
      createdAt: new Date(docObject.createdAt), 
      ... docObject.data() 
    })
    });
    setMessages(newMessages);
  };

  //ASYNC: Add message
  const addMessage = async (newMessage) => {
    const newMessageRef = await addDoc(collection(db, "messages"), newMessage);
    if (newMessageRef.id) {
      //Delete after test phase for better UX
      Alert.alert(`New message ${newMessage.text} added`);
    } else {
      Alert.alert(`Unable to add message. Please try later`);
    }
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
};

//StyleSheet for Chat.js
const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;