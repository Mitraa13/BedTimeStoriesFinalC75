import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import db from "../config";
import { Header, SearchBar, ListItem } from "react-native-elements";

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      search: "",
      dataSource: [],
    };
  }

  getStories = () => {
    var allStories = [];
    var stories = db
      .collection("Story")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          allStories.push(doc.data());
        });
      });
    this.setState({
      allStories: allStories,
    });
  };

  componentDidMount() {
    this.getStories();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <View style = {{borderWidth:3, marginTop:20, padding:5, backgroundColor:"lightblue"}}>
          <Text>{"Title:" + item.title}</Text>
          <Text>{"Author:"+ item.author}</Text>
      </View>
    );
  };

  searchStory = (search) => {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = search.toUpperCase();
      return itemData.indexOf(textData)>-1
    });
    this.setState({
      dataSource: newData,
      search: search,

    })
  };

  render() {
    return (
      <View
        style={styles.container}
      >

        <View style={{ width: "100%", height: 50, marginBottom:20 }}>
          <SearchBar
          style={styles.searchBar}
            placeholder={"Search Here"}
            onChangeText={(text) => {
              this.searchStory(text);
            }}
            value={this.state.search}
            onClear={(text) => {
              this.searchStory("");
            }}
          />
        </View>

        <FlatList
          data={this.state.search===""?this.state.allStories:this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundImage:"url('https://st3.depositphotos.com/1359043/31851/i/450/depositphotos_318512834-stock-photo-color-romantic-sky-background-watercolor.jpg')"
  },
  searchBar:{
    flexDirection:'row',
    height:50,
    width:'auto',
    borderWidth:1.5,
    alignItems:'center',
    backgroundColor:'white',
    alignSelf:"center",
    padding:20,

  },
})