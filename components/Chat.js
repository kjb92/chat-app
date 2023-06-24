import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
//Import get data functions from Firestore
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
//import local storage package - async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
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
  let unsubMessages; //declare unsubMessages outside of useEffect scope
  useEffect(()=> {
    //IF: device IS connected to the internet -> fetch messages from Firestore
    if (isConnected === true) {  
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      
      //define the query
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      //define the snapshop function
      unsubMessages = onSnapshot(q, (querySnapshot) => {
        let newMessages = [];
        querySnapshot.forEach(doc => {
          newMessages.push({ 
            _id: doc.id,
            ... doc.data(), 
            createdAt: new Date(doc.data().createdAt.toMillis()), 
          })
        });
        //cache data
        cacheMessages(newMessages);
        //update messages state
        setMessages(newMessages);
      });
    } else loadCachedMessages(); //IF device IS NOT connected to the internet -> load cached messages

    //Code clean-up and protection against call failure
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);//dependency on conenction status

  //Cache messages
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      } 
  };

  //Load cached messages
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cacheMessages));
  };

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