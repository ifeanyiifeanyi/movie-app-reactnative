import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, RefreshControl } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import axios from "axios";
import * as Device from 'expo-device';


export default function Login({ route }) {
    let { update } = route.params ? route.params : {}; // used for when a user updates details
    let { updateUsername } = route.params ? route.params : {}; // used for when a user updates details

    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState(false)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setError] = useState({ errorName: "" });
    const [success, setSuccess] = useState("");

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);



    const login = async (username, password) => {
        if (!username.trim() || !password.trim()) {
            Alert.alert("warning", "Please enter all required fields!");
            return;
        } else if (password.trim().length < 8) {
            Alert.alert("warning", "Password must not be less than 8 characters!");
            return;
        } else {

            axios.post(`${BASE_URL}/api/login`, {
                username: username,
                password: password,
                devicename: Device.modelName

            }).then(async response => {
                // if login data return true 
                if (response.data.status) {
                    console.log(response.data)
                    const user_plan = response.data.user_plan;
                    const user_plan_expire = response.data.expiry_date;
                    console.log("user plan data", user_plan_expire)

                    if (user_plan) {
                        AsyncStorage.setItem('user_plan', JSON.stringify(user_plan))
                            .then(() => {
                                console.log('user_plan stored successfully');
                            })
                            .catch((error) => {
                                console.log('Failed to store user_plan:', error);
                            });
                    }

                    if(user_plan_expire){
                        AsyncStorage.setItem('user_plan_expire', JSON.stringify(user_plan_expire))
                            .then(() => {
                                console.log('user_plan_expire stored successfully');
                            })
                            .catch((error) => {
                                console.log('Failed to store user_plan_expire:', error);
                            });
                    }

                    // set empty error msgs if login success 
                    setError({
                        errorUsername: "",
                        errorPassword: ""
                    });

                    // empty form inputs if login success 
                    setSuccess("Login Successful");
                    setUsername("");
                    setPassword("");
                    try {
                        await AsyncStorage.setItem('uid', JSON.stringify(response.data.username.id));
                        // await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
                        await AsyncStorage.setItem('username', response.data.username.name);
                        await AsyncStorage.setItem('name', response.data.username.username);
                        await AsyncStorage.setItem('email', response.data.username.email);
                        await AsyncStorage.setItem('userid', response.data.username.userid);
                        await AsyncStorage.setItem('status', JSON.stringify(response.data.username.status));
                        // remember to use this to hide videos if null
                        await AsyncStorage.setItem('subscription_id', JSON.stringify(response.data.username.subscription_id));
                    } catch (error) {
                        console.log(error)
                    }

                    // if user account has not been verified !
                    if (response.data.username.status == 1) {
                        //timer before redirect if login success 
                        setTimeout(() => {
                            navigation.navigate('SelectUser', { user_id: response.data.username.id });
                            setSuccess("");
                        }, 4000);
                    } else {
                        // redirect to verify if account has not verify
                        setTimeout(() => {
                            navigation.navigate('VerifyEmail');
                            setSuccess("");
                        }, 4000);
                    }
                } else {
                    console.log(response.message)
                    // set api error msg 
                    setError({
                        errorName: response.data.message ? response.data.message : "",
                    });
                }
            }).catch(e => {
                console.log("login message ", e.message);
                Alert.alert('Something went wrong.', "Please try again later", [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate('Login'),
                        style: "cancel"
                    }

                ]);
            })
        }
    }

    const RefreshNow = async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.clear();

            // Navigate to the login page
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <View style={styles.container}>
            {/* logo */}
            <Image style={styles.image} source={require("../img/logo/loginlogo.png")} />

            {errorMessage.errorName && (
                <Text style={{ color: 'crimson', fontSize: 14, marginBottom: 5 }}>
                    {errorMessage.errorName}
                </Text>
            )}

            {success && (<Text style={{ color: 'limegreen', marginBottom: 20, fontWeight: '900' }}>     {success}</Text>
            )}

            {update && (
                <Text style={{ color: 'limegreen', marginBottom: 20, fontWeight: '900' }}>{update}</Text>
            )}


            {/* work on it later */}

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Username | Email"
                    placeholderTextColor="#003f5c"
                    value={username || updateUsername ? updateUsername : ""}
                    onChangeText={(username) => setUsername(username)}
                />
            </View>

            {/*password input text */}
            <View style={[styles.inputView, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image source={!showPassword ? require('../img/logo/eye.png') : require('../img/logo/close-eyes.png')} style={{ width: 30, height: 30, marginRight: 20 }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => login(username, password)} style={styles.loginBtn}>
                <Text>LOGIN</Text>
            </TouchableOpacity>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                {/* link to forgot password page */}
                <TouchableOpacity onPress={() => { navigation.navigate("RecoverPassword") }}>
                    <Text style={styles.forgot_button}><Text style={{ color: 'gold', fontWeight: '900' }}>Forgot Password?</Text></Text>
                </TouchableOpacity>

                {/* link to Register new user page */}
                <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                    <Text style={styles.forgot_button}><Text style={{ color: 'teal' }}>Sign Up</Text></Text>
                </TouchableOpacity>
            </View>





            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            {update && (
                <TouchableOpacity onPress={RefreshNow} style={{ marginTop: 20, backgroundColor: 'royalblue', padding: 10, borderRadius: 12 }}>
                    <Text style={{ color: '#ddd', fontWeight: '900' }}>Refresh</Text>
                </TouchableOpacity>
            )}

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

    image: {
        width: 130,
        height: 158,
        marginBottom: 40,
        objectFit: 'contain',
        marginTop: 10,
    },

    inputView: {
        backgroundColor: "teal",
        borderRadius: 10,
        width: "90%",
        height: 75,
        marginBottom: 20,
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
        marginRight: 20
    },

    loginBtn: {
        width: "90%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 30,
        backgroundColor: "#6F8FAF",
    },
});