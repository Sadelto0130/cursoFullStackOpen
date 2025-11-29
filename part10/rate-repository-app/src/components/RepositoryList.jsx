import { useCallback, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useDebounce } from "use-debounce";
import RepositoryItem from "./RepositoryItem";
import { useRepositories } from "../hooks/useRepositories";
import RepositoryListHeader from "./RepositoryListHeader";

const styles = StyleSheet.create({
  separator: {height: 8}
})

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryList = () => {
  const[order, setOrder] = useState("LATEST")
  const [menuVisible, setMenuVisible] = useState(false)
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const getOrderVariables = (order) => {
    switch (order) {
      case "HIGHEST_RATED":
        return {orderBy: "RATING_AVERAGE", orderDirection: "DESC"};
      case "LOWEST_RATED":
        return {orderBy: "RATING_AVERAGE", orderDirection: "ASC"}
      case "LATEST":
      default:
        return {orderBy: "CREATED_AT", orderDirection: "DESC"}    
        break;
    }
  }

  const variables = {
    ...getOrderVariables(order),
    searchKeyword: debouncedSearch
  }

  const { repositories, loading, error } = useRepositories(variables);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <FlatList 
      data={repositories}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({item}) => <RepositoryItem item={item} />}
      ListHeaderComponent={
        <RepositoryListHeader
          search={search}
          setSearch={setSearch}
          order={order}
          setOrder={setOrder}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
        />
      }
    />
  )
}

export default RepositoryList;