import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Search from './app/screens/searchBar';
import ProfileIconsView from './app/screens/profileScreen';

//top tabs - art books tab
function TabA() {
  return (
    <View style={styles.topTabContainer}>
      <Text style={styles.text}>Tab A</Text>
    </View>
  );
}
function TabB() {
  return (
    <View style={styles.topTabContainer}>
      <Text style={styles.topTabText}>Tab B</Text>
    </View>
  );
}

//bottom tabs functions
function YTvideosfunc() {
  return (   
    <Search />
  );
}

function artBoofunc() {
  return (

      <Search />
    
    
  );
}
function acctFunc() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>Account Information Tab</Text>
    // </View>
    <ProfileIconsView/>
  );
}

const Tab = createBottomTabNavigator();

//drawer tabs for Screen A
function ReactNavigationBottomTabs() {
    
  return (
    //contents of Bottom Tabs
    <Tab.Navigator
      tabBarOptions={
        {
          //for buttons
          activeTintColor: '#80d4ff',
          inactiveTintColor: '#004466',
          //for background
          activeBackgroundColor: '#006699',
          inactiveBackgroundColor: '#0099e6',
        }
      }
    >
      <Tab.Screen
        name='YT Videos'
        component={YTvideosfunc}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='sc-youtube' type='evilicon' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Articles/Books'
        component={artBoofunc}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='book' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={acctFunc}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }} 
      />   
    </Tab.Navigator>
   
  );
}

//drawer tabs for Screen B
function ScreenB() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen B</Text>
    </View>
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

export default function DrawerScreen({ navigation }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Screen A'>
        <Drawer.Screen name='Screen A' component={ReactNavigationBottomTabs} />
        <Drawer.Screen name='Screen B' component={ScreenB} />
        <Drawer.Screen name='Screen C' component={ScreenC} />
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