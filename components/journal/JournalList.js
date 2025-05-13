import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import JournalEntry from './JournalEntry';

const JournalList = ({ journals, onDelete, onEdit }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.itemContainer,
      selectedItems.includes(item.id) && styles.selectedItem
    ]}>
      {isSelectionMode && (
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedItems.includes(item.id) && styles.checked
          ]}
          onPress={() => toggleSelection(item.id)}
        />
      )}
      <JournalEntry
        journal={item}
        onEdit={() => !isSelectionMode && onEdit(item)}
        onLongPress={() => {
          setIsSelectionMode(true);
          toggleSelection(item.id);
        }}
        isSelectionMode={isSelectionMode}
      />
    </View>
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => onDelete([item.id])}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isSelectionMode && (
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setIsSelectionMode(false);
              setSelectedItems([]);
            }}
          >
            <Text style={styles.actionButtonText}>Cancel</Text>  
          </TouchableOpacity>
          <Text style={styles.selectionCount}>
            Selected {selectedItems.length} items  
          </Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedItems.length === 0 && styles.disabledButton
            ]}
            onPress={() => {
              if (selectedItems.length > 0) {
                onDelete(selectedItems);
                setIsSelectionMode(false);
                setSelectedItems([]);
              }
            }}
            disabled={selectedItems.length === 0}
          >
            <Text style={styles.actionButtonText}>Delete</Text>  
          </TouchableOpacity>
        </View>
      )}
      <SwipeListView
        data={journals}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        closeOnRowPress={!isSelectionMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: '#e8f0fe',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4285f4',
    marginLeft: 10,
  },
  checked: {
    backgroundColor: '#4285f4',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#4285f4',
  },
  actionButtonText: {
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  selectionCount: {
    fontSize: 16,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

export default JournalList;