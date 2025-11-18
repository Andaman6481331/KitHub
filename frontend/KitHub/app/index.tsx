// import React from 'react';
// import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { DrawerNavigationProp } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import InventoryDetail from './screens/InventoryDetail';

// // Type definitions
// type StackParamList = {
//   Home: undefined;
//   Camera: undefined;
//   Settings: undefined;
//   EditInventory: undefined;
//   InventoryDetail: { item: { id: string; name: string } };
// };

// type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>
// export default function HomeScreen(){
//   const navigation = useNavigation<HomeScreenNavigationProp>();

//   const inventory = [
//     { id: '1', name: 'Item 1' },
//     { id: '2', name: 'Item 2' },
//     { id: '3', name: 'Item 3' },
//   ];

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/* Top buttons */}
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
//         <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
//         <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
//         <Button title="Edit Inventory" onPress={() => navigation.navigate('EditInventory')} />
//       </View>

//       {/* Middle inventory list */}
//       <FlatList
//         data={inventory}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={{ padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}
//             onPress={() => navigation.navigate("InventoryDetail", {item})}
//           >
//             <Text>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />

//     </SafeAreaView>
//   );
// };


import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function HomeScreen() {
  const inventory = [
    { id: "sku001", name: "Item 1" },
    { id: "sku002", name: "Item 2" },
    { id: "sku003", name: "Item 3" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
        <Button title="Settings" onPress={() => router.push("/SettingsScreen")} />
        <Button title="Camera" onPress={() => router.push("/CameraScreen")} />
        <Button title="Edit Inventory" onPress={() => router.push("/screens/EditInventoryScreen")} />
      </View>

      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 20, borderBottomWidth: 1, borderColor: "#ccc" }}
            onPress={() => router.push(`/Inventory/${item.id}`)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
