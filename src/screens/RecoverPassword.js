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

export default function App() {
    const navigation = useNavigation();
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

            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
                <Text style={styles.forgot_button}>Back To Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}>
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

    image: {
        width: 150,
        height: 100,
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