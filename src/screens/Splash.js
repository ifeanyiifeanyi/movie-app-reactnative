import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { black } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import NetInfo from '@react-native-community/netinfo';

const Splash = () => {

  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(true);


  useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      console.log("calling network error");
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {

      if (isConnected) {
        navigation.navigate('Login');
      } else {
        Alert.alert("Connection Failed!",[
          {
            text: "Try Again",
            onPress: () => DevSettings.reload(),
            style: "cancel"
          }
        ]);
      }
    }, 2000);
  }, [])

  return (
    <View style={myStyle.container}>
      <Image source={require('../img/gif/loading.gif')} style={{width:200,height:200}} />
    </View>
  )
}

export default Splash
const myStyle = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: black,
    justifyContent: 'center',
    alignItems: 'center',
  }
})