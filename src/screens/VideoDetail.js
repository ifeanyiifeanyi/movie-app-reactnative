import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Video, AVPlaybackStatus, PosterComponent, usePoster } from 'expo-av';
import { EXPO_PUBLIC_BASE_URL } from '@env';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';
import NetInfo from '@react-native-community/netinfo';



export default function VideoDetail({ route }) {
    const navigation = useNavigation();

    // fetch video id from navigation
    const videoId = route.params.videoId;

    //set video parameters
    const [videoData, setVideoData] = useState([]);
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState();
    const [refresh, setRefresh] = useState(false);


    // check if network is available
    const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected)
        })
    })

    // belongs to async-storage
    const [name, setName] = useState('');
    const [uId, setUId] = useState('');
    const [token, setToken] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [userid, setuserId] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');
    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    useEffect(() => {
        getData();
    }, [])

    // fetch all neccessary information with asynstorage
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

    // display thumbnail , before video is loaded | played
    function MyPosterComponent() {
        const { poster, onLoad, onError } = usePoster(`${EXPO_PUBLIC_BASE_URL}/${videoData.thumbnail}`, options);
        return (
            <PosterComponent
                poster={poster}
                onLoad={onLoad}
                onError={onError}
                style={{ width: '100%', height: 600 }}
            />
        );
    }

    // set video orientation to landscape or portrait
    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            //Device is in portrait mode, rotate to landscape mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        else {
            //Device is in landscape mode, rotate to portrait mode.
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    // fetch video data from server by id
    useEffect(() => {
        function fetchVideo() {
            // if (isConnected) {
            axios({
                // use video id to fetch video
                url: `${EXPO_PUBLIC_BASE_URL}/api/video/${videoId}`,
                method: "GET",
                header: {
                    'Authorization': 'Bearer ' + token
                },
            }).then(res => {
                setVideoData(res.data[0]);
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
                Alert.alert('Something went wrong.', err.message[
                    {
                        text: "Try Again",
                        onPress: () => navigation.navigate('HomeScreen'),
                        style: "cancel"
                    }
                ]);
            })
            setLoading(false);

            // } else {
            //     Alert.alert('Failed!', 'No internet connection', [{
            //         text: "Try Again",
            //         onPress: () => this.fetchVideo,
            //         style: 'Cancel'
            //     }])
            // }
        }
        fetchVideo();
    }, []);


    useEffect(() => {
        if (refresh) {
            Alert.alert('Success', 'Action performed successfully', [
                {
                    text: 'Ok',
                    onPress: () => setRefresh(false)
                }
            ],
                { cancelable: false }
            );
        }
    }, [refresh]);

    function likeVideo() {
        try {
            axios.post(`${EXPO_PUBLIC_BASE_URL}/api/videolikes/likes`,
                {
                    videoId: videoId,
                    userId: uId
                }, options).then(res => {
                    setLikes(res.data.likes)

                    setRefresh(true)
                    // navigation.navigate('VideoDetail')
                    console.log(res.data.likes)
                }).catch(err => {
                    console.log(err)
                    Alert.alert("warning", err.response.data.message, [
                        {
                            text: 'OK',
                        }
                    ])
                });
        } catch (err) {
            console.log(err)
           
        }
    }
    function disLikeVideo() {
        try {
            axios.post(`${EXPO_PUBLIC_BASE_URL}/api/videodislikes/dislikes`,
                {
                    videoId: videoId,
                    userId: uId
                }, options).then(res => {
                    console.log(res.data.likes)
                    setLikes(res.data.likes)
                    setRefresh(true)
                }).catch(err => {
                    console.log(err)
                });
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <ScrollView>
            <View style={styles.videoContainer}>
                <View style={styles.videoBanner}>
                    {
                        loading ?
                            (
                                (
                                    <Image
                                        source={require('../img/logo/loader0.gif')}
                                        style={styles.videoImage}
                                    />
                                )
                            ) : (
                                <Video
                                    style={styles.videoImage}
                                    ref={video}
                                    source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${videoData.video}` }}
                                    usePoster
                                    posterSource={{ uri: `${EXPO_PUBLIC_BASE_URL}/${videoData.thumbnail}` }}
                                    posterComponent={MyPosterComponent}
                                    resizeMode="contain"
                                    useNativeControls
                                    isLooping={false}
                                    onFullscreenUpdate={setOrientation}
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                                />
                            )
                    }

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
                {
                    loading ? (
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" />
                            <ActivityIndicator size="large" />
                            <ActivityIndicator size="large" color="#0000ff" />
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                    ) :
                        (

                            <TouchableOpacity onPress={() =>
                                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                            }>
                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['#001919', '#004c4c', '#008080']}
                                    style={{
                                        width: '98%', height: 70, alignSelf: 'center', borderRadius: 10, marginTop: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
                                    }}>
                                    <Image
                                        source={status.isPlaying ?
                                            require("../img/logo/pause.png") :
                                            require("../img/logo/video.png")}
                                        style={{ width: 40, height: 40, tintColor: '#000' }}
                                    />
                                    <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: '600', color: '#000' }}>{status.isPlaying ? "Pause" : "Play"}</Text>

                                </LinearGradient>
                            </TouchableOpacity>
                        )
                }

                <View>
                    <Text style={{ color: 'khaki', marginTop: 15, marginLeft: 20, fontSize: 20, marginBottom: 5 }}>
                        {videoData.title ? videoData.title.toUpperCase() : "Loading ..."}

                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                        <Image style={{ width: 20, height: 20 }} source={require("../img/logo/eye.png")} />
                        <Text style={{ color: '#ddd' }}>{
                            videoData.views ? videoData.views : 0} Views
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                        <Image style={{  width: 20, height: 20 }} source={require("../img/logo/heart.png")} />
                        <Text style={{ color: '#ddd' }}>{
                            videoData.likes ? videoData.likes : likes} Like
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7, marginBottom: 17 }}>
                    <Text style={{ color: 'limegreen', marginLeft: 20 }}>Genre: {videoData.genName ? videoData.genName : "Loading ..."}</Text>
                    <Text
                        style={{ color: 'royalblue', marginLeft: 10 }}>
                        Year:
                        {videoData.created_at ?
                            new Date(videoData.created_at).getFullYear() : "Loading"}
                    </Text>
                    <LinearGradient
                        colors={['#ffb1a3', '#ff826b', '#FF6347']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: 100,
                            height: 25,
                            marginLeft: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <Text style={{ color: '#000', fontSize: 13 }}>{videoData.PcName ? videoData.PcName : "Loading .."}</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <Text style={{ color: 'royalblue', marginLeft: 20, marginBottom: 15 }}>{videoData.length ? videoData.length : "Loading .."}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: 100, height: 'auto', backgroundColor: 'teal', justifyContent: 'center', paddingTop: 3, paddingBottom: 3 }}
                    >
                        <View>
                            <Text style={{ fontSize: 10, color: '#000', alignSelf: 'center', marginTop: 10 }}>Rating</Text>
                            <Text style={{ fontWeight: '800', color: '#ccc', alignSelf: 'center' }}>{videoData.rateName ? videoData.rateName : "Loading .."}</Text>
                        </View>

                    </LinearGradient>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: 'teal', marginLeft: 10, marginTop: 8 }}># {videoData.catName ? videoData.catName : "Loading"}</Text>

                </View>
                {/* <TouchableOpacity style={{
                    width: '98%', height: 50, backgroundColor: '#05D6D9', alignSelf: 'center', borderRadius: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                }}>
                    <Image source={require("../img/logo/download1.png")} style={{ width: 24, height: 24, tintColor: '#ddd' }} />
                    <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '600', color: 'ddd' }}>Download</Text>
                </TouchableOpacity> */}

                <Text style={{
                    color: '#d4d4d4', lineHeight: 20, textAlign: 'justify', margin: 20, fontSize: 15, alignSelf: 'center', width: '90%'
                }}>
                    {videoData.long_description ? videoData.long_description : "Loading"}
                </Text>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 35 }}>

                    <TouchableOpacity style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                        <Image source={require('../img/logo/share.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ color: 'teal', marginTop: 5 }}>Share</Text>
                    </TouchableOpacity>

                    {
                        (videoData.likes && videoData.likes.length > 0) || parseInt(videoData.likes) > 0 ? (
                            <TouchableOpacity onPress={disLikeVideo} style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                <Image source={require('../img/logo/dislike.png')} style={{ width: 40, height: 40 }} />
                                <Text style={{ color: 'teal', marginTop: 5, fontWeight: 'bold' }}>Unlike</Text>
                            </TouchableOpacity>
                        ) : (<TouchableOpacity onPress={likeVideo} style={{ width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                            <Image source={require('../img/logo/like.png')} style={{ width: 40, height: 40 }} />
                            <Text style={{ color: 'teal', marginTop: 5, fontWeight: 'bold' }}>Like</Text>
                        </TouchableOpacity>)
                    }

                </View>




            </View>

        </ScrollView >


    )
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 40,
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    videoContainer: {
        flex: 1,
        backgroundColor: '#000'
    },
    videoBanner: {
        height: 300,
    },
    videoImage: {
        width: '100%',
        height: 600,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    videoBannerText: {
        position: 'absolute',
        right: 20,
        top: 50,
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})