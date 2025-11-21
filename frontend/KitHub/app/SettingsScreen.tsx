import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {router } from "expo-router";

export default function SettingsScreen(){
  return (
    <SafeAreaView style={{ flex: 1}}>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                <Text style={styles.text}>Confirm</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 64,
    justifyContent: 'center',
  },
  button: { alignItems: 'center' },
  text: { fontSize: 20, color: 'Black' }
})
