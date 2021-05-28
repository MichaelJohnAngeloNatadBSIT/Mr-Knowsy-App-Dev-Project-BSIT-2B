import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import SearchFile from './searchBar';
import ProfileIconsView from './profileScreen';
import SearchYoutube from './youtubeSearch';


//bottom tabs functions
  function YTvideosfunc() {
    return (   
      <SearchYoutube />
  
    );
  }
  //top tabs - art books tab
  function artBoofunc() {
    return (
      <SearchFile />
    );
  }
  function acctFunc() {
    return (
      <ProfileIconsView/>
    );
  }
  
  const Tab = createBottomTabNavigator();

function BottomTabsNav(props) {

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
      name='Books'
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

export default BottomTabsNav;