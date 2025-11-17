import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen() {

   console.log("App running");

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.40:8000/items/")   //truehomewifi
    // fetch("http://192.168.1.83:8000/items/")      //kitwifi
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from backend:", data);
        setItems(data.items);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24 }}>Details Page</Text>
    <Text>Open up App.js to start working on your app!</Text>
      <Text>Hi herby</Text> 
      <Button
        title = "Click Me"
        onPress={() => Alert.alert("My title", "My message", [
          {text: "Yes", onPress:() => console.log("Yes")},
          {text: "No", onPress:() => console.log("No")}
        ])}/>
      <Text>Data from backend: </Text>
      {items.map((item, index) => (
      <Text key={index}>{JSON.stringify(item)}</Text>
      ))}
      <StatusBar style="auto" />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});