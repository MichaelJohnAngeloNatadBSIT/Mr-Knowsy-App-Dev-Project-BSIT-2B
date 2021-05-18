import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';



import BottomTabsNav from './app/screens/bottomTabsNav';
import LogInScreen  from './app/screens/loginScreen';
import Signup from './app/screens/signUpScreen';
import Login from './app/screens/loginScreen';
import firebase from './app/constants/fireBaseDB';


setTimeout(()=>{
  firebase.database().ref('users/004').set(
    {
      name: 'test4232442232',
      age: 1252242424
    }
  ).then(()=>{
    console.log('Inserted!');
  }).catch((error)=> {
    console.log('error');
  });
}, 5000)



//drawer tabs for Screen A
function ReactNavigationBottomTabs() {
  return (
    <BottomTabsNav/>
  );
}

//drawer tabs for Screen B
function ScreenB() {
  return (
    <LogInScreen />
  );
}

//drawer tabs for Screen C
function ScreenC() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen C</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function DrawerScreen({ navigation }) {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='LoginScreen'>
        <Drawer.Screen name='Screen A' component={ReactNavigationBottomTabs} />
        <Drawer.Screen name='Screen B' component={Signup} />
        <Drawer.Screen name='Screen C' component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  postContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  searchContainer:{
    paddingTop: 30,
    
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  topTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTabText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});