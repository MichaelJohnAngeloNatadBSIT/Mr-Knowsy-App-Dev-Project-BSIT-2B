
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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
import { Card, CardItem, } from 'native-base';
import { SearchBar, Icon } from 'react-native-elements';
import firebase from '../constants/fireBaseDB';


const Search = (props) => {
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
      console.log(snapshot.val());
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
 
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('File Preview')}>
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
        <SearchBar
          round
          searchIcon={{ size: 25 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search Something Here..."
          value={search}
          containerStyle={{backgroundColor:'#0099e6'}}
        />
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
    paddingTop: 25,
  },
  searchBar:{
    backgroundColor: '#3366ff',
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

export default Search;
