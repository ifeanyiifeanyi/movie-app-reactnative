import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, DevSettings, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from '@env';
import axios from "axios";
import { initCsrf } from '../screens/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
const IMAGES = [
  require('../img/movies/15.webp'),
  require('../img/movies/11.webp'),
  require('../img/movies/13.webp'),
  require('../img/movies/14.jpg'),
  require('../img/movies/16.webp'),
  require('../img/movies/17.jpg'),
  require('../img/movies/18.webp'),
  require('../img/movies/12.webp'),
  require('../img/movies/15.webp')
]

const Home = () => {
  const navigation = useNavigation();

  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  const [videoList, SetVideoList] = useState([]);
  const [videoListByRating, SetVideoListByRating] = useState([]);
  const [videoListByCategory, SetVideoListByCategory] = useState([]);

  const [firstCategory, setFirstCategory] = useState([])
  const [secondCategory, setSecondCategory] = useState([])
  const [thirdCategory, setThirdCategory] = useState([])


  // const [name, setName] = useState('');
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

  // check images for banner on reload
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % 3)
    }, 2000);

    return () => { interval && clearInterval(interval) }
  }, [])


  useEffect(() => {
    getData();
    initCsrf();
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

  // use effect function calls
  useEffect(() => {
    getCategories();
    getVideos();
    getVideosByRating();
    getVideosByCategory();
    firstCategorys();
    secondCategorys();
    thirdCategorys();
  }, []);



  //  fetch id and thumbnail from api
  const getVideos = async () => {

    axios({
      url: `${BASE_URL}/api/allvideo`,
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      SetVideoList(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
      // Alert.alert('Something went wrong. Please try again later', err.message, [
      //   {
      //     text: "Try Again",
      //     onPress: () => DevSettings.reload(),
      //     style: "cancel"
      //   }
      // ]);
    })
  }

  // get video by categories
  const getVideosByCategory = async () => {
    axios({
      url: `${BASE_URL}/api/allvideobycategory`,
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      SetVideoListByCategory(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  // get second rows of video based on rating
  const getVideosByRating = async () => {
    axios({
      url: `${BASE_URL}/api/allvideobyrating`,
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      SetVideoListByRating(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err, "video by rating api error")

    })
  }

  //get categories from api
  const getCategories = async () => {
    axios({
      url: `${BASE_URL}/api/categories`,
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      setList(res.data);
      console.log(response)
    }).catch((err) => {
      console.log("category ::",err);

    });
  }

  //get first categories from api
  const firstCategorys = async () => {
    axios({
      url: `${BASE_URL}/api/firstCategory`,
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      setFirstCategory(res.data);
    }).catch((err) => {
      console.log("first category Api call error");
    });
  }
  //get second categories from api
  const secondCategorys = async () => {
    axios({
      url: `${BASE_URL}/api/secondCategory`,
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      setSecondCategory(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  //get second categories from api
  const thirdCategorys = async () => {
    axios({
      url: `${BASE_URL}/api/thirdCategory`,
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      setThirdCategory(res.data);
      // console.log(response)
    }).catch((error) => {
      console.log("second category Api call error");
    });
  }




  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.topView}>
            <Image source={IMAGES[index]} style={styles.topView} />

            {/* get categories from the server*/}
            <View style={styles.categoryView}>
              {list.map((item, index) => {
                return (
                  <TouchableOpacity style={styles.categoryTab} key={item.id}>
                    <Text style={styles.categoryText}>{item.name ? item.name : "Loading .."}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.header}>
            <Image source={require('../img/logo/loginlogo.png')} style={styles.headerLogo} />
            <View style={styles.rightHeader}>
              <TouchableOpacity onPress={() => { navigation.navigate('SelectUser') }}>
                <Image source={require('../img/logo/1.jpg')} style={styles.rightHeaderIcon} />
                <Text style={{ color: 'white', textTransform: 'capitalize' }}>{name ? name : "Loading .."}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.secondView}>
            <View style={{ marginTop: 190 }}>
              <Text style={[styles.customTitle, { marginTop: 20 }]}>{thirdCategory.name ? thirdCategory.name : "Loading ..."}</Text>
              <FlatList contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} data={videoList} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.trendingVideoItem} onPress={() => { navigation.navigate('VideoDetail', { videoId: item.id }) }}>

                    <Image source={{ uri: `${BASE_URL}/${item.thumbnail}` }} style={{ width: 150, height: 170, borderRadius: 10 }} />


                    <View style={styles.nextWatchView}>

                      <Text style={{ color: 'gold', textTransform: 'capitalize', fontWeight: 'slim', fontSize: 15, }}>{item.title}</Text>
                      <Image source={require('../img/logo/option.png')} style={{ width: 15, height: 15, tintColor: 'teal', marginRight: 10 }} />

                    </View>

                    <View style={styles.nextWatchViewPlayImage}>
                      <Image source={require('../img/logo/video.png')} style={{ width: 70, height: 70, tintColor: 'khaki' }} />
                    </View>
                  </TouchableOpacity>
                )
              }} />
            </View>




            <View style={{ marginTop: 10 }}>
              <Text style={styles.customTitle}>{secondCategory.name ? secondCategory.name : "Loading ..."}</Text>

              <FlatList contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} data={videoListByRating} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.trendingVideoItem} onPress={() => { navigation.navigate('VideoDetail', { videoId: item.id }) }}>
                    <Image source={{ uri: `${BASE_URL}/${item.thumbnail}` }} style={styles.trendingVideoItemImage} />
                    <View style={styles.videoLabel}>
                      <Text style={styles.videoLabelText}>{item.rateName}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }} />
            </View>



            <View style={{ marginTop: 5, marginBottom: 100 }}>
              <Text style={styles.customTitle}>{firstCategory.name ? firstCategory.name : "Loading ..."}</Text>
              <FlatList contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} data={videoListByCategory} horizontal renderItem={({ item, image }) => {
                return (
                  <TouchableOpacity style={styles.trendingVideoItem} onPress={() => { navigation.navigate('VideoDetail', { videoId: item.id }) }}>
                    <Image source={{ uri: `${BASE_URL}/${item.thumbnail}` }} style={styles.trendingVideoItemImage} />
                    <View style={styles.videoLabel}>
                      <Text style={styles.videoLabelText}>{item.catName}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: 'black',
    height: 'auto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50
  },
  downloadText: {
    color: 'white',
  },
  headerLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 10,
    color: 'white',
  },
  rightHeader: {
    // flexDirection: 'row',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightHeaderIcon: {
    marginLeft: 15,
    marginBottom: 5,
    height: 30,
    width: 30,
  },
  topView: {
    width: '100%',
    height: 520,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
  },
  categoryView: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    // marginTop: 20,
  },
  categoryTab: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: 'gold',
    fontWeight: '900',
    fontSize: 13,
  },
  topViewBottomView: {
    position: 'absolute',
    bottom: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottom1: {
    width: '45%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom1Icon: {
    width: 30,
    height: 30,
    tintColor: 'teal',
  },
  bottom1Text: {
    color: 'teal',
    fontSize: 16,
    marginTop: 5,
  },
  playButton: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    gap: 900,
    width: 100,
    height: 50,
    marginLeft: 10,
  },
  playIcon: {
    width: 35,
    height: 35,
    marginBottom: 3,
    tintColor: 'teal',

  },
  customTitle: {
    color: 'teal',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 10,
    marginTop: 10,
  },
  secondView: {
    marginTop: 200,
  },
  trendingVideoItem: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 25,
  },
  trendingVideoItemImage: {
    width: 150,
    borderRadius: 10,
    height: 220,
  },
  videoLabel: {
    width: 45,
    height: 45,
    backgroundColor: 'teal',
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLabelText: {
    color: 'khaki',
    fontSize: 9,
  },
  nextWatchView: {
    width: '100%',
    height: 40,
    backgroundColor: '#0a0a0a',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  nextWatchViewPlayImage: {
    width: '100%',
    height: 280,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
