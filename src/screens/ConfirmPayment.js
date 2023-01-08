import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, PAYSTACK_PUBLIC_KEY } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
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



  const [name, setName] = useState('');
  const [uId, setUId] = useState('');
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
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          billingEmail={email}
          amount={JSON.stringify(amount)}
          onCancel={(e) => {
            // handle response here
            console.log(e);
          }}
          onSuccess={(res) => {
            // handle response here
            console.log(res)
          }}
          ref={paystackWebViewRef}
        />
<TouchableOpacity>
<Text>Back to plans</Text>

</TouchableOpacity>
        <View>
          <LinearGradient
            colors={['#87CEEB', '#40B5AD']}
            style={styles.paymentDetails}
          >
            <Text style={styles.title}>Payment Details</Text>
            <Text style={styles.text}>Userame: {name}</Text>
            <Text style={styles.text}>Email: {email}</Text>
            <Text style={styles.text}>User Id: {userid}</Text>
            <Text style={styles.text}>Subscription: {subName}</Text>
            <Text style={styles.text}>Duration: {duration_in_name}</Text>
            <Text style={styles.text}>Amount: ₦ {amount}</Text>
          </LinearGradient>
        </View>

        <TouchableOpacity onPress={() => paystackWebViewRef.current.startTransaction()}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#7F00FF', '#D8BFD8', '#BDB5D5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ddd', fontSize: 15 }}>
              Pay Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.oR}>OR</Text>
        <View style={styles.lineThrough} />

        <TouchableOpacity onPress={() => {}}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#900C3F', '#C70039', '#FF5733']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnManual}
          >
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ddd', fontSize: 15 }}>
              Pay Manuel
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
    color: '#28282B',
    fontSize: 15,
    marginBottom: 10,
  }
  ,
  paymentDetails: {
    padding: 20,
    marginBottom: 30,
    borderRadius: 10,
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
  btnManual:{
    padding: 20,
    color:'#ddd',
    fontWeight:'bold',
    borderRadius:8,
  }
});