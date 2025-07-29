import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ProfileScreen from './screens/ProfileScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import RegisterScreen from './screens/RegistrationScreen';

// TODO: Navigation Container
const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); //set to false for now till isIogged in

  useEffect(() => { 
    onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
      setIsLoggedIn(true);
      console.log("User logged in already!")

  } else {
    setIsLoggedIn(false);
    console.log("user is not logged in")
  }
  });

    // TODO: research how to convert this code to use a useContext hook (better practice)
  }, [])

  return (
    <NavigationContainer>
      { isLoggedIn ? (
        // if user is logged in navigate them to profile screen
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
   
      </Stack.Navigator>
        ) : (
          // if user is not logged in show the auth screen
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
}

// 1. setup naviagtion for when user is logged out
// 2. setup the naivigation for when a user is logged in
// 3. listen to wether a user is logged in or out



// { isLoggedIn ? (
//         // if user is logged in navigate them to profile screen
//         ) : (
//           // if user is not logged in show the auth screen
//         )
//       }