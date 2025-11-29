import { useLocalSearchParams } from "expo-router";
import RepositoryItem from "../../src/components/RepositoryItem.jsx";
import { useRepositories, useRepository} from '../../src/hooks/useRepositories.js';
import { FlatList, Text, View } from "react-native";
import ReviewItem from "../../src/components/ReviewItem.jsx";

export default function RepositoryDetails() {
  const { id } = useLocalSearchParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar repositorio</Text>;
  if (!repository) return <Text>Repositorio no encontrado</Text>;

  const reviews = repository.reviews?.edges.map(e => e.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={
        <RepositoryItem item={repository} showGitHubButton />
      }
      contentContainerStyle={{ 
        paddingBottom: 20 
      }}
    />
  );
}


export const unstable_settings = {
  headerShown: false,
};
