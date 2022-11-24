import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Latest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.downloadText}>Latest</Text>
    </View>
  )
}

export default Latest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadText:{
    color: 'white',
  }
})