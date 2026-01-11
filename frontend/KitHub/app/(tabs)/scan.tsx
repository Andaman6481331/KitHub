import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Zap, Package } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanLineAnim.setValue(0);
    }
  }, [isScanning]);

  const handleCapture = () => {
    setIsScanning(true);

    // Simulate scanning process
    let currentConfidence = 0;
    const interval = setInterval(() => {
      currentConfidence += 15;
      setConfidence(currentConfidence);

      if (currentConfidence >= 95) {
        clearInterval(interval);
        setTimeout(() => {
          router.push({
            pathname: '/confirmation',
            params: {
              sku: 'SKU-2847-XL',
              name: 'Organic Coffee Beans',
              confidence: '95',
              category: 'Beverages'
            }
          });
        }, 500);
      }
    }, 150);
  };

  const getConfidenceColor = () => {
    if (confidence < 50) return '#A0522D';
    if (confidence < 80) return '#C4A05A';
    return '#6B8E6F';
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.permissionContainer}>
          <Camera color="#6B5D4F" size={64} />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to scan items
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.permissionButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>Scan Item</Text>
        <View style={styles.zapContainer}>
          <Zap color="#FFFFFF" size={20} />
        </View>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="back">
          {/* Scanning Frame Guide */}
          <View style={styles.frameContainer}>
            <View
              style={[
                styles.frame,
                {
                  borderColor: isScanning ? getConfidenceColor() : '#FFFFFF',
                  shadowColor: isScanning ? getConfidenceColor() : 'transparent',
                }
              ]}
            >
              {/* Corner Markers */}
              <View style={[styles.cornerTL, { borderColor: isScanning ? getConfidenceColor() : '#FFFFFF' }]} />
              <View style={[styles.cornerTR, { borderColor: isScanning ? getConfidenceColor() : '#FFFFFF' }]} />
              <View style={[styles.cornerBL, { borderColor: isScanning ? getConfidenceColor() : '#FFFFFF' }]} />
              <View style={[styles.cornerBR, { borderColor: isScanning ? getConfidenceColor() : '#FFFFFF' }]} />

              {/* Center Guide */}
              {!isScanning && (
                <View style={styles.centerGuide}>
                  <Package color="rgba(255, 255, 255, 0.8)" size={48} />
                  <Text style={styles.guideText}>Position item in frame</Text>
                </View>
              )}

              {/* Scanning Animation */}
              {isScanning && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{ translateY: scanLineTranslateY }],
                      backgroundColor: getConfidenceColor(),
                    }
                  ]}
                />
              )}
            </View>
          </View>

          {/* Confidence Indicator */}
          {isScanning && confidence > 0 && (
            <View style={styles.confidenceIndicator}>
              <View style={[styles.confidenceDot, { backgroundColor: getConfidenceColor() }]} />
              <Text style={styles.confidenceText}>
                Analyzing... {confidence}%
              </Text>
            </View>
          )}
        </CameraView>
      </View>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        <View style={styles.controlsContent}>
          <Text style={styles.controlsTitle}>
            {isScanning ? 'Processing image...' : 'Align item with frame'}
          </Text>
          <Text style={styles.controlsSubtitle}>
            Ensure good lighting for best results
          </Text>
        </View>

        {/* Capture Button */}
        <View style={styles.captureContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.captureButtonOuter,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleCapture}
            disabled={isScanning}
          >
            <View style={[
              styles.captureButtonInner,
              { backgroundColor: isScanning ? getConfidenceColor() : '#6B5D4F' }
            ]}>
              {isScanning ? (
                <View style={styles.spinner} />
              ) : (
                <Camera color="#FFFFFF" size={32} />
              )}
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2520',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#6B5D4F',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  zapContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B7355',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  frameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  frame: {
    width: '100%',
    maxWidth: 350,
    aspectRatio: 1,
    borderWidth: 4,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  cornerTL: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 32,
    height: 32,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 24,
  },
  cornerTR: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 32,
    height: 32,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 24,
  },
  cornerBL: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 32,
    height: 32,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 24,
  },
  cornerBR: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 24,
  },
  centerGuide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    opacity: 0.6,
  },
  confidenceIndicator: {
    position: 'absolute',
    top: 32,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 24,
  },
  confidenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  controls: {
    backgroundColor: '#3D3226',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  controlsContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  controlsTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  controlsSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  captureContainer: {
    alignItems: 'center',
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
    borderRadius: 12,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D3226',
    marginTop: 24,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 14,
    color: '#7A6F63',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6B5D4F',
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
