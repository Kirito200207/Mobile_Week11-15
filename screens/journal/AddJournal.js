import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import JournalForm from '../../components/journal/JournalForm';
import CameraComponent from '../../components/camera/CameraComponent';
import { executeSql } from '../../components/database/database';

const AddJournal = ({ route, navigation }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);
  const { userId } = route.params;

  const compressImage = async (uri) => {
    try {
      const compressedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return compressedImage.uri;
    } catch (error) {
      console.error('Image compression failed:', error); 
      return uri; 
    }
  };

  const pickImage = async () => {
    try {
      // Request media library permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Error', 'Need album access permission to select images');  
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1, 
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const compressedUri = await compressImage(result.assets[0].uri);
        setImage(compressedUri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image: ' + error.message);  
    }
  };

  const handleSubmit = async (journalData) => {
    try {
      if (!image && !journalData.image) {
        Alert.alert('Notice', 'Please add an image first');  
        return;
      }

      await executeSql(
        'INSERT INTO journals (userId, image, description, category, date) VALUES (?, ?, ?, ?, ?)',
        [userId, image || journalData.image, journalData.description, journalData.category, journalData.date]
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Save failed, please try again');  
    }
  };

  return (
    <View style={styles.container}>
      {/* Button container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowCamera(true)}>
          <Text style={styles.buttonText}>Take Photo</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>  
        </TouchableOpacity>
      </View>

      {/* Conditional rendering: Show camera component when showCamera is true */}
      {showCamera && (
        <CameraComponent 
          onPictureTaken={(uri) => {
            setImage(uri);       
            setShowCamera(false); 
          }}
        />
      )}

      {/* Journal form */}
      <JournalForm
        initialData={{ image }}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',      
    justifyContent: 'center',  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',        
  },
});

export default AddJournal;