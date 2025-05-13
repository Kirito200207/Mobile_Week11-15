import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { executeSql } from '../../components/database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        await AsyncStorage.setItem('userId', user.id.toString());
        navigation.replace('Home', { userId: user.id });
      } else {
        Alert.alert('Login Failed', 'Invalid email or password'); 
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed, please try again'); 
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"  
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.linkText}>Don't have an account? Register now</Text>  
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#4285f4',
  },
});

export default LoginScreen;