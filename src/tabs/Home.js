import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  DevSettings,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
const IMAGES = [
  require("../img/movies/15.webp"),
  require("../img/movies/11.webp"),
  require("../img/movies/13.webp"),
  require("../img/movies/14.jpg"),
  require("../img/movies/16.webp"),
  require("../img/movies/17.jpg"),
  require("../img/movies/18.webp"),
  require("../img/movies/12.webp"),
  require("../img/movies/15.webp"),
];

const Home = () => {
  const navigation = useNavigation();

  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  const [videoList, SetVideoList] = useState([]);
  const [videoListByRating, SetVideoListByRating] = useState([]);
  const [videoListByCategory, SetVideoListByCategory] = useState([]);

  const [firstCategory, setFirstCategory] = useState([]);
  const [secondCategory, setSecondCategory] = useState([]);
  const [thirdCategory, setThirdCategory] = useState([]);

  // const [name, setName] = useState('');
  const [uId, setUId] = useState("");
  const [token, setToken] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userid, setuserId] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");

  const [loading, setLoading] = useState(false);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // check images for banner on reload
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % 3);
    }, 2000);

    return () => {
      interval && clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  // fetch all neccessary information with asynstorage
  const getData = () => {
    try {
      AsyncStorage.getItem("name").then((value) => {
        if (value != null) {
          setName(value);
        } else {
          navigation.navigate("Login");
        }
      });
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          setToken(value);
        }
      });

      AsyncStorage.getItem("uid").then((value) => {
        if (value != null) {
          setUId(value);
        }
      });

      AsyncStorage.getItem("username").then((value) => {
        if (value != null) {
          setUserName(value);
        }
      });
      AsyncStorage.getItem("email").then((value) => {
        if (value != null) {
          setEmail(value);
        }
      });
      AsyncStorage.getItem("subscription_id").then((value) => {
        if (value != null) {
          setSubscriptionId(value);
        }
      });
      AsyncStorage.getItem("userid").then((value) => {
        if (value != null) {
          setuserId(value);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // use effect function calls
  useEffect(() => {
    getVideos();
    getCategories();
    getVideosByRating();
    getVideosByCategory();
    firstCategorys();
    secondCategorys();
    thirdCategorys();
  }, []);

  // 09064534199
  //  fetch id and thumbnail from api
  const getVideos = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${EXPO_PUBLIC_BASE_URL}/api/allvideo`);
      const videoData = response.data;

      // save the video data to async-storage
      await AsyncStorage.setItem("videoList", JSON.stringify(videoData));
      setLoading(false);
      SetVideoList(videoData);

      console.log("video data: ", videoData);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  // get video by categories
  const getVideosByCategory = async () => {
    // setLoading(true);

    try {
      const response = await axios.get(`${EXPO_PUBLIC_BASE_URL}/api/allvideobycategory`);
      const videoByCategoryData = response.data;
      await AsyncStorage.setItem(
        "videoListByCategory",
        JSON.stringify(videoByCategoryData)
      );

      const videoByCategoryDataString = await AsyncStorage.getItem(
        "videoListByCategory"
      );
      if (videoByCategoryDataString !== null) {
        const videoByCategoryDataAsync = JSON.parse(videoByCategoryDataString);
        SetVideoListByCategory(videoByCategoryDataAsync);
      } else {
        // The item doesn't exist in AsyncStorage
        console.log("No video by category data found in AsyncStorage");
      }
      setLoading(false);
      console.log("Video by category data retrieved:", videoByCategoryData);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }

  };

  // get second rows of video based on rating
  const getVideosByRating = async () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/allvideobyrating`,
      method: "GET",
    })
      .then((res) => {
        SetVideoListByRating(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err, "video by rating api error");
      });
  };

  //get categories from api
  const getCategories = async () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/categories`,
      method: "GET",
    })
      .then((res) => {
        setList(res.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("category ::", err);
      });
  };

  //get first categories from api
  const firstCategorys = async () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/firstCategory`,
      method: "GET",
      header: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setFirstCategory(res.data);
      })
      .catch((err) => {
        console.log("first category Api call error");
      });
  };
  //get second categories from api
  const secondCategorys = async () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/secondCategory`,
      method: "GET",
      header: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setSecondCategory(res.data);
        console.log("second category Api call", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get second categories from api
  const thirdCategorys = async () => {
    axios({
      url: `${EXPO_PUBLIC_BASE_URL}/api/thirdCategory`,
      method: "GET",
      header: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setThirdCategory(res.data);
        // console.log(response)
      })
      .catch((error) => {
        console.log("second category Api call error");
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {/* <View style={styles.topView}>
            <Image source={IMAGES[index]} style={styles.topView} />

            <View style={styles.categoryView}>
              {list.map((item, index) => {
                return (
                  <TouchableOpacity style={styles.categoryTab} key={item.id}>
                    <Text style={styles.categoryText}>{item.name ? item.name : "Loading .."}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View> */}
          <View style={styles.header}>
            <Image
              source={require("../img/logo/loginlogo.png")}
              style={styles.headerLogo}
            />
            <View style={styles.rightHeader}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SelectUser");
                }}
              >
                <Image
                  source={require("../img/logo/1.jpg")}
                  style={styles.rightHeaderIcon}
                />
                <Text style={{ color: "white", textTransform: "capitalize" }}>
                  {name ? name : "Loading .."}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <View>
              <ActivityIndicator color={"#24e566"} size={"large"} />
            </View>
          ) : (
            <View style={styles.secondView}>
              <View style={{ marginTop: 5 }}>
                <Text style={[styles.customTitle, { marginTop: 20 }]}>
                  {thirdCategory.name ? thirdCategory.name : "Loading ..."}
                </Text>
                <FlatList
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                  data={videoList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.trendingVideoItem}
                        onPress={() => {
                          navigation.navigate("VideoDetail", {
                            videoId: item.id,
                          });
                        }}
                      >
                        <Image
                          source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${item.thumbnail}` }}
                          style={{ width: 150, height: 170, borderRadius: 10 }}
                        />

                        <View style={styles.nextWatchView}>
                          <Text
                            style={{
                              color: "gold",
                              textTransform: "capitalize",
                              fontWeight: "slim",
                              fontSize: 13,
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>

                        <View style={styles.nextWatchViewPlayImage}>
                          <Image
                            source={require("../img/logo/video.png")}
                            style={{
                              width: 70,
                              height: 70,
                              tintColor: "khaki",
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.customTitle}>
                  {secondCategory.name ? secondCategory.name : "Loading ..."}
                </Text>

                <FlatList
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                  data={videoListByRating}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.trendingVideoItem}
                        onPress={() => {
                          navigation.navigate("VideoDetail", {
                            videoId: item.id,
                          });
                        }}
                      >
                        <Image
                          source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${item.thumbnail}` }}
                          style={styles.trendingVideoItemImage}
                        />

                        <View style={styles.videoLabel}>
                          <Text style={styles.videoLabelText}>
                            {item.catName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={{ marginTop: 5, marginBottom: 100 }}>
                <Text style={styles.customTitle}>
                  {firstCategory.name ? firstCategory.name : "Loading ..."}
                </Text>
                <FlatList
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                  data={videoListByCategory}
                  horizontal
                  renderItem={({ item, image }) => {
                    return (
                      <TouchableOpacity
                        style={styles.trendingVideoItem}
                        onPress={() => {
                          navigation.navigate("VideoDetail", {
                            videoId: item.id,
                          });
                        }}
                      >
                        <Image
                          source={{ uri: `${EXPO_PUBLIC_BASE_URL}/${item.thumbnail}` }}
                          style={styles.trendingVideoItemImage}
                        />
                        <View style={styles.videoLabel}>
                          <Text style={styles.videoLabelText}>
                            {item.catName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "black",
    height: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  downloadText: {
    color: "white",
  },
  headerLogo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginLeft: 10,
    color: "white",
  },
  rightHeader: {
    // flexDirection: 'row',
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  rightHeaderIcon: {
    marginLeft: 15,
    marginBottom: 5,
    height: 30,
    width: 30,
  },
  topView: {
    width: "100%",
    // height: 520,
    position: "absolute",
    top: 0,
    justifyContent: "center",
  },
  categoryView: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-around",
    // marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.7)", // add a dark transparent background
    padding: 10,
    fontSize: 18,
  },
  categoryTab: {
    backgroundColor: "#434343",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 30,
  },
  categoryText: {
    color: "gold",
    fontWeight: "900",
    fontSize: 13,
  },
  topViewBottomView: {
    position: "absolute",
    bottom: 10,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottom1: {
    width: "45%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom1Icon: {
    width: 30,
    height: 30,
    tintColor: "teal",
  },
  bottom1Text: {
    color: "teal",
    fontSize: 16,
    marginTop: 5,
  },
  playButton: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    gap: 900,
    width: 100,
    height: 50,
    marginLeft: 10,
  },
  playIcon: {
    width: 35,
    height: 35,
    marginBottom: 3,
    tintColor: "teal",
  },
  customTitle: {
    color: "teal",
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 10,
    marginTop: 10,
  },
  secondView: {
    // marginTop: 20,
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
    backgroundColor: "teal",
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
  },
  videoLabelText: {
    color: "khaki",
    fontSize: 9,
  },
  nextWatchView: {
    width: "100%",
    height: 40,
    backgroundColor: "#0a0a0a",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  nextWatchViewPlayImage: {
    width: "100%",
    height: 280,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
