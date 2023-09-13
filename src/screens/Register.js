import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from '@env';
import * as Device from 'expo-device'



export default function Register() {

  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error messages
  const [errorMessage, setError] = useState({ errorName: "", errorUsername: "", errorEmail: "", errorPassword: "" });

  // success message
  const [success, setSuccess] = useState("");

  const register = async (name, username, email, password) => {
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error!", "All fields are required!");
      return;
    } else if (password.trim() !== confirmPassword.trim()) {
      Alert.alert("Warning", "Passwords do not match!")
      return;
    } else {
      axios.post(`${EXPO_PUBLIC_BASE_URL}/api/register`, {
        name: name,
        username: username,
        email: email,
        password: password,
        devicename: Device.modelName
      }).then(response => {
        console.log(response.data)
        // success response
        if (response.data.status) {
          setError({
            errorName: "",
            errorUsername: "",
            errorEmail: "",
            errorPassword: ""
          });
          setSuccess("Registration Successfull");
          setName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          Alert.alert('Registration Successful', 'Please check your email for verification link', [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('Login',)
            }
          ],
            { cancelable: false }
          );

        } else {
          // if error: set error messages
          setError({
            errorName: response.data.message.name ? response.data.message.name[0] : "",
            errorUsername: response.data.message.username ? response.data.message.username[0] : "",
            errorEmail: response.data.message.email ? response.data.message.email[0] : "",
            errorPassword: response.data.message.password ? response.data.message.password[0] : ""
          });
        }
      }).catch(e => {
        Alert.alert('Failed!', 'Registration Failed', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Register',)
          }
        ],
          { cancelable: true }
        );
        console.log("Register Error: ", e.message)
      })
    }
  }

  return (

    <View style={styles.container}>
      <Image style={styles.image}  source={require("../img/logo/loginlogo.png")} />

      <StatusBar style="auto" />

      {success && (<Text style={{ color: 'limegreen', marginBottom: 20 }}>{success}</Text>)}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Full Name"
          placeholderTextColor="#003f5c"
          value={name}
          onChangeText={(name) => setName(name)}
        />
      </View>
      {errorMessage.errorName && (
        <Text style={{ color: 'crimson', fontSize: 10, marginBottom: 5 }}>
          {errorMessage.errorName}
        </Text>
      )}


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Username"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      {errorMessage.errorUsername && (
        <Text style={{ color: 'crimson', fontSize: 10, marginBottom: 5 }}>
          {errorMessage.errorUsername}
        </Text>
      )}


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Email Address."
          placeholderTextColor="#003f5c"
          value={email}
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      {errorMessage.errorEmail && (
        <Text style={{ color: 'crimson', fontSize: 10, marginBottom: 15, width: '85%' }}>
          {errorMessage.errorEmail}
        </Text>
      )}

      <View style={[styles.inputView,  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
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
      {errorMessage.errorPassword && (
        <Text style={{ color: 'crimson', fontSize: 10, marginBottom: 5 }}>
          {errorMessage.errorPassword}
        </Text>
      )}

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
      <TouchableOpacity onPress={() => register(name, username, email, password)} style={styles.loginBtn}>
        <Text style={{ color: '#ddd', fontSize: 18 }}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
        <Text style={styles.forgot_button}>A Member? <Text style={{ color: 'teal' }}>Sign In</Text></Text>
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
    width: 100,
    height: 130,
    marginBottom: 40,
    objectFit: 'contain',
    marginTop: 10,
  },

  inputView: {
    backgroundColor: "teal",
    borderRadius: 10,
    width: "90%",
    height: 60,
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
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom:25,
    backgroundColor: "#6F8FAF",
  },
});