import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { black, white } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SelectUser = ({ route, navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const { username, otherParam } = route.params;

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    try {
       AsyncStorage.getItem('username')
       .then(value => {
        if(value != null){
          setName(value);
        }
       })
       AsyncStorage.getItem('email')
       .then(value => {
        if(value != null){
          setEmail(value);
        }
       })
      
    } catch (error) {
      
    }
  }




  return (
    <View style={myStyle.container}>
      <View style={myStyle.header}>
        <Text style={myStyle.title}>Welcome <Text>{name}</Text> 👀</Text>

      </View>
      <View style={myStyle.profiles}>
        <TouchableOpacity style={myStyle.profileCard} onPress={() => {
          navigation.navigate("HomeScreen")
        }}>
          <Image source={require('../img/logo/1.jpg')} style={myStyle.profileImage} />
          <Text style={myStyle.profileText}>{name}</Text>
          <Text style={myStyle.profileTextEmail}>{email}</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={myStyle.addProfileCard} onPress={() => { navigation.navigate("HomeScreen") }}>
        <Text style={myStyle.addProfileTextVideo}>Latest Videos</Text>
      </TouchableOpacity>

    </View>
  )
}

export default SelectUser

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },
  header: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 50,
    height: 60,
  },
  title: {
    color: white,
    fontSize: 20,
    marginTop: 30,
    marginLeft: 30,
  },
  profiles: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  profileText: {
    color: 'gold',
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  profileTextEmail: {
    color: 'teal',
    fontSize: 10,
    marginTop: 15,
    textAlign: 'center',
  },
  profileCard: {
    width: 120,
    height: 120,
    marginLeft: 30,
    marginTop: 50,
    borderRadius: 6,
    justifyContent: 'center',
  },
  addProfileCard: {
    width: 120,
    height: 120,
    marginTop: 50,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: 'darkGray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  addProfileImage: {
    width: '60%',
    height: '60%',
    borderRadius: 6,
    tintColor: 'white'
  },
  addProfileText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 18,

  },
  addProfileTextVideo: {
    color: 'white',
    justifyContent: 'center',
    alignItems:'center',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 12,
    backgroundColor: 'teal',
    padding: 10,

  }
})