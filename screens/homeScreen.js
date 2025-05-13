import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import JournalList from '../components/journal/JournalList';
import { executeSql } from '../components/database/database';

const HomeScreen = ({ route }) => {
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { userId } = route.params;

  useEffect(() => {
    loadJournals();
  }, [searchQuery]);

  const loadJournals = async () => {
    try {
      let query = 'SELECT * FROM journals WHERE userId = ?';
      let params = [userId];

      if (searchQuery.trim()) {
        query += ' AND (description LIKE ? OR category LIKE ?)';
        params.push(`%${searchQuery}%`, `%${searchQuery}%`);
      }

      query += ' ORDER BY date DESC';

      const result = await executeSql(query, params);
      const items = Array.from({ length: result.rows.length }, (_, i) =>
        result.rows.item(i)
      );
      setJournals(items);
    } catch (error) {
      console.error('Load journals failed:', error);
    }
  };

  const handleAddJournal = () => {
    navigation.navigate('AddJournal', { userId });
  };

  const handleEditJournal = (journal) => {
    navigation.navigate('EditJournal', { journal });
  };

  const handleDeleteJournal = async (journalIds) => {
    try {
      const idsString = journalIds.join(',');
      await executeSql(
        `DELETE FROM journals WHERE id IN (${idsString})`,
        []
      );
      loadJournals();
    } catch (error) {
      console.error('Delete journals failed:', error);  
      Alert.alert('Error', 'Delete failed, please try again');  
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search journals..."  
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <JournalList
        journals={journals}
        onEdit={handleEditJournal}
        onDelete={handleDeleteJournal}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddJournal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings', { userId })}
      >
        <Text style={styles.settingsButtonText}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
  settingsButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default HomeScreen;