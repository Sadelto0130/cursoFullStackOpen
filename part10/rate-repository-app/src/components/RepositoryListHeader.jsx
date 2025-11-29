import React from 'react'
import { Menu, Divider, Searchbar} from 'react-native-paper';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  headerContainer: {
    marginBottom: 6,
    paddingHorizontal: 8,
    zIndex: 10
  },
  selectorButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  selectorText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

const RepositoryListHeader = ({
  search,
  setSearch,
  order,
  setOrder,
  menuVisible,
  setMenuVisible,
}) => {
  return (
      <View style={styles.headerContainer}>
        <Searchbar
          placeholder="Search repositories..."
          value={search}
          onChangeText={setSearch}
          style={{ marginBottom: 12 }}
        />

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.selectorButton}
            >
              <Text style={styles.selectorText}>
                {order === "LATEST" && "Latest repositories ▾"}
                {order === "HIGHEST_RATED" && "Highest rated repositories ▾"}
                {order === "LOWEST_RATED" && "Lowest rated repositories ▾"}
              </Text>
            </TouchableOpacity>
          }
          contentStyle={{ backgroundColor: "white", borderRadius: 8 }}
        >
          <Menu.Item
            onPress={() => {
              setOrder("LATEST");
              setMenuVisible(false);
            }}
            title="Latest repositories"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setOrder("HIGHEST_RATED");
              setMenuVisible(false);
            }}
            title="Highest rated repositories"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setOrder("LOWEST_RATED");
              setMenuVisible(false);
            }}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    )
}

export default RepositoryListHeader