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
import { Platform } from 'react-native';
import firebase from '../constants/fireBaseDB';
import PDFReader from 'rn-pdf-reader-js';
import PdfThumbnail from "react-native-pdf-thumbnail";
import { ScrollView } from 'react-native-gesture-handler';



export default class UploadFiles extends React.Component{  
  
      constructor() {
        super();
        this.state = { 
          bookTitle: '',
          bookDescription: '', 
          bookAuthor: '',
          resultURI: '',
          resultFileName: '',
          bookGenre: '',
          isLoading: false,
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
          this.setState({
            resultURI : result.uri,
            resultFileName: result.name,
          })
          .then(() => {
            console.log(result)
          })
          .catch((error) => {
          console.log(error);
          });
          
      }
      
      
      };

      // testUseEffect = () =>{
      //   React.useEffect(() => {
      //     const onChildAdded = firebase.database().ref('pdf/').on('child_added', (snapshot) => {
      //      console.log('snapshot: '+snapshot.val())  
      //     })  
      //     return () => firebase.database().ref('pdf/').off('child_added', onChildAdded);
      //   },[]);
      // }
  
    // , bookTitle, bookDescription, bookAuthor
    uploadPDF = async (fileURI) => {
      if(this.state.bookTitle === '' && this.state.bookGenre === '' && this.state.bookAuthor === ''&& this.state.bookDescription === '' && this.state.bookGenre === '' && this.state.resultURI === '') {
        Alert.alert('Please Fill Out All needed Details!')
      }
      else{
      const response = await fetch(fileURI);
      const blob = await response.blob();
      this.setState({
        isLoading: true,
      })
      console.log("bookTitle: "+this.state.bookTitle);

        const uploadTask = firebase.storage().ref('pdf/' +this.state.bookTitle).put(blob);
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
            this.setState({
              isLoading: true,
            })
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
          Alert.alert('File Uploaded Successfully')
          const uniqueKey = firebase.database().ref().push().key;
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            
          firebase.database().ref('pdf/'+uniqueKey).set(
            {
              bookTitle: this.state.bookTitle,
              bookDescription: this.state.bookDescription,
              bookGenre: this.state.bookGenre,
              bookAuthor: this.state.bookAuthor,
              bookURL: downloadURL,
            }
          ).then(()=>{
            console.log('Inserted!');
            this.setState({
              isLoading: false,
              bookAuthor: '', 
              bookDescription: '',
              bookGenre: '',
              bookTitle:'',
              resultURI:'',
              resultFileName: '',
            })
          }).catch((e) => {
          
            console.log('uploading image error => ', e);
            this.setState({ isLoading: false });
          });
          
          })
        
        },
        );
      } 
    }
    removeFile = () => {
      this.setState({
        resultFileName: '',
        resultURI: '',
      })
    }
       
   render(){
        let { image } = this.state;
        if(this.state.isLoading){
          return(
            <View style={styles.container}>
              <Text style={styles.loadingText}>File is Uploading please wait....</Text>
              <ActivityIndicator size="large" color="#9E9E9E" style={styles.loadingIndicator}/>
            </View>
          )
        } 
         
   return (
     
    <View style={styles.container}>
       <View style={styles.topBar}>
        
        <Text>Upload PDF Book File</Text>
        
      </View>
    <ScrollView>
    <View>
      <TextInput
        style={styles.inputStyle}
        placeholder="Book Name"
        value={this.state.bookTitle}
        onChangeText={(val) => this.updateInputVal(val, 'bookTitle')}
      />      
      <TextInput
        style={styles.inputStyle}
        placeholder="Book Description"
        value={this.state.bookDescription}
        onChangeText={(val) => this.updateInputVal(val, 'bookDescription')}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Book Genre"
        value={this.state.bookGenre}
        onChangeText={(val) => this.updateInputVal(val, 'bookGenre')}
      />   
      <TextInput
        style={styles.inputStyle}
        placeholder="Book Author"
        value={this.state.boookAuthor}
        onChangeText={(val) => this.updateInputVal(val, 'bookAuthor')}
        
      />
      <View style={styles.fileNameStyle}>
      <Text>{this.state.resultFileName}</Text>
      <Button
        title="Remove File"
        onPress={this.removeFile}
        />
      </View>
      
        <View style={{ 'marginTop': 20}}>
          <Button
            title="Select Document"
            onPress={this._pickDocument}
          />
        
        <View style={{ 'marginTop': 20}}>
          <Button
            title="UPLOAD FILE"
            onPress={() => this.uploadPDF(this.state.resultURI)}
          />
          
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        </View>
        </View>
      </ScrollView>
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
  },
  fileNameStyle:{
    flexDirection: 'row',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loadingIndicator: {
    zIndex: 5,
    width: '100%',
    height: '100%',
  },
  loadingText:{
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 15,
    textAlign: 'center'
  },
  topBar:{
    alignSelf: 'center',
    height: 52,
    width: 300,
    flexDirection: 'row', // row
    backgroundColor: '#0099e6',
    alignItems: 'center',
    justifyContent: 'center', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
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
