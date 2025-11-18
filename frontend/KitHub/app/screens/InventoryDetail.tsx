import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function InventoryDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Inventory ID: {id}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
