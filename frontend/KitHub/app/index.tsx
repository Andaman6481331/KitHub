import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";

export default function index() {
  const inventory = [
    { id: "sku001", name: "Item 1" },
    { id: "sku002", name: "Item 2" },
    { id: "sku003", name: "Item 3" },
  ];

  return (
    <View style={{ flex: 1 }}>

      <Text style={styles.Title}>My Inventory</Text>

      <FlatList
        // style={{backgroundColor:"#B87C4C"}}
        data={inventory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 20, borderBottomWidth: 1, borderColor: "#ccc", backgroundColor:"#B87C4C" }}
            onPress={() => router.push(`/Inventory/${item.id}`)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Title: {
    fontSize: 30,
    fontWeight: "bold"
  }
})