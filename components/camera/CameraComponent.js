import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

const CameraComponent = ({ onPictureTaken }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();

        // Compress image
        const compressedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 1024 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        onPictureTaken(compressedImage.uri);
      } catch (error) {
        console.error('Failed to take photo or compress:', error);  
      }
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No camera access permission</Text>  
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>  
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        ref={cameraRef}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Take Photo</Text>  
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default CameraComponent;