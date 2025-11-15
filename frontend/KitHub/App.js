import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log("App running");

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.40:8000/items/")
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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hi this is the change</Text>
      
      <Text>Data from backend:</Text>
      {items.map((item, index) => (
        <Text key={index}>{JSON.stringify(item)}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#299af7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
