import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const New = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.downloadText}>New</Text>
    </View>
  )
}

export default New

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