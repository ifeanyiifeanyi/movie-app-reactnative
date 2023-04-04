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


const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../img/logo/loginlogo.png")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={[styles.inputView, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Password."
                    placeholderTextColor="#003f5c"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image source={!showPassword ? require('../img/logo/eye.png') : require('../img/logo/close-eyes.png')} style={{ width: 30, height: 30, marginRight: 20 }} />
                </TouchableOpacity>
            </View>


            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm Password."
                    placeholderTextColor="#003f5c"
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>RECOVER PASSWORD</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate("SelectUser") }}>
                <Text style={styles.forgot_button}>Back to Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChangePassword
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: 40,
        height: 50,
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "teal",
        borderRadius: 10,
        width: "90%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
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
        color: 'royalblue',
        fontSize: 20,
        marginTop: 20,
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