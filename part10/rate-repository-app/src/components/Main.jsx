import Constants from 'expo-constants';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8', 
    width: '100%',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingBottom: 10,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  )
}

export default Main;