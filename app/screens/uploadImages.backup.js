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

import * as ImagePicker from 'expo-image-picker';
export default class UploadFiles extends React.Component{

    state = {
        image: null,
      };

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

_pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
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
      this.uploadImage(result.uri, imageName, result)
      .then(() => {
        console.log('passing to db (then stmt)');
      })
      .catch((error) => {
      console.log(error);
      });
    }
  };

  uploadImage = async (fileURI, imageName, file) => {
    const response = await fetch(fileURI);
    const blob = await response.blob();

    this.setState({
      isLoading: true,
    })
    const uploadTask = firebase.storage().ref('images/' +imageName)
    .put(blob);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
    );
  }
}
