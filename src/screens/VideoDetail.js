import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


export default function VideoDetail() {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.videoContainer}>
                <View style={styles.videoBanner}>
                    <Image source={require('../img/movies/videobanner.jpeg')} style={styles.videoImage} />
                    <View style={styles.videoBannerText}>
                        <TouchableOpacity onPress={() => { navigation.navigate("HomeScreen") }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../img/logo/cancel.png')} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Image source={require("../img/logo/logo.png")} style={{ resizeMode: 'contain', width: 50, height: 40 }} />
                    <Text style={{ color: 'teal', letterSpacing: 4 }}>MOVIES</Text>
                </View>
                <View>
                    <Text style={{ color: 'khaki', marginTop: 25, marginLeft: 20, fontSize: 30 }}>Movie Title</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                    <Text style={{ color: 'limegreen', marginLeft: 20 }}>Genre: Action</Text>
                    <Text style={{ color: 'royalblue', marginLeft: 10 }}>Year: 2022</Text>
                    <View style={{
                        width: 100,
                        height: 25,
                        marginLeft: 10,
                        backgroundColor: '#FF6347',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: '#ddd' }}>U/A 16</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'royalblue', marginLeft: 20 }}>1 hr 40 min</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                    <View style={{ width: 25, height: 30, backgroundColor: 'teal', justifyContent: 'center', paddingTop: 3, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 10, color: '#000' }}>Top</Text>
                        <Text style={{ fontWeight: '800', color: '#ccc' }}>10</Text>
                    </View>

                    <Text style={{ fontSize: 16, fontWeight: '800', color: 'teal', marginLeft: 10, marginTop: 8 }}># 2 Trending for the month</Text>

                </View>
                <TouchableOpacity style={{
                    width: '98%', height: 50, backgroundColor: '#ccc', alignSelf: 'center', borderRadius: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                }}>
                    <Image source={require("../img/logo/play-button.png")} style={{ width: 24, height: 24, tintColor: 'teal' }} />
                    <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '600', color: 'teal' }}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '98%', height: 50, backgroundColor: '#564d4d', alignSelf: 'center', borderRadius: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                }}>
                    <Image source={require("../img/logo/download1.png")} style={{ width: 24, height: 24, tintColor: '#ddd' }} />
                    <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '600', color: 'ddd' }}>Download</Text>
                </TouchableOpacity>

                <Text style={{
                    color: '#d4d4d4', lineHeight: 20, textAlign: 'justify', margin: 20, fontSize: 15, alignSelf: 'center', width: '90%'
                }}>
                    {'Sint labore excepteur est nostrud ipsum do ipsum exercitation eu id ex pariatur ad. Dolore dolore aliquip et esse et nisi commodo fugiat.'}
                </Text>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 35 }}>
                    <TouchableOpacity style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                        <Image source={require('../img/logo/plus.png')} style={{ width: 24, height: 24, tintColor: 'teal' }} />
                        <Text style={{ color: 'teal', marginTop: 5 }}>My List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                        <Image source={require('../img/logo/share.png')} style={{ tintColor: 'teal' }} />
                        <Text style={{ color: 'teal', marginTop: 5 }}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                        <Image source={require('../img/logo/review.png')} style={{ tintColor: 'teal' }} />
                        <Text style={{ color: 'teal', marginTop: 5 }}>Rate</Text>
                    </TouchableOpacity>
                </View>

                

                
            </View>
            
        </ScrollView>
        

    )
}

const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        backgroundColor: '#000'
    },
    videoBanner: {
        height: 300
    },
    videoImage: {
        width: '100%',
        height: '100%'
    },
    videoBannerText: {
        position: 'absolute',
        right: 20,
        top: 50,
        flexDirection: 'row',
    }
})