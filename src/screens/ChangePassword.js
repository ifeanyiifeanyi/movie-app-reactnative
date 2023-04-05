import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import axios from "axios";



const ChangePassword = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [newPasswordError, setNewPasswordError] = useState('');

  // for async storage
  const [name, setName] = useState('');
  const [uId, setUId] = useState('');
  const [token, setToken] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setuserId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');


  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    getData();
  }, [])

  // set user asyn storage values
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

  const updatePassword = async () => {
    try {

      if (newPassword.trim().length < 8) {
        Alert.alert('Invalid password', 'Password must be at least 8 characters long')
      } else if (newPassword.trim() !== confirmPassword.trim()) {
        Alert.alert('Wrong password', 'Password does not match')
      } else {

        if (uId) {
          const response = await axios.post(`${BASE_URL}/api/update-password`, {
            userId: uId,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
          });
          
          if (response) {
            Alert.alert('Password Updated.', "Password Update Was Successful", [
              {
                text: "OK",
                onPress: () => navigation.navigate('SelectUser')
              }
            ]);
            console.log("success", response)
          }
        }
      }
    } catch (error) {
      setNewPasswordError(error.response.data.error)
      console.log("eorr", error.response.data);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginBottom: 25 }}>Update Password</Text>

      <StatusBar style="auto" />

      {newPasswordError && (<Text style={{ color: 'crimson', marginBottom: 20, fontWeight: 'bold' }}>{newPasswordError}</Text>)}

      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter Current Password"
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter New Password"
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Confirm Password"
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity onPress={updatePassword} style={styles.loginBtn}>
        <Text style={{ color: '#ddd', fontSize: 18 }}>UPDATE PASSWORD</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChangePassword
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
    backgroundColor: "#1E90FF",
  },
});