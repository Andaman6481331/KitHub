import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InventoryDetail() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Inventory ID: {id}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </SafeAreaView>
  );
}
