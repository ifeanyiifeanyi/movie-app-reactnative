import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Downloads = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.downloadText}>Downloads</Text>
    </View>
  )
}

export default Downloads

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