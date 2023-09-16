import { View, Text, StyleSheet, Image, Alert, LogBox, DevSettings } from 'react-native'
import { useEffect, useState } from 'react'
import { black } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splash = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(true);


  // useEffect(() => {
  //   NetInfo.addEventListener(state => {
  //     console.log('Connection type: ', state.type);
  //     console.log('Is connected? ', state.isConnected);
  //     console.log('Is internet reachable? ', state.isInternetReachable);
  //   });
  //   NetInfo.fetch().then(state => {
  //     setIsConnected(state.isConnected);
  //   });
  //   return () => {
  //     console.log("calling network error");
  //   };
    
  // }, []);

  useEffect(() => {
    // setTimeout(() => {
    //   if (isConnected) {
    //     handleGetToken();
    //   } else {
    //     Alert.alert("Connection Failed!", [
    //       {
    //         text: "Try Again",
    //         onPress: () => DevSettings.reload(),
    //         style: "cancel"
    //       }
    //     ]);
    //   }
    // }, 2000);
    handleGetToken();
  }, [])
  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('name');
    if (!dataToken) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('SelectUser');
    }
  }

  return (
    <View style={myStyle.container}>
      <Image source={require('../../assets/1adaptive-icon.png')} style={{ width: 200, height: 200 }} />
    </View>
  )
}

export default Splash
const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    justifyContent: 'center',
    alignItems: 'center',
  }
})