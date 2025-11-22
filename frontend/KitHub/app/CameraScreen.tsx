import { CameraView, useCameraPermissions, CameraType} from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, SafeAreaViewBase, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";
import * as ImageManipulator from "expo-image-manipulator";

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
        
        const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
        //assume the camera dimension are 16:9, then all constant are fixed as:
        const squareSize = screenWidth * 0.8;
        const xRatio = photo.width / screenWidth;
        const cropWidth = squareSize * xRatio;
        const WH = cropWidth*0.7;
        const cropped = await ImageManipulator.manipulateAsync(
          photo.uri,
          [
            {
              crop: {
                originX: screenWidth*0.2,
                originY: screenHeight*0.3,
                width: WH,
                height: WH,
              },
            },
          ],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        // console.log("Cropped saved → ", cropped.uri);

        setPhotoUri(cropped?.uri ?? null);
        // setPhotoUri(photo?.uri ?? null);
    }
  };
  const resetPhoto = () => setPhotoUri(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
        {photoUri ? (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: photoUri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                />
              </View>
              <TouchableOpacity style={styles.triggerBtn} onPress={resetPhoto}>
                <Image
                  source={require("../assets/icons/camera-viewfinder.png")}
                  style={{ width: 64, height: 64 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
        ) : (
        <View style={{ width: "100%", height:"100%" }}>
          <View style={{flex:1}}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={(ref) => setCameraRef(ref)}
            />
            <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", pointerEvents: "none",}}>
                <View style={{width: "80%", aspectRatio: 1, borderWidth: 3, borderColor: "white", borderRadius: 10}}/>
            </View>
          </View>
          <TouchableOpacity style={styles.triggerBtn} onPress={takePhoto}>
            <Image
              source={require("../assets/icons/circle.png")}
              style={{ width: 64, height: 64 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        )}
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
  triggerBtn: {
    // position: 'absolute',
    // bottom: 64,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 64,
    paddingTop: 24,
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