// TODO: Create Register Screen & Register Functionality

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterUser } from '../services/authService';
import { StackActions, useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/authService';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      await registerUser(fullName, email, password);
      Alert.alert('Success', 'Your account has been created.');

      // reset to Login screen (so back-button won’t return to register)
      navigation.dispatch(StackActions.replace('Login'));
    } 
    catch (error: any) {
      // Firebase will throw meaningful errors you can inspect
      console.error(error);
      Alert.alert('Registration failed', error.message);
    }
    
    // TODO: Add backend call here (e.g., Firebase, your API)
    Alert.alert('Success', 'Account created successfully!');
    RegisterUser(email, password);
  };


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already Have an Account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    // borderColor: '#ddd',
    padding: 12,
    // borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    // borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    paddingTop: 20,
  }
});
