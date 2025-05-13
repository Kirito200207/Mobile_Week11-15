import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const JournalEntry = ({ journal, onEdit, onLongPress, isSelectionMode }) => {
  return (
    <TouchableOpacity 
      onPress={() => onEdit(journal)}
      onLongPress={onLongPress}
      style={[
        styles.container,
        isSelectionMode && styles.selectionModeContainer
      ]}
    >
      <Image
        source={{ uri: journal.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.description}>{journal.description}</Text>
        <Text style={styles.category}>{journal.category}</Text>
        <Text style={styles.date}>{journal.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  selectionModeContainer: {
    opacity: 0.8,
  },
});

export default JournalEntry;