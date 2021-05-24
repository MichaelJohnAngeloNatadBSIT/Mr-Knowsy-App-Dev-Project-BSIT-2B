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
      constructor() {
        super();
        this.state = { 
          bookName: '',
          bookDescription: '', 
          bookAuthor: '',
          resultURI: '',
          isLoading: false
        }
      }
      updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
      
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
          this.uploadPDF(result.uri)
          .then(() => {
            console.log(result)
          })
          .catch((error) => {
          console.log(error);
          });
          
      }
      };
  
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
  
    // , bookName, bookDescription, bookAuthor
    uploadPDF = async (fileURI) => {
      const response = await fetch(fileURI);
      const blob = await response.blob();
      this.setState({
        isLoading: true,
      })
      console.log("bookname: "+this.state.bookName);

      

        const uploadTask = firebase.storage().ref('pdf/' +this.state.bookName).put(blob);
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
          const uniqueKey = firebase.database().ref().push().key;
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            
          firebase.database().ref('pdf/'+uniqueKey).set(
            {
              fileName: this.state.bookName,
              fileDescription: this.state.bookDescription,
              fileAuthor: this.state.bookAuthor,
              fileURL: downloadURL,
            }
          ).then(()=>{
            console.log('Inserted!');
            this.setState({
              isLoading: false,
              bookAuthor: '', 
              bookDescription: '',
              bookName:'',
              resultURI:'',
            })
          });
          
          })
        
        },
        );
        
    }

   render(){
        let { image } = this.state;
   return (
    <View style={styles.container}> 
    <TextInput
    style={styles.inputStyle}
    placeholder="Book Name"
    value={this.state.bookName}
    onChangeText={(val) => this.updateInputVal(val, 'bookName')}
  />      
  <TextInput
    style={styles.inputStyle}
    placeholder="Book Description"
    value={this.state.bookDescription}
    onChangeText={(val) => this.updateInputVal(val, 'bookDescription')}
  />
  <TextInput
    style={styles.inputStyle}
    placeholder="Book Author"
    value={this.state.boookAuthor}
    onChangeText={(val) => this.updateInputVal(val, 'bookAuthor')}
    
  /> 
    <View style={{ 'marginTop': 20}}>
      <Button
        title="Select Document"
        onPress={this._pickDocument}
      />
    
    <View style={{ 'marginTop': 70}}>
      <Button
        title="UPLOAD FILE"
        onPress={() => this.uploadPDF()}
      />
       
       
       {image &&
         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
         </View>
     </View>
     </View>
   );
 }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})
