import { CameraView, useCameraPermissions, CameraType} from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, SafeAreaViewBase} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";

export default function CameraScreen() {
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async() => {
    if (!cameraRef){
        console.log("CameraRef do not Exist");
    } else {
        const photo = await cameraRef.takePictureAsync();
        console.log(photo.uri);
        setPhotoUri(photo?.uri ?? null);
    }
  };
  const resetPhoto = () => setPhotoUri(null);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Go Back" onPress={() => router.back()} />
        {photoUri ? (
            <View style={{ flex: 1 }}>
            <Image
                source={{ uri: photoUri }}
                style={{ width: "100%", height: "90%" }}
                resizeMode="contain"
            />

            <Button title="Retake" onPress={resetPhoto} />
            </View>
        ) : (
        <View style={{ width: "100%", height:"80%" }}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={(ref) => setCameraRef(ref)}
            />
            <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", pointerEvents: "none",}}>
                <View
                    style={{
                    width: "80%",
                    aspectRatio: 1,
                    borderWidth: 3,
                    borderColor: "white",
                    borderRadius: 10,
                    }}
                />
            </View>
        </View>
        )}
      {<Button
        title="Take Photo"
        onPress={takePhoto}
      />
        }
                  <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
           <Text style={styles.text}>Flip Camera</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { 
    flex: 1,
    width:"100%",
    aspectRatio:1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 64,
    justifyContent: 'center',
  },
  button: { alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  camSquareArea:{
    position:"absolute",
    width:1080,
    height:1080,
    marginTop:'auto',
    marginLeft:'auto'
  }
});