import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
//Import get data functions from Firestore
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  //Get username and background color form route parameters
  const { username, backgroundColor, userID } = route.params;
  //Messages state
  const [messages, setMessages] = useState([]);
  
  //Send function
  const onSend = (newMessages) => {
    //TBD: addDoc in Forestore
    addDoc(collection(db, "messages"), newMessages[0])
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

  //Set navigation title to username
  useEffect(() => {
    navigation.setOptions({ title: username });
  }, []);

  //Get messages from Firestore
  useEffect(()=> {
    //define the query
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    //define the snapshop function
    const unsubMessages = onSnapshot(q, (querySnapshot) => {
      let newMessages = [];
      querySnapshot.forEach(doc => {
        newMessages.push({ 
          _id: doc.id,
          text: doc.text,
          createdAt: new Date(doc.createdAt), 
          ... doc.data() 
        })
      });
      setMessages(newMessages);
    });

    //Clean up code and protection against call failure
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  //Render chat UI
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: username
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