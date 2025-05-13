import React from 'react';
import { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const JournalForm = ({ initialData, onSubmit }) => {
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || 'breakfast');
  const [image, setImage] = useState(initialData?.image || null);

  useEffect(() => {
    if (initialData?.image) {
      setImage(initialData.image);
    }
  }, [initialData?.image]);

  const handleSubmit = () => {
    onSubmit({
      description,
      category,
      image,
      date: new Date().toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={styles.preview} />
      )}

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe your meal..."  
        multiline
      />

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Breakfast" value="Breakfast" />  
        <Picker.Item label="Lunch" value="Lunch" />          
        <Picker.Item label="Dinner" value="Dinner" />       
        <Picker.Item label="Snack" value="Snack" />          
      </Picker>

      <Button title="Save" onPress={handleSubmit} />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  picker: {
    marginBottom: 20,
  },
});

export default JournalForm;