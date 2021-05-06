// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
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
import { Card, CardItem } from 'native-base';
import { Rating } from 'react-native-ratings';
import { SearchBar, Icon } from 'react-native-elements';



const Search = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
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
      <Card style={{ marginTop: 10 }}>
       <CardItem>
          <View>
          <Image
            style={styles.image}
            source={require('../assets/icon.png')}
            />
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}
            >
              {item.title}
            </Text>
            <Text style={styles.itemStyle} onPress={() => getItem(item)}>
         {item.id}
         {'.'}
         {item.body.toUpperCase()}
         </Text>
        </View>
        </CardItem>
        <CardItem footer bordered>
          <View style={styles.footer}>
          <Rating
            onFinishRating={(rating) => {
            alert('Star Rating: ' + JSON.stringify(rating));
          }}
          style={{ paddingVertical: 10 }}
          />
          </View>
        </CardItem>
        </Card>
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

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
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
  itemStyle: {
    padding: 10,
  },
  image:{
    height: 50,
    width: 50,
  },
  searchBar:{
    backgroundColor: '#3366ff',
  },
  subheading: {
    fontSize: 20,
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
