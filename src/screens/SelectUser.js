import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react'
import { black, white } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SelectUser = ({navigation }) => {

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding:10, backgroundColor: '#000', width:'100%', height: 200 }}>
          <TouchableOpacity>
            <Image source={require('../img/logo/loginlogo.png')} style={{width:70, height:90, marginTop:60}}/>
          </TouchableOpacity>
          <View></View>
          <View></View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Image source={require('../img/logo/1.jpg')} style={{ width:140, height:140, borderRadius:10, marginTop: -70 }} />
          <Text style={{ fontSize:25, fontWeight:'bold', padding:10, color:'teal' }}>Fred Timberly</Text>
          <Text style={{ fontSize:15, fontWeight:'bold', color:'grey' }}>25, male</Text>
        </View>

        <View style={styles.userDetails}>
          <Image source={require('../img/logo/users.png')} style={{ width:20, height:20, marginLeft:10 }} />
          <Text> Username</Text>
        </View>
        <View style={styles.userDetails}>
          <Image source={require('../img/logo/email.png')} style={{ width:20, height:20, marginLeft:10 }} />
          <Text> Username@email.com</Text>
        </View>
        <View style={styles.userDetailSubscribeDone}>
          <Image source={require('../img/logo/subscription.png')} style={{ width:20, height:20, marginLeft:10 }} />
          <Text> Subscription(3 Months plan)</Text>
        </View>
        <View style={styles.userDetailSubscribeNotDone}>
          <Image source={require('../img/logo/subscription.png')} style={{ width:20, height:20, marginLeft:10 }} />
          <Text> Please Subscribe</Text>
        </View>
        <View style={styles.userDetails}>
          <Image source={require('../img/logo/padlock.png')} style={{ width:20, height:20, marginLeft:10 }} />
          <Text> Change Password</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );




}
export default SelectUser;

const styles = StyleSheet.create({
  userDetails:{
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
    width:'90%',
    padding:20,
    paddingBottom:22,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    color: 'grey',
  },
  userDetailSubscribeDone:{
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#36096D',
    width:'90%',
    padding:20,
    paddingBottom:22,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    color: 'grey',
  },
  userDetailSubscribeNotDone:{
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#F907FC',
    width:'90%',
    padding:20,
    paddingBottom:22,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    color: 'grey',
  },



})