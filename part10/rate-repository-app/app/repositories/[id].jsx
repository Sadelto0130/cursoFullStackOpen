import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RepositoryDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Repo ID: {id}
      </Text>
    </View>
  );
}
