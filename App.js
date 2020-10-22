import { enableScreens } from 'react-native-screens';
import { Platform, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Provider as PaperProvider , DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Camera from './src/Camera'

enableScreens();

const Stack = createStackNavigator();
const Tab =  createBottomTabNavigator();

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={() => navigation.navigate('Profile')}>Goto Profilex</Button>
      <Button onPress={() => navigation.navigate('Settings')}>Goto Settingsy</Button>
      <Button onPress={() => navigation.navigate('Camera')}>Goto Camerax</Button>
    </View>
  );
}

function Feed() {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}

function MainApp() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const tryLoading = async () => {
      setLoadingComplete(true);
    };
    if (!isLoadingComplete) {
      tryLoading();
    }
  }, []);

  if(!isLoadingComplete) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>Loading...</Text>
      </View>
    )
  }

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: 'red'
      }}
    >
      <PaperProvider theme={theme}>
        {Platform.OS === 'ios' && (
          <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        )}
        <NavigationContainer>
          <MainApp></MainApp>
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}