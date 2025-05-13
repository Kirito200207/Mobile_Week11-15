import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import JournalList from '../../components/journal/JournalList';
import { executeSql } from '../../components/database/database';

const CategoryView = ({ route }) => {
  const [category, setCategory] = useState('All');  
  const [journals, setJournals] = useState([]);
  const { userId } = route.params;

  useEffect(() => {
    loadJournalsByCategory();
  }, [category]);

  const loadJournalsByCategory = async () => {
    try {
      const query = category === 'All'  
        ? 'SELECT * FROM journals WHERE userId = ?'
        : 'SELECT * FROM journals WHERE userId = ? AND category = ?';
      const params = category === 'All' ? [userId] : [userId, category];  

      const result = await executeSql(query, params);
      const items = Array.from({ length: result.rows.length }, (_, i) =>
        result.rows.item(i)
      );
      setJournals(items);
    } catch (error) {
      console.error('Failed to load category journals:', error); 
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item label="All" value="All" />  
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Snack" value="Snack" />
      </Picker>
      <JournalList journals={journals} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default CategoryView;