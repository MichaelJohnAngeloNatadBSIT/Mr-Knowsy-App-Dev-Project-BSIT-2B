//import { Icon } from 'native-base';
// import { Button } from 'native-base';
import { Icon } from 'react-native-elements'
import React, { Component,useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import firebase from '../constants/fireBaseDB';


export default class ProfileIconsView extends Component {
  constructor() {
    super();
    this.state = { 
      displayName: '',
      uid: '',
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  render() {
    if(this.state.uid !== ''){
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }
  } 
  
  let button;
  if (this.state.uid == '') {
    button = <Button
    color="#3740FE"
    title="Log In"
  />;
  } else {
    button = <Button
    color="#3740FE"
    title="Log Out"
    onPress={() => this.signOut()}
  />;
  }

    return (
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

                <Text style={styles.name}>
                  {this.state.displayName}
                </Text>
                {button}
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>

              <View style={styles.menuBox}>
                <Icon name='upload' type='font-awesome' />
                <Text style={styles.info}>Icon</Text>
              </View>
              
            </View>
        </View>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:22,
    color: "#696969",
  }
});