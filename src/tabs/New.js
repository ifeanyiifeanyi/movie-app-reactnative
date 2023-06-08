import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from '@env';
import * as Device from 'expo-device'
import { useNavigation } from '@react-navigation/native'

const New = () => {
  const navigation = useNavigation();

  const [searchInput, setSearchInput] = useState('');
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/blog`)
      .then((res) => res.json())
      .then((res) => {
        setBlog(res)
        console.log(blog)
      })
  }, [])


  return (
    <View style={styles.mainView}>
      <Text style={styles.Heading}>Teachings {'\n'}of the Holy Catholic Church</Text>
      {/*       
      <View style={styles.saechInputView}>
        <TextInput value={searchInput} style={styles.searchText} onChangeText={(val) => setSearchInput(val)} placeholder='Enter Search Text' />
      </View> */}


      <View style={styles.postView}>
        {
          blog.length < 1 ?
            <ActivityIndicator size={'large'} color={'#2f88f0'} />
            :
            <FlatList
              data={blog}
              keyExtractor={(item, index) => { return item.id.toFixed() }}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => { navigation.navigate('BlogContent', { item }) }}>
                  <View style={styles.blogView}>
                    <View style={styles.postTitle}>
                      <View style={styles.imageView}>
                        <Image style={styles.authorImage} source={require('../img/logo/1.jpg')} />
                        <View style={styles.titleView}>
                          <Text style={styles.post_title}>{item.title}</Text>
                          <Text style={styles.author_name}>{item.author}</Text>
                        </View>
                      </View>
                      <View>
                        <Text>{item.views}</Text>
                      </View>
                      <View>
                        <TouchableOpacity>
                        
                          <Image style={{ width: 20, height: 20, color: '#fff' }} source={require('../img/logo/option.png')} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>

                    </View>
                    
                    <Image style={styles.blogBanner} source={{ uri: `${BASE_URL}/${item.thumbnail}` }} />
                  </View>
                </TouchableOpacity>
              )}
            />
        }
      </View>


    </View>
  )
}

export default New

const styles = StyleSheet.create({
  author_name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dcdcdc',
  },
  blogBanner: {
    width: '100%',
    height: 400,
    // height: '100%',
    objectFit: 'cover',
    marginTop: 20,
    // borderRadius: 10
  },
  post_title: {
    fontSize: 11,
    color: '#d4d4d4'
  },
  titleView: {
    marginLeft: 9
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
  },
  Heading: {
    // textAlign: 'center',
    color: 'white',
    fontSize: 25,
    marginTop: 30,
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#79480Df2',
    textTransform: 'uppercase'
  },
  searchText: {
    height: 69,
    width: '90%',
    backgroundColor: '#f0f0f0',
    marginTop: 25,
    marginBottom: 35,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,

  },
  saechInputView: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  postView: {
    width: '90%',
    height: '72%',
    // padding: 20
    // marginBottom: 150
  },
  blogView: {
    backgroundColor: '#3D72A4',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    // paddingBottom: 10,
    borderRadius: 10,
  },
  postTitle: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})