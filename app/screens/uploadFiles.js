import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    ActivityIndicator,
    Alert,
  } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import firebase from '../constants/fireBaseDB';

export default class UploadFiles extends React.Component{
    state = {
        image: null,
      };
      
      //removes file:// from path
      normalizePath = async (path) => {
        if(Platform.OS === 'android' || Platform.OS === 'ios'){
          const filePrefix = 'file://';
          if(path.startsWith(filePrefix)){
            path = path.substring(filePrefix.length);
            try{
              path = decodeURI(path);
            }
            catch(e){

            }
          }
          return path;
        }
      }
     
    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
          alert(result.uri);
          console.log(result);
          const path = await this.normalizePath(result.uri);
          if (!result.cancelled) {
          this.uploadPDF(result.uri, result.name)
          .then(() => {
          console.log('upload success pdf');
          })
          .catch((error) => {
          console.log(error);
          });
      }
      }
  
     _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      alert(result.uri);
      console.log(result)
      const path = await this.normalizePath(result.uri);
      console.log('path is ' + path);
      const imageName = result.uri.substring(result.uri.lastIndexOf('/') + 1);
      if (!result.cancelled) {
       // this.setState({ image: result.uri });
        this.uploadImage(result.uri, imageName)
        .then(() => {
        console.log('upload success image');
        })
        .catch((error) => {
        console.log(error);
        });
      }
    };


    uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var ref = firebase.storage().ref().child("images/" + imageName);

      return ref.put(blob);
    }
    uploadPDF = async (uri, pdfName) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var ref = firebase.storage().ref().child("pdf/" + pdfName);

      return ref.put(blob);
    }

   render(){
        let { image } = this.state;
   return (
     <View style={styles.container}>
       <Button
         title="Select Document"
         onPress={this._pickDocument}
       />

     <View style={{ 'marginTop': 20}}>
       <Button
         title="Select Image"
         onPress={this._pickImage}
       />
       
       {image &&
         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
     </View>
     </View>
   );
 }
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})
