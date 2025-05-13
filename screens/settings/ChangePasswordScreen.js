import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Alert 
} from 'react-native';
import { executeSql } from '../../components/database/database';

const ChangePasswordScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'New passwords do not match'); 
        return;
      }

      const result = await executeSql(
        'SELECT password FROM users WHERE id = ?',
        [userId]
      );

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        if (user.password !== currentPassword) {
          Alert.alert('Error', 'Current password is incorrect');  
          return;
        }

        await executeSql(
          'UPDATE users SET password = ? WHERE id = ?',
          [newPassword, userId]
        );

        Alert.alert('Success', 'Password changed successfully', [  
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change password');  
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Current Password"  
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"  
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"  
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleChangePassword}
      >
        <Text style={styles.buttonText}>Confirm Change</Text> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;