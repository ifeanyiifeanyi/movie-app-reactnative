import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, RefreshControl } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import axios from "axios";
import * as Device from 'expo-device';


export default function Login() {
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

    return (

        <View style={styles.container}>
            {/* logo */}
            <Image style={styles.image} source={require("../img/logo/loginlogo.png")} />

            {errorMessage.errorName && (
                <Text style={{ color: 'crimson', fontSize: 14, marginBottom: 5 }}>
                    {errorMessage.errorName}
                </Text>
            )}

            {success && (<Text style={{ color: 'limegreen', marginBottom: 20 }}>{success}</Text>)}
         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Username | Email"
                    placeholderTextColor="#003f5c"
                    value={username}
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

            {/* link to forgot password page */}
            <TouchableOpacity onPress={() => { navigation.navigate("RecoverPassword") }}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* link to Register new user page */}
            <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                <Text style={styles.forgot_button}>Not a user? <Text style={{ color: 'teal' }}>Sign Up</Text></Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => login(username, password)} style={styles.loginBtn}>
                <Text>LOGIN</Text>
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