import React from 'react'
import { ImageBackground, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions, Alert, KeyboardAvoidingView, Linking } from 'react-native';
import { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_BASE_URL, EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { Paystack, paystackProps } from 'react-native-paystack-webview';


export default function ManuelPaymnt({ props, route }) {


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


    const payManual = () => {

    }

    const sendWhatsApp = () => {
        let msg = `
            user Email: ${email}
            username: ${username}
        `;
        let phoneWithCountryCode = "+2348132634881";
      
        let mobile =
          Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
        if (mobile) {
          if (msg) {
            let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
            Linking.openURL(url)
              .then(data => {
                console.log("WhatsApp Opened");
              })
              .catch(() => {
                alert("Make sure WhatsApp installed on your device");
              });
          } else {
            alert("Please insert message to send");
          }
        } else {
          alert("Please insert mobile no");
        }
      };

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>

                    <TouchableOpacity onPress={() => navigation.navigate("SelectUser")} style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop:60 }}>
                        <Image source={require('../img/logo/avatar.png')} style={{ width: 50, height: 50 }} />
                        <Text>Back To Profile</Text>
                    </TouchableOpacity>
                    <View style={styles.paymentDetails}>
                        <ImageBackground source={require('../img/logo/blackwood.jpg')} style={{ resizeMode: 'cover', paddingLeft: 20, }}>
                            <Text style={styles.title}>Subscription Details</Text>
                            <Text style={styles.text}>Userame: {name}</Text>
                            <Text style={styles.text}>Email: {email}</Text>
                            <Text style={styles.text}>User Id: {userid}</Text>
                            <Text style={styles.text}>Subscription: {subName}</Text>
                            <Text style={styles.text}>Duration: {duration_in_name}</Text>
                            <Text style={styles.text}>Amount: ₦ {amount}</Text>
                        </ImageBackground>

                    </View>
                    <View style={styles.paymentDetails}>
                        <ImageBackground source={require('../img/logo/blackwood.jpg')} style={{ resizeMode: 'cover', paddingLeft: 20, }}>
                            <Text style={styles.title}>Bank Deatils</Text>

                            <View style={styles.bankDetails}>
                                <Text style={styles.titleBank}>Fidelity Bank</Text>
                                <Text style={styles.textBank}>Account Number: <Text style={{ fontWeight: '700' }}>5600623227</Text> </Text>
                                <Text style={styles.textBank}>Account Name: <Text style={styles.boldText}>Trinitas System Technology LTD</Text> </Text>

                            </View>
                            <View style={styles.lineThrough} />
                            <View style={styles.bankDetails}>
                                <Text style={styles.titleBank}>Access Bank</Text>
                                <Text style={styles.textBank}>Account Number: <Text style={{ fontWeight: '700' }}>1483829935</Text> </Text>
                                <Text style={styles.textBank}>Account Name: <Text style={styles.boldText}>Trinitas System Technology LTD</Text> </Text>

                            </View>
                        </ImageBackground>

                    </View>

                    <View style={styles.lineThrough} />

                    {/* send whatsapp message */}
                    <View >
                        <TouchableOpacity onPress={sendWhatsApp} style={{ textAlign: 'center', justifyContent:'center', alignItems: 'center' }}>
                            <Image source={require('../img/logo/whatsapp.png')} />
                            <Text style={{ color:'limegreen', fontWeight:'bold', fontSize:18 }}>Contact Us On WhatsApp</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineThrough} />
                    {/*                     
                        <KeyboardAvoidingView style={{ width: '100%' }}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter Account Name"
                                    placeholderTextColor="#003f5c"
                                    value={paymentPlanId}
                                // onChangeText={(username) => setUsername(username)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter Account Number"
                                    placeholderTextColor="#003f5c"
                                // value={username}
                                // onChangeText={(username) => setUsername(username)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Transaction | Reference Code"
                                    placeholderTextColor="#003f5c"
                                // value={username}
                                // onChangeText={(username) => setUsername(username)}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <TouchableOpacity onPress={() => { }}>
                            <LinearGradient
                                // Button Linear Gradient
                                colors={['#0073a9', '#0073a9', '#ccc',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.btnManual}
                            >
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ddd', fontSize: 15 }}>
                                    Submit Prove of Transaction
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity> 
                    */}

                </View>

            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    bankDetails: {
        borderRadius: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleBank: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textBank: {
        fontSize: 16,
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    }





    ,title: {
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
    },
    inputView: {
        backgroundColor: "#0073a9",
        borderRadius: 10,
        width: "90%",
        height: 75,
        marginBottom: 20,
        marginLeft: 20
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    paymentDetails: {
        padding: 20,
        paddingLeft: 20,
        marginBottom: 30,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#0073a9',
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