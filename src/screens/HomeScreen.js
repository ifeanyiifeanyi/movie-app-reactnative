import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import Home from '../tabs/Home'
import New from '../tabs/New'
import Latest from '../tabs/Latest'
import Search from '../tabs/Search'
import Downloads from '../tabs/Downloads'


const HomeScreen = () => {
  const [selectedBottomItem, setSelectedBottomItem] = useState(0);
  return (
    <View style={styles.container}>
    {
      selectedBottomItem == 0 ? (<Home />)    : 
      selectedBottomItem == 1 ? (<New />)     :
      selectedBottomItem == 2 ? (<Latest />)  : 
      selectedBottomItem == 3 ? (<Search />)  : (<Downloads />)

    }
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.bottomNavigationCard} onPress={() => {
          setSelectedBottomItem(0)
          }}>
          <Image 
            source={ selectedBottomItem == 0 ?
              require('../img/logo/home.png') : require('../img/logo/home1.png')
            } 
            style={selectedBottomItem == 0 ? styles.bottomNavigationCardImageActive : styles.bottomNavigationCardImage} 
          />
          <Text style={styles.bottomNavigationCardText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavigationCard} onPress={() => {
          setSelectedBottomItem(1)
        }}>
          <Image 
            source={ selectedBottomItem == 1 ? 
              require('../img/logo/history.png') : require('../img/logo/medical-report.png')
            } 
            style={selectedBottomItem == 1 ? styles.bottomNavigationCardImageActive : styles.bottomNavigationCardImage}  />
          <Text style={styles.bottomNavigationCardText}>New & Hot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavigationCard} onPress={() => {
          setSelectedBottomItem(2)
        }}>
          <Image 
            source={
              selectedBottomItem == 2 ?
              require('../img/logo/play-button.png') : require('../img/logo/library.png')
            } 
            style={selectedBottomItem == 2 ? styles.bottomNavigationCardImageActive : styles.bottomNavigationCardImage}  
          />
          <Text style={styles.bottomNavigationCardText}>Life Style</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavigationCard} onPress={() => {
          setSelectedBottomItem(3)
        }}>
          <Image 
            source={ selectedBottomItem == 3 ? 
              require('../img/logo/search.png') : require('../img/logo/loupe.png')
            } 
            style={selectedBottomItem == 3 ? styles.bottomNavigationCardImageActive : styles.bottomNavigationCardImage}  
            />
          <Text style={styles.bottomNavigationCardText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavigationCard} onPress={() => {
          setSelectedBottomItem(4)
        }}>
          <Image 
            source={ selectedBottomItem == 4 ?
              require('../img/logo/download.png') : require('../img/logo/download1.png')
            } 
            style={selectedBottomItem == 4 ? styles.bottomNavigationCardImageActive : styles.bottomNavigationCardImage}  
          />
          <Text style={styles.bottomNavigationCardText}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
  },
  bottomNavigation:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    height: 65,
    bottom: 0,
    backgroundColor: '#000'
  },
  bottomNavigationCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  bottomNavigationCardImage: {
    width: 30,
    height: 30,
    boxSizing: 'content-box',
    tintColor: 'teal'
  },
  bottomNavigationCardImageActive: {
    width: 30,
    height: 30,
    boxSizing: 'content-box',
    tintColor: 'white'
  },
  bottomNavigationCardText:{
    color: 'teal',
    marginTop: 5,
    fontSize: 10,
    opacity: 0.6,
  },
  bottomNavigationCardTextActive:{
    color: 'white',
    marginTop: 5,
    fontSize: 10,
    fontWeight: 900,
  }
})