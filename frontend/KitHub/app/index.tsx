import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import React, { useState } from "react";

interface InventoryItem {
  id: string;
  name: string;
}

export default function index() {
  // const inventory = [
  //   { id: "sku001", name: "Item 1" },
  //   { id: "sku002", name: "Item 2" },
  //   { id: "sku003", name: "Item 3" },
  // ];
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "sku001", name: "Item 1" },
    { id: "sku002", name: "Item 2" },
    { id: "sku003", name: "Item 3" },
  ]);

 // Delete item
  const deleteItem = (id: string) => {
    setInventory((prev) => prev.filter((x) => x.id !== id));
  };

  // Edit item name
  const editItem = (item: InventoryItem) => {
    Alert.prompt(
      "Edit Name",
      "Enter new item name",
      (newName: string) => {
        if (!newName) return;
        setInventory((prev) =>
          prev.map((x) => (x.id === item.id ? { ...x, name: newName } : x))
        );
      },
      "plain-text",
      item.name
    );
  };

  // Right actions for swipe
  const renderRightActions = (item: InventoryItem) => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={[styles.actionButton, styles.edit]} onPress={() => editItem(item)}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionButton, styles.delete]} onPress={() => deleteItem(item.id)}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={inventory}
        keyExtractor={(item) => (item.id)}
        renderItem={({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/Inventory/${item.id}`)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        </Swipeable>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  Title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#B87C4C",
  },
  itemText: { color: "white", fontSize: 18 },
  actionsContainer: {
    flexDirection: "row",
    width: 150,
    justifyContent: "flex-end",
  },
  actionButton: {
    width: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  edit: { backgroundColor: "#4CAF50" },
  delete: { backgroundColor: "#F44336" },
  actionText: { color: "white", fontWeight: "bold" },
});