import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Video from 'react-native-video';
import { BASE_URL } from '@env';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function VideoDetail({route}) {
    const navigation = useNavigation();
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        const videoId = route.params.videoId;
        async function fetchVideo() {
          try {
            const response = await fetch(`${BASE_URL}/api/video/${videoId}`);
            const data = await response.json();
            setVideoData(data[0]);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchVideo();
    }, []);


    return (
        <ScrollView>
            <View style={styles.videoContainer}>
                <View style={styles.videoBanner}>
                    <Image source={{ uri: `${BASE_URL}/${videoData.thumbnail}` }} style={styles.videoImage} />
                    <View style={styles.videoBannerText}>
                        <TouchableOpacity onPress={() => { navigation.navigate("HomeScreen") }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../img/logo/cancel.png')} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 300, alignItems: 'center' }}>
                    <Image source={require("../img/logo/loginlogo.png")} style={{ resizeMode: 'contain', width: 50, height: 40 }} />
                    <Text style={{ color: 'teal', letterSpacing: 4 }}>MOVIEs</Text>
                </View>
                <View>
                    <Text style={{ color: 'khaki', marginTop: 25, marginLeft: 20, fontSize: 30 }}>{videoData.title ? videoData.title : "Loading ..."}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                    <Text style={{ color: 'limegreen', marginLeft: 20 }}>Genre: {videoData.genName ? videoData.genName : "Loading ..."}</Text>
                    <Text style={{ color: 'royalblue', marginLeft: 10 }}>Year: { videoData.created_at ? new Date(videoData.created_at).getFullYear() : "Loading"}</Text>
                    <View style={{
                        width: 100,
                        height: 25,
                        marginLeft: 10,
                        backgroundColor: '#FF6347',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: '#ddd' }}>{videoData.PcName ? videoData.PcName : "Loading .."}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'royalblue', marginLeft: 20 }}>{videoData.length ? videoData.length : "Loading .."}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                    <View style={{ width: 100, height: 55, backgroundColor: 'teal', justifyContent: 'center', paddingTop: 3, paddingBottom: 3 }}>
                        <Text style={{ fontSize: 10, color: '#000', alignSelf: 'center', marginTop: 10 }}>Rating</Text>
                        <Text style={{ fontWeight: '800', color: '#ccc' , alignSelf: 'center'}}>{videoData.rateName ? videoData.rateName : "Loading .."}</Text>
                    </View>

                    <Text style={{ fontSize: 16, fontWeight: '800', color: 'teal', marginLeft: 10, marginTop: 8 }}># {videoData.catName ? videoData.catName : "Loading"}</Text>

                </View>
                <TouchableOpacity style={{
                    width: '98%', height: 50, backgroundColor: '#89D8D3', alignSelf: 'center', borderRadius: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                }}>
                    <Image source={require("../img/logo/play-button.png")} style={{ width: 24, height: 24, tintColor: 'teal' }} />
                    <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '600', color: 'teal' }}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '98%', height: 50, backgroundColor: '#05D6D9', alignSelf: 'center', borderRadius: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                }}>
                    <Image source={require("../img/logo/download1.png")} style={{ width: 24, height: 24, tintColor: '#ddd' }} />
                    <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '600', color: 'ddd' }}>Download</Text>
                </TouchableOpacity>

                <Text style={{
                    color: '#d4d4d4', lineHeight: 20, textAlign: 'justify', margin: 20, fontSize: 15, alignSelf: 'center', width: '90%'
                }}>
                    {videoData.long_description ? videoData.long_description : "Loading"}
                </Text>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 35 }}>
                  
                    <TouchableOpacity style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                        <Image source={require('../img/logo/share.png')} style={{ tintColor: 'teal' }} />
                        <Text style={{ color: 'teal', marginTop: 5 }}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                        <Image source={require('../img/logo/review.png')} style={{ tintColor: 'teal' }} />
                        <Text style={{ color: 'teal', marginTop: 5 }}>Like</Text>
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
        height: 600
    },
    videoBannerText: {
        position: 'absolute',
        right: 20,
        top: 50,
        flexDirection: 'row',
    }
})