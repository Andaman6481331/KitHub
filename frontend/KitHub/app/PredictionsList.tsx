import { useLocalSearchParams } from "expo-router";
import { View, Text , StyleSheet, TouchableOpacity} from "react-native";

type Prediction = {
  label: string;
  confidence: number;
};

export default function PredictionsList() {
  const { predictions } = useLocalSearchParams();

//   console.log("Received predictions param:", predictions);

  const parsedPredictions: Prediction[] = predictions
    ? JSON.parse(predictions as string)
    : [];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Top Predictions
      </Text>

      {parsedPredictions.map((p: Prediction, i: number) => (
        <View>
            <TouchableOpacity style={styles.box}>
                <Text key={i} style={styles.text}>
                    {i + 1}. {p.label} — {p.confidence}
                </Text>
                
            </TouchableOpacity>
        </View>
        
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    text: { fontSize: 24, fontWeight: 'bold', color: 'black' },
    box: {
        height: 100,
        aspectRatio: 1,
        backgroundColor: "#B87C4C",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    boxText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
