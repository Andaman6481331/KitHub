import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen(){
    const navigate = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1}}>
        <Text style={{ fontSize: 24, alignSelf:"center"}}>Settings</Text>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigate.goBack()}>
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
