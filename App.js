import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';



import BottomTabsNav from './app/screens/bottomTabsNav';
import LogInScreen  from './app/screens/loginScreen';
import Signup from './app/screens/signUpScreen';
import Login from './app/screens/loginScreen';
import UploadFiles from './app/screens/uploadFiles';
import firebase from './app/constants/fireBaseDB';
import FilePreview from './app/screens/filePreview';
import Search from './app/screens/searchBar';



//drawer tabs for Screen A
function ReactNavigationBottomTabs() {
  return (
    <BottomTabsNav/>
  );
}

const Drawer = createDrawerNavigator();
const DrawerScreen = ({ navigation }) =>{
  return(
      <Drawer.Navigator initialRouteName='Bottom Tabs'>
        <Drawer.Screen name='Bottom Tabs' component={BottomTabsNav} />
        <Drawer.Screen name='Sign Up' component={Signup} />
        <Drawer.Screen name='Upload File' component={UploadFiles} />
        <Drawer.Screen name='Login' component={Login} />
      </Drawer.Navigator>
  );
}


const Stack = createStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bottom Tabs" headerMode="none">
      <Stack.Screen name='Drawer Screen' component={DrawerScreen}/>
      <Stack.Screen name='File Preview' component={FilePreview}/>
      <Stack.Screen name='Search' component={Search}/>
      </Stack.Navigator>
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