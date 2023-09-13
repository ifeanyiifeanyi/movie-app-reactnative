import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { EXPO_PUBLIC_BASE_URL } from '@env';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  const navigation = useNavigation();
  // set category 
  const [list, setList] = useState([]);
  // set the user name from asyn storage
  const [name, setName] = useState('');

  const [videoList, SetVideoList] = useState([]);
  const [videoListByRating, SetVideoListByRating] = useState([]);
  const [videoListByCategory, SetVideoListByCategory] = useState([]);

  // set images thumbnail measures
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageThumbnail, setImageThumbnail] = useState([]);

  //setinterval for video thumbnail carusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % imageThumbnail.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);



  // use effect function calls
  useEffect(() => {
    getCategories();
    getData();
    getVideos();
    getVideosByRating();
    getVideosByCategory();
  }, []);

  //get video thumbnail for caruosel from api
  const videoThumbnails = () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/thumbnail`,
      method: "GET"
    }).then(res => {
      setList(res.data);
    }).catch((_error) => {
      console.log("Api call error");
    });
  }

  //get categories from api
  const getCategories = () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/categories`,
      method: "GET"
    }).then(res => {
      setList(res.data);
    }).catch((_error) => {
      console.log("Api call error");
    });
  }

  //  fetch id and thumbnail from api
  const getVideos = () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/allvideo`,
      method: "GET"
    }).then(res => {
      SetVideoList(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const getVideosByRating = () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/allvideobyrating`,
      method: "GET"
    }).then(res => {
      SetVideoListByRating(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const getVideosByCategory = () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/allvideobycategory`,
      method: "GET"
    }).then(res => {
      SetVideoListByCategory(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }


  // fetch async stored data
  const getData = () => {
    try {
      AsyncStorage.getItem('username')
        .then(value => {
          if (value != null) {
            setName(value);
          }
        })
    } catch (error) {

    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.topView}>
            {
              videoList.map((item, _index) => {
                return (
                  <View>
                    <Image source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${item.thumbnail}` }} style={styles.topView} key={item.id} />

                    <Text style={styles.VideoHeadTitles}>{item.title}</Text>
                  </View>
                )
              })
            }

            // get categories from the server
            <View style={styles.categoryView}>
              {
                list.map((item, _index) => {
                  return (
                    <TouchableOpacity style={styles.categoryTab} key={item.id}>
                      <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }

            </View>


          </View>
          <View style={styles.header}>
            <Image source={require('../img/logo/loginlogo.png')} style={styles.headerLogo} />
            <View style={styles.rightHeader}>
              <TouchableOpacity>
                <Image source={require('../img/logo/1.jpg')} style={styles.rightHeaderIcon} />
                <Text style={{ color: 'white', textTransform: 'capitalize' }}>{name}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.secondView}>
            <Text style={styles.customTitle}>Next watch</Text>
            <View style={{ marginTop: 10 }}>
              <FlatList contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} data={videoList} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.trendingVideoItem} onPress={() => { navigation.navigate('VideoDetail', { id: item.id }) }}>

                    <Image source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${item.thumbnail}` }} style={{ width: 150, height: 170, borderRadius: 10 }} />


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
            <Text style={styles.customTitle}>Trending videos ...</Text>
            <View style={{ marginTop: 10 }}>
              <FlatList contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} data={videoListByRating} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.trendingVideoItem}>
                    <Image source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${item.thumbnail}` }} style={styles.trendingVideoItemImage} />
                    <View style={styles.videoLabel}>
                      <Text style={styles.videoLabelText}>{item.rateName}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }} />
            </View>
            <Text style={[styles.customTitle, { marginTop: 20 }]}>Special Selections ...</Text>
            <View style={{ marginTop: 5, marginBottom: 100 }}>
              <FlatList contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} data={videoListByCategory} horizontal renderItem={({ item, image }) => {
                return (
                  <TouchableOpacity style={styles.trendingVideoItem}>
                    <Image source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${item.thumbnail}` }} style={styles.trendingVideoItemImage} />
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
    height: 300,
    position: 'absolute',
    top: 0,
  },
  categoryView: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: 70,
  },
  VideoHeadTitles: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'teal',
    fontSize: 20,
    fontWeight: '900',
    marginLeft:20,
  },
  categoryTab: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: 'gold',
    fontSize: 16,
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