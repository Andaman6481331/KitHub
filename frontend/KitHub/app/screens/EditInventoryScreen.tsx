import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function EditInventoryScreen(){
    return(
        <SafeAreaView>
            <Text>This is EditInventoryScreen</Text>
            <Button title="Go Back" onPress={() => router.back()} />
        </SafeAreaView>
    )
}