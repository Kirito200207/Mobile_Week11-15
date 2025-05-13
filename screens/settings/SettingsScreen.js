import React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { executeSql } from '../../components/database/database';

const SettingsScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [email, setEmail] = useState('');
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(false);

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const result = await executeSql(
        'SELECT email FROM users WHERE id = ?',
        [userId]
      );
      if (result.rows.length > 0) {
        setEmail(result.rows.item(0).email);
      }

      // Load saved settings
      const savedSettings = await AsyncStorage.getItem(`userSettings_${userId}`);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setPushNotifications(settings.pushNotifications);
        setAutoBackup(settings.autoBackup);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        pushNotifications,
        autoBackup
      };
      await AsyncStorage.setItem(
        `userSettings_${userId}`,
        JSON.stringify(settings)
      );
      Alert.alert('Success', 'Settings saved');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword', { userId });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.replace('Auth');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const exportData = async () => {
    try {
      // Get all user journals
      const result = await executeSql(
        'SELECT * FROM journals WHERE userId = ?',
        [userId]
      );

      const journals = Array.from(
        { length: result.rows.length },
        (_, i) => result.rows.item(i)
      );

      // Create export data
      const exportData = {
        date: new Date().toISOString(),
        journals: journals,
      };

      // Convert to JSON string
      const jsonString = JSON.stringify(exportData, null, 2);

      // Save to temporary file
      const fileName = `food_journal_backup_${new Date().getTime()}.json`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(filePath, jsonString);

      // Share file
      await Share.share({
        url: filePath,
        title: 'Food Journal Backup',
        message: 'This is your food journal backup file'
      });

    } catch (error) {
      console.error('Export failed:', error);
      Alert.alert('Error', 'Failed to export data');
    }
  };

  const importData = async () => {
    try {
      // Open file picker
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (result.type === 'success') {
        // Read file content
        const content = await FileSystem.readAsStringAsync(result.uri);
        const importedData = JSON.parse(content);

        // Validate data format
        if (!importedData.journals || !Array.isArray(importedData.journals)) {
          throw new Error('Invalid backup file format');
        }

        // Start importing
        for (const journal of importedData.journals) {
          await executeSql(
            `INSERT OR REPLACE INTO journals
             (id, userId, image, description, category, date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              journal.id,
              userId,
              journal.image,
              journal.description,
              journal.category,
              journal.date,
            ]
          );
        }

        Alert.alert('Success', 'Data imported successfully');
      }
    } catch (error) {
      console.error('Import failed:', error);
      Alert.alert('Error', 'Failed to import data');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Info</Text>
        <Text style={styles.email}>{email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingItem}>
          <Text>Push Notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
        </View>
        <View style={styles.settingItem}>
          <Text>Auto Backup</Text>
          <Switch
            value={autoBackup}
            onValueChange={setAutoBackup}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveSettings}
      >
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  email: {
    fontSize: 16,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SettingsScreen;
