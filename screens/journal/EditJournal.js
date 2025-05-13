import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import JournalForm from '../../components/journal/JournalForm';
import { executeSql } from '../../components/database/database';

const EditJournal = ({ route, navigation }) => {
  const { journal } = route.params;

  const handleSubmit = async (updatedData) => {
    try {
      await executeSql(
        'UPDATE journals SET image = ?, description = ?, category = ?, date = ? WHERE id = ?',
        [updatedData.image, updatedData.description, updatedData.category, updatedData.date, journal.id]
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Update failed, please try again');  
    }
  };

  return (
    <View style={styles.container}>
      <JournalForm initialData={journal} onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default EditJournal;