import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_TOKEN_KEY = "accessToken";

export const authStorage = { 
   setAccessToken: async(accessToken) => {
    try {
      const tokenValue = JSON.stringify(accessToken)
      await AsyncStorage.setItem('token', tokenValue)
    } catch (error) {
      console.log(error)
    }
  },
  
  getAccessToken: async() => {
    try {
      const token = await AsyncStorage.getItem('token')
      return token !== null ? JSON.parse(token) : null
    } catch (error) {
      console.log(error)
    }
  },
  
  removeAccessToken: async() => {
    try {
      await AsyncStorage.removeItem('token')
    } catch (error) {
      console.error(error)
    }
  }
}