/**
 * React Native Firebase App
 * Demonstrates integration with Firebase services
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  useColorScheme,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firestoreData, setFirestoreData] = useState<any[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber;
  }, []);

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'User account created!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Signed in successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      Alert.alert('Success', 'Signed out successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const addFirestoreData = async () => {
    try {
      await firestore().collection('users').add({
        name: 'Test User',
        email: email || 'test@example.com',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Data added to Firestore!');
      fetchFirestoreData();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchFirestoreData = async () => {
    try {
      const snapshot = await firestore().collection('users').limit(5).get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFirestoreData(data);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
            React Native Firebase
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              Authentication Status
            </Text>
            <Text style={{ color: isDarkMode ? '#ccc' : '#666' }}>
              {user ? `Signed in as: ${user.email}` : 'Not signed in'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              Firebase Auth Demo
            </Text>
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#444' : '#ccc' }]}
              placeholder="Email"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#444' : '#ccc' }]}
              placeholder="Password"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              <Button title="Sign Up" onPress={handleSignUp} />
              <Button title="Sign In" onPress={handleSignIn} />
              {user && <Button title="Sign Out" onPress={handleSignOut} color="red" />}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              Firestore Demo
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Add Data" onPress={addFirestoreData} />
              <Button title="Fetch Data" onPress={fetchFirestoreData} />
            </View>
            {firestoreData.length > 0 && (
              <View style={styles.dataContainer}>
                <Text style={{ color: isDarkMode ? '#ccc' : '#666' }}>
                  Fetched {firestoreData.length} items:
                </Text>
                {firestoreData.map((item, index) => (
                  <Text key={index} style={{ color: isDarkMode ? '#ccc' : '#666' }}>
                    {item.name || 'N/A'} - {item.email || 'N/A'}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dataContainer: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

export default App;
