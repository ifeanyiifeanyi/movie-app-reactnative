import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import { LinearGradient } from 'expo-linear-gradient';


const PaymentPlan = ({ navigation }) => {

  const [plans, setPlans] = useState('');
  const [planError, setPlanError] = useState();

  const screenHeight = Dimensions.get('screen').height;

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
          if (value != null) {
            setName(value);
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

  useEffect(() => {
    async function fetchPaymentPlan() {
      try {
        // fetch all payment plans
        const response = await fetch(`${BASE_URL}/api/paymentPlans`);
        const data = await response.json();
        console.log(data);
        setPlans(data);
      } catch (err) {
        console.error("error from calling plans", err.message);
        setPlanError(err.message)
        // Alert.alert('Something went wrong. Please try again later', err.message, [
        //     {
        //       text: "Try Again",
        //       onPress: () => this.fetchPaymentPlan,
        //       style: "cancel"
        //     }

        // ]);
      } finally {
        // setLoading(false);
      }
    }
    fetchPaymentPlan();
  }, []);

  const colorPalettes = [
    ['#0000ff', '#4c4cff', '#7f7fff'],
    ['#001919', '#004c4c', '#008080'],
    ['#FFA07A', '#FA8072', '#E9967A'],
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 10, backgroundColor: '#000', width: '100%', height: screenHeight }}>
          <Image source={require('../img/logo/loginlogo.png')} style={{ width: 70, height: 90, marginTop: 30 }} />
          <Text style={{ fontSize: 25, marginTop: 15, alignSelf: 'center', marginBottom: 30, color: '#ddd' }}>Playment Plans</Text>

          <TouchableOpacity styl={{ marginTop: 15, alignSelf: 'center', marginBottom: 40 }}>
            <Image source={require('../img/logo/1.jpg')} style={{ alignSelf: 'center', width: 45, height: 45, }} />
            <Text style={{ fontSize: 14, marginTop: 15, alignSelf: 'center', marginBottom: 30, color: '#ddd' }}>Back to profile</Text>
          </TouchableOpacity>

          {
            plans ? (

              plans.map((value, index) => {
                const colorPalette = colorPalettes[index % colorPalettes.length];
                return (
                  <TouchableOpacity>
                    <LinearGradient
                      // Button Linear Gradient
                      colors={colorPalette}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.userDetails}
                    >
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between', alignItems: 'center'
                      }}>
                        <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
                          <Image source={require('../img/logo/shooting-star.png')} style={{ width: 40, height: 40, marginLeft: 10 }} />
                          <View style={{ marginLeft: 9 }}>
                            <Text style={{ color: '#ddd', fontWeight: 'bold' }}>{value.name}</Text>
                            <Text style={{ fontSize: 12, color: '#ddd' }}>₦ {value.amount}</Text>
                            <Text style={{ fontSize: 12, color: '#ddd' }}>{value.duration_in_name}</Text>
                          </View>
                        </View>
                        <View style={{ backgroundColor: 'blue', position: 'absolute', left: 250, padding: 10 }}>
                          <Text style={{ fontSize: 12, color: '#ddd' }}>Subscribe</Text>
                        </View>
                      </View>

                    </LinearGradient>
                  </TouchableOpacity>
                )
              })
            ) : (
              <TouchableOpacity style={{ marginTop: 30 }}>
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#900C3F', '#C70039', '#FF5733']}
                  style={styles.userDetails}
                >
                  <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../img/logo/critical.png')} style={{ width: 50, height: 50, marginLeft: 10 }} />
                    <Text style={{ fontSize: 20, alignSelf: 'center', color: '#ddd', marginLeft: 50 }}> Error 404</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView >
    </SafeAreaView >
  );




}
export default PaymentPlan;

const styles = StyleSheet.create({
  userDetails: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '90%',
    height: 100,
    padding: 10,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    color: 'grey',
  },

})