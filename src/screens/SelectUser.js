import React from 'react'
import { Alert, ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

// //

const SelectUser = ({ navigation }) => {

  const [name, setName] = useState('');
  const [uId, setUId] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setuserId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');

  const [userPlan, setUserPlan] = useState();

  useEffect(() => {
    async function userActivePlan() {
      try {
        // use user id to fetch active plan
        const response = await fetch(`${BASE_URL}/api/userActivePlan/${uId}`);
        const data = await response.json();
        console.log(data)
        setUserPlan(data[0]);
      } catch (err) {
        console.error(err);
        Alert.alert('Something went wrong. Please try again later:: ', err.message, [
          {
            text: "Try Again",
            onPress: () => this.userActivePlan,
            style: "cancel"
          }

        ]);
      } finally {
        // setLoading(false);
      }
    }
    setTimeout(() => {
      userActivePlan();
    }, 3000);

  }, []);

  useEffect(() => {
    getData();
  }, [])

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


      AsyncStorage.getItem('uid')
        .then(value => {
          if (value != null) {
            setUId(value);
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



  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 10, backgroundColor: '#000', width: '100%', height: 200 }}>
          <TouchableOpacity>
            <Image source={require('../img/logo/loginlogo.png')} style={{ width: 70, height: 90, marginTop: 60 }} />
          </TouchableOpacity>
          <View></View>
          <View></View>
        </View>
        <ImageBackground source={require('../img/logo/blackwood.jpg')} style={{ resizeMode: 'cover', width: '100%' }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../img/logo/1.jpg')} style={{ width: 140, height: 140, borderRadius: 10, marginTop: -70 }} />
            <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10, color: 'teal' }}>{name ? name : "Unknown"}</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>{userid ? userid : "Not Set"}</Text>
          </View>

          <View style={styles.viewVideos}>
            <View>
              {

                subscriptionId && parseInt(subscriptionId) !== 0 ?
                  (
                    <TouchableOpacity
                      style={styles.viewVideoOne}
                      onPress={() => { navigation.navigate("HomeScreen") }}>
                      <Image source={require('../img/logo/videos.png')} style={{ width: 20, height: 20 }} />
                      <Text> Vidoes</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.viewVideoOne}
                      onPress={() => { navigation.navigate("PaymentPlan") }}>
                      <Image source={require('../img/logo/restricted-area.png')} style={{ width: 20, height: 20 }} />
                      <Text> Access Denied</Text>
                    </TouchableOpacity>
                  )
              }
            </View>
            <View>
              <TouchableOpacity style={styles.viewVideoTwo} onPress={() => { "" }}>
                <Image source={require('../img/logo/users.png')} style={{ width: 20, height: 20 }} />
                <Text> Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.userDetails}>
            <Image source={require('../img/logo/users.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
            <Text> {username ? username : "No Username"}</Text>
          </View>
          <View style={styles.userDetails}>
            <Image source={require('../img/logo/email.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
            <Text> {email ? email : "No Email"}</Text>
          </View>
          <View>
            {
              subscriptionId && parseInt(subscriptionId) !== 0 ?
                (
                  <TouchableOpacity onPress={() => { }}>
                    <View style={styles.userDetailSubscribeDone}>
                      <Image source={require('../img/logo/subscription.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                      <Text> Subscription(3 Months plan)</Text>
                    </View>
                  </TouchableOpacity>
                ) :
                (
                  <TouchableOpacity onPress={() => navigation.navigate('PaymentPlan')}>
                    <View style={styles.userDetailSubscribeNotDone}>
                      <Image source={require('../img/logo/subscription.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                      <Text> Please Subscribe</Text>
                    </View>
                  </TouchableOpacity>
                )
            }
          </View>
          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.userDetails, { backgroundColor: '#21D190' }]}>
              <Image source={require('../img/logo/padlock.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
              <Text> Change Password</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.userDetails, { marginBottom: 20 }]}>
              <Image source={require('../img/logo/log-out.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
              <Text> Logout</Text>
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



})