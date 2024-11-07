import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AnniversariesScreen from './screens/AnniversariesScreen';
import { View } from 'react-native';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Anniversaries" component={AnniversariesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  
  
  );
}