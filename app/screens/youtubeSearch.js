
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
        SafeAreaView, 
        Text, 
        StyleSheet, 
        View, 
        FlatList,
        Image,
        TouchableOpacity,
        TextInput,
        ActivityIndicator,
        Dimensions,
        } from 'react-native';
        import Constant from 'expo-constants'
import {Ionicons} from '@expo/vector-icons';

const SearchYoutube = (props) => {
    const navigation = useNavigation();
    const [value,setValue] = useState('');
    const [result, setResult] = useState([]);
    const [loading,setLoading] = useState(false)
    
    const fetchData = () =>{
      setLoading(true)
      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=viewCount&q=${value}&type=video&videoDefinition=any&videoType=any&key=AIzaSyCAiW6LaAE78hGNe0537iWdpfvuOF1h2kE`)
      .then(res=>res.json())
      .then((data)=>{
          setLoading(false)
          setResult(data.items);
      })
  }
    
 
  const ItemView = ({ item, index }) => {
    
    
    return (
      
      <TouchableOpacity
      onPress={()=>navigation.navigate("Video Player",{videoId:item.id.videoId, title:item.id.title})}
      >
      <View style={{flexDirection:"row",margin:10,marginBottom:0}}>
          <Image 
            source={{uri:`https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`}}
            style={{
                width:"45%",
                height:100
            }} />
              <View style={{
                paddingLeft:7
            }}>
                <Text style={{
                    fontSize:17,
                    width:Dimensions.get("screen").width/2,
                    //  color:textcolor
                }}
                ellipsizeMode="tail"
                numberOfLines={3}
                >{item.snippet.title}</Text>
                
                <Text style={{fontSize:12, }}>{item.snippet.channelTitle}</Text>
              </View>
        </View>
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
             value={value}
             onChangeText={(text)=>setValue(text)}
             placeholder="Search Videos Here..."
             />
             <Ionicons
             name="md-send"
             size={32}
             onPress={()=>fetchData()}
             />
        </View>
      {loading ?<ActivityIndicator style={{marginTop:10}} size="large" color="blue"/>:null } 
        <FlatList
          data={result}
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
    width:"80%",
    backgroundColor:"#e6e6e6"
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

export default SearchYoutube;
