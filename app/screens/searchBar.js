
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
        SafeAreaView, 
        Text, 
        StyleSheet, 
        View, 
        FlatList,
        TouchableOpacity,
        TextInput,
        } from 'react-native';
import { Card, CardItem, } from 'native-base';
import Constant from 'expo-constants'
import firebase from '../constants/fireBaseDB';


const SearchFile = (pros) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const navigation = useNavigation(); 
  
  React.useEffect(() => {
    setFilesList([]);
    const onChildAdded = firebase.database().ref(`pdf`).on('child_added', (snapshot) => {
      let helperArr=[];
      helperArr.push(snapshot.val());
      setFilesList((files) => [...files, ...helperArr]);
    });  
    setMasterDataSource(filesList);
    setFilteredDataSource(filesList);
    return () => firebase.database().ref(`pdf`).off('child_added', onChildAdded);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.bookTitle
          ? item.bookTitle.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank 
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
 
  const ItemView = ({ item, index }) => {
    return (
      <TouchableOpacity 
      key = {index}
      onPress={() => navigation.navigate('File Preview',{
        bURL: item.bookURL,
      })}>
      <Card style={{ marginTop: 10 }}>
       <CardItem>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Title: {item.bookTitle}
            </Text>
            <Text>
              Description: {item.bookDescription}
            </Text>
            <Text>
              Genre: {item.bookGenre}
            </Text>
            <Text>
              Author: {item.bookAuthor}
            </Text>
            
        </View>
        </CardItem>
        <CardItem footer bordered>
          <View style={styles.footer}>
          
          </View>
        </CardItem>
        </Card>
        </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 20,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
        <TextInput
             style={styles.searchBar}
             value={search}
             onChangeText={(text) => searchFilterFunction(text)}
             placeholder="Search Book Title Here..."
             onClear={(text) => searchFilterFunction('')}
             />
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    marginTop:Constant.statusBarHeight,
  },
  searchContainer:{
    padding:5,
    flexDirection:"row",
    justifyContent:"space-around",
    elevation:5,
    backgroundColor: "#0099e6",
  },
  searchBar:{
    width:"90%",
    height:35,
    backgroundColor:"#e6e6e6",
  },
  subheading: {
    fontSize: 50,
    fontWeight: '900',
    color: '#fff',
  },
  cardHeader: {
    backgroundColor: '#6a90eb',
  },
  footer: {
    width: '100%',
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
});

export default SearchFile;
