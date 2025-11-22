import { Stack } from "expo-router";
import { Button,Alert, TouchableOpacity, View, Image} from 'react-native';
import {router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack
      // screenOptions={{headerShown:false}}
        screenOptions={({ route }) => {
          if (route.name === "index") {
            return {
              headerTitle: "Kitcharoen", 
              headerStyle: { backgroundColor: "#EFE9E3"},
              headerTintColor: "#3e2301ff",
              headerTitleStyle: { fontSize: 25, fontWeight: "bold" },
              headerBackVisible: false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.push("/SettingsScreen")} style={{ marginRight: 10 }}>
                  <Image
                    source={require("../assets/icons/settings.png")}
                    style={{ width: 24, height: 24 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => router.push("/CameraScreen")} style={{ marginRight: 10 }}>
                  <Image
                    source={require("../assets/icons/camera.png")}
                    style={{ width: 24, height: 24 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
            };
          }
          if (route.name === "CameraScreen") {
            return {
              headerTitle: "Camera",
              headerStyle: { backgroundColor: "#EFE9E3"},
              headerTintColor: "#3e2301ff",
              headerTitleStyle: { fontSize: 25, fontWeight: "bold" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                  <Image
                    source={require("../assets/icons/menu-burger.png")}
                    style={{ width: 24, height: 24 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
            };
          }
          if (route.name === "SettingsScreen") {
            return {
              headerTitle: "Setting",
              headerStyle: { backgroundColor: "#EFE9E3"},
              headerTintColor: "#3e2301ff",
              headerTitleStyle: { fontSize: 25, fontWeight: "bold" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                  <Image
                    source={require("../assets/icons/menu-burger.png")}
                    style={{ width: 24, height: 24 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
            };
          }
          if (route.name === "Inventory/[id]") {
            return {
              headerTitle: "Inventory" 
            };
          }          
          return { headerStyle: { backgroundColor: "red" } };
        }}
      screenLayout={(props) => (
        <View style={{ flex: 1, backgroundColor: '#F9F8F6' }}>
          {props.children}
        </View>
      )}
    />
    </GestureHandlerRootView>
  );
}
