import React from 'react'
import { Alert, ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';


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


  const [activeUserPlan, setActiveUserPlan] = useState();
  const [activeUserPlanExpire, setActiveUserPlanExpire] = useState();

  useEffect(() => {
    getData();
  }, [])

  // set user asyn storage values
  const getData = () => {
    try {
      AsyncStorage.getItem('user_plan')
        .then((user_planString) => {
          if (user_planString) {
            const user_plan = JSON.parse(user_planString);
            setActiveUserPlan(user_plan);
            console.log('Retrieved user_plan:', user_plan);
          } else {
            console.log('No user_plan found in AsyncStorage');
          }
        })
        .catch((error) => {
          console.log('Failed to retrieve user_plan:', error);
        });
      AsyncStorage.getItem('user_plan_expire')
        .then((user_plan_expireString) => {
          if (user_plan_expireString) {
            const user_plan_expire = JSON.parse(user_plan_expireString);
            setActiveUserPlanExpire(user_plan_expire);
            console.log('Retrieved user_plan_expire:', user_plan_expire);
          } else {
            console.log('No user_plan_expire found in AsyncStorage');
          }
        })
        .catch((error) => {
          console.log('Failed to retrieve user_plan:', error);
        });
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
      Alert.alert('Successful.', "Click OK to Logout", [
        {
          text: "Ok",
          onPress: () => {
            AsyncStorage.clear(); //clear all data

            navigation.navigate('Login')
          }, // navigate to login page,
          style: "cancel"
        }, {
          text: "Cancel"
        }
      ], { cancelable: true });
    } catch (error) {
      console.log(error);
    }
  }


  const formatCreatedAt = (dateString) => {
    // Use moment.js to format the date
    return moment(dateString).format('LLL');
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 10, backgroundColor: '#000', width: '100%', height: 155 }}>
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
                activeUserPlan && activeUserPlan.length > 0 ?

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
                      <Text style={{ color: '#ddd' }}> Please Subscribe</Text>
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
              activeUserPlan && activeUserPlan.length > 0 ?
                (
                  <TouchableOpacity onPress={() => { }}>
                    <View style={styles.userDetailSubscribeDone}>
                      <Image source={require('../img/logo/subscription.png')} style={{ width: 30, height: 30, marginLeft: 5 }} />

                      {
                        activeUserPlan && activeUserPlan.length > 0  ?
                          (
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                              <Text style={{ marginBottom: 10, color: 'royalblue', fontWeight: 'bold' }}>
                                {activeUserPlan[0].name.toUpperCase()} {"(" + activeUserPlan[0].duration_in_name + ")"}
                              </Text>
                              <Text style={{ marginBottom: 10, color: '#ddd', fontWeight: 'bold' }}>
                                ₦ {activeUserPlan[0].amount}
                              </Text>
                              <Text style={{ marginBottom: 10, color: '#ddd', fontWeight: 'bold' }}>
                                {activeUserPlan[0].transaction_reference}
                              </Text>
                              <Text style={{ marginBottom: 10, color: '#ddd', fontWeight: 'bold' }}>
                                Start Date:  {formatCreatedAt(activeUserPlan[0].created_at)}
                              </Text>
                              <Text style={{ marginBottom: 10, color: '#ddd', fontWeight: 'bold' }}>
                                End Date:  {formatCreatedAt(activeUserPlanExpire)}
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
                      <Text style={{ color: '#ddd' }}> Subscribe for Latest Contents</Text>
                    </View>
                  </TouchableOpacity>
                )
            }
          </View>


          <TouchableOpacity onPress={() => { navigation.navigate('ChangePassword') }}>
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