import React from 'react'
import { ImageBackground, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions, Alert } from 'react-native';
import { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_BASE_URL, EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { Paystack, paystackProps } from 'react-native-paystack-webview';


export default function ConfirmPayment({ props, route }) {
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);


  const navigation = useNavigation();

  // fetch selected payment plan details
  const { userId } = route.params;
  const { paymentPlanId } = route.params;
  const { duration_in_number } = route.params;
  const { duration_in_name } = route.params;
  const { amount } = route.params;
  const { subName } = route.params;

  // set async storage values
  const [name, setName] = useState('');
  const [uId, setUId] = useState('');
  const [token, setToken] = useState('');
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
      AsyncStorage.getItem('token')
        .then(value => {
          if (value != null) {
            setToken(value);
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

  const options = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Paystack
          paystackKey={EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY}
          billingEmail={email}
          amount={JSON.stringify(amount)}
          onCancel={(e) => {
            // handle response here
            console.log(e.status);
            if (e.status) {
              Alert.alert(
                'Cancelled',
                'Transaction was cancelled!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('PaymentPlan'),
                  },
                ],
                { cancelable: false },
              );
            }
          }}
          onSuccess={(res) => {
            console.log(res.data.transactionRef.reference)
            // handle response here
            axios.post(`${EXPO_PUBLIC_BASE_URL}/api/payment`, {
              userId: uId,
              paymentPlanId: paymentPlanId,
              duration: duration_in_number,
              transactionReference: res.data.transactionRef.reference,
              payment_type: "OnlinePayment",
              amount: amount,
            }, options).then(async response => {
              if (response) {
                console.log(response.data);
                AsyncStorage.setItem('subscription_id', JSON.stringify(paymentPlanId))
                  .then(() => console.log('Value updated!'))
                  .catch(error => console.error(error));

                Alert.alert(
                  'Success!',
                  `Your have successfully subscribed to ${subName}`,
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.navigate('SelectUser'),
                    },
                  ],
                  { cancelable: false },
                );
              }
            }).catch(e => {
              console.log("failed transaction:: ", e.message);
              Alert.alert(
                'Failed!',
                `Error: ${e.message}`,
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('PaymentPlan'),
                  },
                ],
                { cancelable: false },
              );
            })


          }}
          ref={paystackWebViewRef}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SelectUser")} style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Image source={require('../img/logo/avatar.png')} style={{ width: 50, height: 50 }} />
          <Text>Back To Profile</Text>
        </TouchableOpacity>
        <View style={styles.paymentDetails}>
          <ImageBackground source={require('../img/logo/blackwood.jpg')} style={{ resizeMode: 'cover', paddingLeft: 20, }}>
            <Text style={styles.title}>Payment Details</Text>
            <Text style={styles.text}>Userame: {name}</Text>
            <Text style={styles.text}>Email: {email}</Text>
            <Text style={styles.text}>User Id: {userid}</Text>
            <Text style={styles.text}>Subscription: {subName}</Text>
            <Text style={styles.text}>Duration: {duration_in_name}</Text>
            <Text style={styles.text}>Amount: ₦ {amount}</Text>
          </ImageBackground>

        </View>
        <TouchableOpacity onPress={() => paystackWebViewRef.current.startTransaction()}>
          <LinearGradient

            // Button Linear Gradient
            colors={['#4169E1', '#1E90FF', '#1E90FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ddd', fontSize: 15 }}>
              Subscribe Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.oR}>OR</Text>
        <View style={styles.lineThrough} />

        <TouchableOpacity onPress={() => {
          navigation.navigate('ManuelPayment', {
            userId: uId,
            paymentPlanId: paymentPlanId,
            duration_in_number: duration_in_number,
            duration_in_name: duration_in_name,
            amount: amount,
            subName: subName,
          })
        }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#00FF00', '#32CD32', '#008000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnManual}
          >
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ddd', fontSize: 15 }}>
            Proceed with Bank Transfer
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>

    </View>

  )
}
const styles = StyleSheet.create({
  title: {
    color: 'royalblue',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#ddd',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  }
  ,
  paymentDetails: {
    padding: 20,
    paddingLeft: 20,
    marginBottom: 30,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#4169E1',
    zIndex: 100
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    justifyContent: 'flex-start'
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    color: '#ddd'
  },
  btn: {
    width: '90%',
    padding: 15,
    alignSelf: 'center',
    borderRadius: 10,

  },
  lineThrough: {
    width: '80%',
    height: 1,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  oR: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnManual: {
    padding: 20,
    color: '#ddd',
    fontWeight: 'bold',
    borderRadius: 8,
  }
});