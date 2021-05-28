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
import SearchFile from './app/screens/searchBar';
import VideoPlayer from './app/screens/videoPlayer';
import ProfileIconsView from './app/screens/profileScreen';


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
export default function App({ navigation }) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bottom Tabs" headerMode="none">
      <Stack.Screen name='Drawer Screen' component={DrawerScreen}/>
      <Stack.Screen name='File Preview' component={FilePreview}/>
      <Stack.Screen name='Search' component={SearchFile}/>
      <Stack.Screen name='Video Player' component={VideoPlayer}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Profile Screen' component={ProfileIconsView}/>
      </Stack.Navigator>
    </NavigationContainer>
      
      
    
  );
}
