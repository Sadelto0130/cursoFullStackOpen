import React, { useEffect } from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@apollo/client'
import { useRouter } from 'expo-router'
import AppBarTab from './AppBarTab'
import { useSignOut } from '../hooks/useSignOut.js'
import { ME_USER } from '../graphql/queries.js'

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
  const { data, loading} = useQuery(ME_USER);
  const signOut = useSignOut()
  const router = useRouter()

  const user = data?.me;

  const handleSignOut = async() => {
    await signOut()
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <AppBarTab title="Repositories" onPress={()=>router.push("/repositories")}/>
          {!loading && user ? (
            <>
              <AppBarTab title="Create Review" onPress={()=>router.push("/create_review")}/>
              <AppBarTab title="Sign Out" onPress={handleSignOut}/>
            </>
            ) : (
              <>
                <AppBarTab title="Sign In" onPress={()=>router.push("/signin")}/>
                <AppBarTab title="Sign up" onPress={()=>router.push("/signup")}/>
              </>
            )
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AppBar