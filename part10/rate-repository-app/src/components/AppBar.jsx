import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,

  },
  safe: {
    backgroundColor: "#24292e", 
  },
  scrollContent: {
    paddingHorizontal: 16, 
    alignItems: "center",
  }, 
})

const AppBar = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <AppBarTab title="Repositories" path="/repositories"/>
          <AppBarTab title="Sign In" path="/signin"/>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AppBar