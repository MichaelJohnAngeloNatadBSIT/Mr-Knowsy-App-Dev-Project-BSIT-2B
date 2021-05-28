import { Content } from 'native-base';
import React from 'react';
import { 
    SafeAreaView, 
    Text, 
    StyleSheet, 
    View, 
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    } from 'react-native';
    import PDFReader from 'rn-pdf-reader-js';
const FilePreview = ({route}) =>{

    return(
        
        <View style={styles.container}>
        <PDFReader
            source={{
                uri: route.params.bURL,
            }}
        />
        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#ecf0f1',
      },
})

export default FilePreview;