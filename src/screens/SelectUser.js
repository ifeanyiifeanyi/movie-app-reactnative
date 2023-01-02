import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react'
import { black, white } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SelectUser = ({navigation }) => {

  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setuserId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  
  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    try {
       AsyncStorage.getItem('name')
       .then(value => {
        if(value != null){
          setName(value);
        }
       })
       AsyncStorage.getItem('username')
       .then(value => {
        if(value != null){
          setUserName(value);
        }
       })
       AsyncStorage.getItem('email')
       .then(value => {
        if(value != null){
          setEmail(value);
        }
       })
       AsyncStorage.getItem('subscription_id')
       .then(value => {
        if(value != null){
          setSubscriptionId(value);
        }
       })
       AsyncStorage.getItem('userid')
       .then(value => {
        if(value != null){
          setuserId(value);
        }
       })
      
    } catch (error) {
      
    }
  }



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
          <Text style={{ fontSize:25, fontWeight:'bold', padding:10, color:'teal' }}>{name ? name : "Unknown"}</Text>
          <Text style={{ fontSize:15, fontWeight:'bold', color:'grey' }}>{userid ? userid : "Not Set"}</Text>
        </View>

        <View style={styles.viewVideos}>
          <View>
            <TouchableOpacity style={styles.viewVideoOne} onPress={() => {navigation.navigate("HomeScreen")}}>
              <Image source={require('../img/logo/videos.png')} style={{width:20, height:20}}/>
              <Text> Vidoes</Text>
            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity style={styles.viewVideoTwo} onPress={() => {""}}>
              <Image source={require('../img/logo/users.png')} style={{width:20, height:20}}/>
              <Text> Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.userDetails}>
          <Image source={require('../img/logo/users.png')} style={{ width:20, height:20, marginLeft:10 }} />
          <Text> {username ? username : "No Username"}</Text>
        </View>
        <View style={styles.userDetails}>
          <Image source={require('../img/logo/email.png')} style={{ width:20, height:20, marginLeft:10 }} />
          <Text> {email ? email : "No Email"}</Text>
        </View>
        <View>
        {subscriptionId && subscriptionId !== null ? 
         ( 
         <TouchableOpacity  onPress={() => {}}>
            <View style={styles.userDetailSubscribeDone}>
              <Image source={require('../img/logo/subscription.png')} style={{ width:20, height:20, marginLeft:10 }} />
              <Text> Subscription(3 Months plan)</Text>
            </View>
          </TouchableOpacity>
         ) : 
         (
          <TouchableOpacity  onPress={() => {}}>
            <View style={styles.userDetailSubscribeNotDone}>
              <Image source={require('../img/logo/subscription.png')} style={{ width:20, height:20, marginLeft:10 }} />
              <Text> Please Subscribe</Text>
            </View>
          </TouchableOpacity>
        )           
        }
        </View>
        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.userDetails, {backgroundColor:'#21D190'}]}>
            <Image source={require('../img/logo/padlock.png')} style={{ width:20, height:20, marginLeft:10 }} />
            <Text> Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.userDetails, {marginBottom:20}]}>
            <Image source={require('../img/logo/log-out.png')} style={{ width:20, height:20, marginLeft:10 }} />
            <Text> Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );




}
export default SelectUser;

const styles = StyleSheet.create({
  viewVideos:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%'
  },

  viewVideoOne:{
  marginRight:10,
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4D5DFB',
    padding:20,
    borderRadius:10,
    paddingBottom:22,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    color: 'grey',
  },
  viewVideoTwo:{
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#21D190',
    padding:20,
    borderRadius:10,
    paddingBottom:22,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    color: 'grey',
  },
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