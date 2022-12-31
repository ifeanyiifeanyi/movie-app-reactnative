import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './src/screens/Splash'
import SelectUser from './src/screens/SelectUser'
import HomeScreen from './src/screens/HomeScreen'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import RecoverPassword from './src/screens/RecoverPassword'
import VideoDetail from './src/screens/VideoDetail'
import VerifyEmail from './src/screens/VerifyEmail'

const Stack = createStackNavigator();

const App = () => {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='Splash' 
                    component={Splash} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='SelectUser' 
                    component={SelectUser} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='HomeScreen' 
                    component={HomeScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='VideoDetail' 
                    component={VideoDetail} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='Login' 
                    component={Login} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='Register' 
                    component={Register} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='VerifyEmail' 
                    component={VerifyEmail} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='RecoverPassword' 
                    component={RecoverPassword} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
  )
}

export default App