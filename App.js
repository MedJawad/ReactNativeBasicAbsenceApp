import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import db from './helpers/Sqlite';

import HomeScreen from './screens/HomeScreen';
import ClasseScreen from './screens/ClasseScreen';
import AbsenceScreen from './screens/AbsenceScreen';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // RNBootSplash.show();

    db.openDatabase();
    // db.deleteDatabase();
    return () => {
      db.closeDatabase();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Classe"
          options={{headerShown: false}}
          component={ClasseScreen}
        />
        <Stack.Screen
          name="Absences"
          options={{headerShown: false}}
          component={AbsenceScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffba88',
    backgroundColor: '#EFE3D7',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {},
  bigText: {},
});
