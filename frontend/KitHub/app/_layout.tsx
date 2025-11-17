// import React from 'react';
// import { Button, View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeScreen from './HomeScreen';
// import DetailsScreen from './DetailsScreen';
// import SettingsScreen from './SettingsScreen';
// import CameraScreen from './CameraScreen';

// export type RootStackParamList = {
//   Home: undefined;
//   Details: undefined;
//   Settings: undefined;
//   Camera: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function Layout() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={({ navigation }) => ({
//           title: 'Home',
//           headerRight: () => (
//             <View style={{ flexDirection: 'row' }}>
//               <Button
//                 title="Settings"
//                 onPress={() => navigation.navigate('Settings')}
//               />
//               <Button
//                 title="Camera"
//                 onPress={() => navigation.navigate('Camera')}
//               />
//             </View>
//           ),
//         })}
//       />
//       <Stack.Screen name="Details" component={DetailsScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//       <Stack.Screen name="Camera" component={CameraScreen} />
//     </Stack.Navigator>
//   );
// }

//=================================

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';

import HomeScreen from './HomeScreen';
import StockScreen from './StockScreen';
import SettingsScreen from './SettingsScreen';
import CameraScreen from './CameraScreen';


export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Settings: undefined;
  Camera: undefined;
  Stock: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function PermissionsScreen({ onGranted }: { onGranted?: () => void }) {
  const [status, setStatus] = useState<'undetermined' | 'granted' | 'denied' | null>(null);

  useEffect(() => {
  Camera.getCameraPermissionsAsync().then(res => {
    setStatus(res.granted ? 'granted' : 'denied');
    if (res.granted && onGranted) onGranted();
  });
}, []);


  const ask = async () => {
    const res = await Camera.requestCameraPermissionsAsync();
    setStatus(res.granted ? 'granted' : 'denied');
    if (res.granted && onGranted) onGranted(); // ✅ only call if defined
  };


  if (status === 'undetermined' || status === null) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Checking camera permissions …</Text>
    </View>
  );
}

if (status === 'denied') {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Need camera permission</Text>
      <Button title="Grant Permission" onPress={ask} />
    </View>
  );
}
if (status === 'granted') {
  console.log("permission granted");
  return (
  <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Button
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
              />
              <Button
                title="Stock"
                onPress={() => navigation.navigate('Stock')}
              />
              <Button
                title="Camera"
                onPress={() => navigation.navigate('Camera')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="Stock" component={StockScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
  </Stack.Navigator>
)}
}
