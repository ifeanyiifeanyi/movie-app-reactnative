import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { black } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import NetInfo from '@react-native-community/netinfo';

const Splash = () => {

  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     // if !userId navigate to login page
//     const checkAsyncStorage = async () => {
//         const value = await AsyncStorage.getItem('userid');
//         if (!value || value === 5) {
//           navigation.navigate('Login');
//         }
//       }
//       checkAsyncStorage();
// }, []);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      console.log("calling network error",unsubscribe());
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('');

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
    }, 4000);
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