import React from 'react';
import { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const VerifyEmail = () => {
    const [email, setEmail] = useState()
    const [loading, setLoading] = useState(true)


    
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ padding: 10, width: '100%', height: '100%', backgroundColor: '#000', flex: 1, justifyContent: 'center'  }}>
                    <View style={{ alignItems: 'center', marginTop:150 }}>
                        <Image source={require('../img/logo/email1.png')} style={{ width: 250, height: 250, borderRadius: 10}} />

                        <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10, color: 'teal', marginTop: 60 }}>Account Verification</Text>
                        <Text style={{ fontSize: 15, color: 'grey', marginTop:20 }}>
                        Please verify your account, click on the link sent to 
                        <Text style={{fontWeight: 'bold',color: '#36096D'}}> name@mail.com</Text></Text>
                    </View>

                    <View>
                        <TouchableOpacity style={{marginTop:55, width: '80%', alignSelf: 'center', padding: 15,backgroundColor: 'teal',borderRadius:10}}>
                            <Text style={{ alignSelf: 'center'}}>Proceed to login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:30,marginBottom:50, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{ fontSize:15,color:'grey' }}>Mail not recieved?</Text>
                        <Text>
                            <TouchableOpacity>
                                <Text style={{fontWeight:'bold', fontSize:16, color:'#63D471', textDecorationLine:'underline', marginLeft:34}}>Resend</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default VerifyEmail;