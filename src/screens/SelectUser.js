import React from 'react'
import { Alert, ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { initCsrf } from './api';


// //

const SelectUser = ({ navigation, route }) => {



  // for async storage
  const [name, setName] = useState('');
  const [uId, setUId] = useState('');
  const [token, setToken] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setuserId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');

  // navigation and async storage id
  const { user_id } = route.params ? route.params : uId;

  // user if active plan if there is?
  const [userPlan, setUserPlan] = useState();

  useEffect(() => {
    initCsrf();
  }, []);

  useEffect(() => {
    userActivePlan();
    getData();
  }, [])

  // set user asyn storage values
  const getData = () => {
    try {
      AsyncStorage.getItem('name')
        .then(value => {
          if (value != null) {
            setName(value);
          } else {
            navigation.navigate('Login')
          }
        })
      AsyncStorage.getItem('token')
        .then(value => {
          if (value != null) {
            setToken(value);
          }
        })

      AsyncStorage.getItem('uid')
        .then(value => {
          if (value != null) {
            setUId(value);
          } else {
            setUId(user_id)
          }
        })

      AsyncStorage.getItem('username')
        .then(value => {
          if (value != null) {
            setUserName(value);
          }
        })
      AsyncStorage.getItem('email')
        .then(value => {
          if (value != null) {
            setEmail(value);
          }
        })
      AsyncStorage.getItem('subscription_id')
        .then(value => {
          if (value != null) {
            setSubscriptionId(value);
          }
        })
      AsyncStorage.getItem('userid')
        .then(value => {
          if (value != null) {
            setuserId(value);
          }
        })
    } catch (err) {
      console.log(err.message)
    }
  }

  // logout (clear async storage & redirect to login)
  const handleLogout = async () => {
    try {
      // TODO: write api request to logout user from server
      await AsyncStorage.clear(); //clear all data
      Alert.alert('Successful.', "Bye for now!!", [
        {
          text: "Logout",
          onPress: () => navigation.navigate('Login'), // navigate to login page,
          style: "cancel"
        }
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  // user active subscription by user id, 
  // id set by navigation params, and asynstorage params
  // in case of param delay for function call
  function userActivePlan() {
    axios({
      url: `${BASE_URL}/api/userActivePlan/${user_id ? user_id : uId}`,
      method: "GET",
      header: {
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      setUserPlan(res.data[0]);
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
      Alert.alert('Something went wrong.', "Please try again later", [
        {
          text: "Try Again",
          onPress: () => userActivePlan,
          style: "cancel"
        }
      ]);
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 10, backgroundColor: '#000', width: '100%', height: 200 }}>
          <TouchableOpacity>
            <Image source={require('../img/logo/loginlogo.png')} style={{ width: 70, height: 90, marginTop: 60 }} />
          </TouchableOpacity>
        </View>

        <ImageBackground source={require('../img/logo/blackwood.jpg')}
          style={{ resizeMode: 'cover', width: '100%' }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../img/logo/1.jpg')} style={{ width: 140, height: 140, borderRadius: 10, marginTop: -70 }} />
            <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10, color: 'teal' }}>{name ? name : "Unknown"}</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>{userid ? userid : "Not Set"}</Text>
          </View>

          <View style={styles.viewVideos}>
            <View>
              {
                parseInt(subscriptionId) > 0 ?
                  (
                    <TouchableOpacity
                      style={styles.viewVideoOne}
                      onPress={() => { navigation.navigate("HomeScreen") }}>
                      <Image source={require('../img/logo/videos.png')} style={{ width: 20, height: 20 }} />
                      <Text style={{ color: '#ddd' }}> Vidoes</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.viewVideoOne}
                      onPress={() => { navigation.navigate("PaymentPlan") }}>
                      <Image source={require('../img/logo/restricted-area.png')} style={{ width: 20, height: 20 }} />
                      <Text style={{ color: '#ddd' }}> Access Denied</Text>
                    </TouchableOpacity>
                  )
              }
            </View>
            <View>
              <TouchableOpacity style={styles.viewVideoTwo} onPress={() => { navigation.navigate('EditProfile') }}>
                <Image source={require('../img/logo/users.png')} style={{ width: 20, height: 20 }} />
                <Text style={{ color: '#ddd' }}> Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.userDetails}>
            <Image source={require('../img/logo/users.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
            <Text style={{ color: '#ddd' }}> {username ? username : "No Username"}</Text>
          </View>


          <View style={styles.userDetails}>
            <Image source={require('../img/logo/email.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
            <Text style={{ color: '#ddd' }}> {email ? email : "No Email"}</Text>
          </View>


          <View>
            {
              parseInt(subscriptionId) > 0 ?
                (
                  <TouchableOpacity onPress={() => { }}>
                    <View style={styles.userDetailSubscribeDone}>
                      <Image source={require('../img/logo/subscription.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />

                      {
                        userPlan && userPlan ?
                          (
                            <TouchableOpacity style={{ marginLeft: 20 }}>
                              <Text style={{ marginBottom: 10, color: 'royalblue', fontWeight: 'bold' }}>
                                {userPlan.name.toUpperCase()} {"(" + userPlan.duration_in_name + ")"}
                              </Text>
                              <Text style={{ marginBottom: 10, color: '#ddd', fontWeight: 'bold' }}>
                                ₦ {userPlan.amount}
                              </Text>
                              <Text style={{ marginBottom: 10, color: '#ddd', fontWeight: 'bold' }}>
                                {userPlan.transaction_reference}
                              </Text>
                            </TouchableOpacity>
                          ) :
                          (
                            <View style={[styles.container, styles.horizontal]}>
                              <ActivityIndicator size="large" />
                              <ActivityIndicator size="large" />
                              <ActivityIndicator size="large" color="#0000ff" />
                              <ActivityIndicator size="large" color="#00ff00" />
                            </View>
                          )
                      }

                    </View>
                  </TouchableOpacity>
                ) :
                (
                  <TouchableOpacity onPress={() => navigation.navigate('PaymentPlan')}>
                    <View style={styles.userDetailSubscribeNotDone}>
                      <Image source={require('../img/logo/subscription.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                      <Text style={{ color: '#ddd' }}> Please Subscribe</Text>
                    </View>
                  </TouchableOpacity>
                )
            }
          </View>


          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.userDetails, { backgroundColor: '#21D190' }]}>
              <Image source={require('../img/logo/padlock.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
              <Text style={{ color: '#ddd' }}> Change Password</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={handleLogout}>
            <View >
              <LinearGradient
                // Button Linear Gradient
                colors={['#900C3F', '#C70039', '#FF5733']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.userDetails, { marginBottom: 20, }]}
              >
                <Image source={require('../img/logo/log-out.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#ddd' }}> Logout</Text>
              </LinearGradient>

            </View>
          </TouchableOpacity>

        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );




}
export default SelectUser;

const styles = StyleSheet.create({
  viewVideos: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  viewVideoOne: {
    marginRight: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4D5DFB',
    padding: 20,
    borderRadius: 10,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    color: 'grey',
  },
  viewVideoTwo: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#21D190',
    padding: 20,
    borderRadius: 10,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    color: 'grey',
  },
  userDetails: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '90%',
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    color: 'grey',
  },
  userDetailSubscribeDone: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#36096D',
    width: '90%',
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    color: 'grey',
  },
  userDetailSubscribeNotDone: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F907FC',
    width: '90%',
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    color: 'grey',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },



})