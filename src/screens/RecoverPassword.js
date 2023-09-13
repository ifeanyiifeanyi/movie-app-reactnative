import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { EXPO_PUBLIC_BASE_URL } from '@env';
import axios from "axios";

export default function RecoverPassword() {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");

    const [emailError, setEmailError] = useState('');
    const [emailSuccess, setEmailSuccess] = useState('');

    const handleResetPassword = () => {
        axios.post(`${EXPO_PUBLIC_BASE_URL}/api/forgot-password`,{

            email:email

        }).then((response) => {

            if(response.status === 200) {
                setEmailSuccess(response.data.message)
                setEmail("");
            }
            console.log(response);

        }).catch((error) => {
            setEmailError(error.response.data.error);
            console.log(error);
        })
    }

    return (

        <View style={styles.container}>

            <StatusBar style="auto" />
            {emailError && (<Text style={{ color: 'crimson', marginBottom: 20, fontWeight: 'bold' }}>{emailError}</Text>)}
            {emailSuccess && (<Text style={{ color: 'limegreen', marginBottom: 16, fontWeight: '900', textAlign:'center' }}>{emailSuccess}</Text>)}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter your email to reset your password."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                    keyboardType="email-address"
                />
            </View>

            <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                <Text style={styles.forgot_button}>Back To Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword}>
                <Text style={styles.loginText}>RECOVER PASSWORD</Text>
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
        marginBottom: 15,

    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 4,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#6F8FAF",
    },
});