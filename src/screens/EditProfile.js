import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from '@env';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';




export default function EditProfile() {
    const navigation = useNavigation();

    // for setting current input value
    const [nameSubmit, setNameSubmit] = useState("");
    const [usernameSubmit, setUsernameSubmit] = useState("");
    const [emailSubmit, setEmailSubmit] = useState("");

    // fetch asynStorage values
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');
    const [uId, setUId] = useState('');
    const [userid, setuserId] = useState('');
    const [token, setToken] = useState('');


    // success message
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    // error messages
    const [error, setError] = useState('');

    useEffect(() => {
        getData();
    }, [])
    // fetch all neccessary information with asynstorage
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


    // const handleNameChange = (value) => {
    //     setNameSubmit(value);
    // }

    // const handleUsernameChange = (value) => {
    //     setUsernameSubmit(value);
    // }

    // const handleEmailChange = (value) => {
    //     setEmailSubmit(value);
    // }

    const upDateProfile = async (nameSubmit, usernameSubmit) => {

        axios.post(`${BASE_URL}/api/updateProfile`, {
            uId: uId,
            name: nameSubmit,
            username: usernameSubmit,
            devicename: Device.modelName
        }).then(async response => {

            if (response.data.success === true) {

                Alert.alert('Successful!', 'Profile Updated successfully!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            AsyncStorage.clear(); //clear all data

                            navigation.navigate('Login', { update: "Login With Updated User Details", updateUsername: usernameSubmit })
                        },
                    },

                ],
                    { cancelable: false });

                setSuccess(response.data.message)

                console.log("success", response)
            } else {
                setError(response.data.error)
            }
        }).catch(error => {
            // console.error("Catch: ", error);
            if (error.response.status === 422) {
                setError(error.response.data.error)
            }
            setError(error.response.data.error)

        }
        );

    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25, marginBottom: 25 }}>Edit Profile </Text>

            <StatusBar style="auto" />

            {success && (<Text style={{ color: 'limegreen', marginBottom: 20 }}>{success}</Text>)}
          
            {error && (
                <View>
                    {Object.keys(error).map((key) => (
                        <Text key={key} style={{ color: 'crimson', marginBottom: 20, fontWeight: 'bold' }}>{error[key]}</Text>
                    ))}
                </View>
            )}

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="#003f5c"
                    value={(nameSubmit || name).replace(/"/g, '')}
                    onChangeText={nameSubmit => setNameSubmit(nameSubmit)}
                    placeholder="Name"
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="#003f5c"
                    value={(usernameSubmit || username).replace(/"/g, '')}
                    onChangeText={(usernameSubmit) => setUsernameSubmit(usernameSubmit)}
                    placeholder="Username"
                />
            </View>



            <TouchableOpacity onPress={() => upDateProfile(nameSubmit, usernameSubmit)} style={styles.loginBtn}>
                <Text style={{ color: '#ddd', fontSize: 18 }}>UPDATE</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },



    inputView: {
        backgroundColor: "teal",
        borderRadius: 10,
        width: "90%",
        height: 65,
        marginBottom: 20,
        marginLeft: 5,
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 5,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#6F8FAF",
    },
});