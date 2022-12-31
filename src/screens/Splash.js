import { View, Text, StyleSheet, Image } from 'react-native'
import { useEffect } from 'react'
import { black } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SelectUser')
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