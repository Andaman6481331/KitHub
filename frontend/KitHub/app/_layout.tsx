import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { router, Stack } from "expo-router";

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="CameraScreen" options={{ presentation: "modal" }} />
      <Stack.Screen name="SettingsScreen" options={{ presentation: "modal" }} />
      <Stack.Screen name="screens/EditInventoryScreen" />
      <Stack.Screen name="Inventory/[id]" />
    </Stack>
  )}
}
