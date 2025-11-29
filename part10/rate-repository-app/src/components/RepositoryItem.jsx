import React from 'react'
import { Text, StyleSheet, View, Image, Pressable, Button, Linking } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
  },

  topRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 16,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },

  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: "#0366d6",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 16,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 12,
    color: "#555",
  },
});

const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return String(num);
};

const RepositoryItem = ({item, showGitHubButton}) => {
  const { id } = useLocalSearchParams();
  
  return (
    <View style={{paddingBottom: 10}}>
      <Pressable onPress={() => router.push(`/repositories/${item.id}`)}>
        <View style={styles.card}>

          <View style={styles.topRow}>
            <Image source={{uri: item.ownerAvatarUrl}} style={styles.avatar}/>

            <View style={styles.info}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.languageTag}>{item.language}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatNumber(item.stargazersCount)}</Text>
              <Text style={styles.statLabel}>Stars</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatNumber(item.forksCount)}</Text>
              <Text style={styles.statLabel}>Forks</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatNumber(item.reviewCount)}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatNumber(item.ratingAverage)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {showGitHubButton  && 
            <Button 
              title='Open in Github'
              onPress={() => Linking.openURL(item.url)}
            />
          }
        </View>
      </Pressable>
    </View>
  )
}

export default RepositoryItem