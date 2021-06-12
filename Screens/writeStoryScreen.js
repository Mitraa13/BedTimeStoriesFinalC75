import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WriteStoryScreen extends React.Component{
  constructor(){
    super();
    this.state={
      title:'',
      author:'',
      story:'',
    }
  }

  submitStory = () => {
       db.collection('Story').add({
            title: this.state.title.toUpperCase(),
            author: this.state.author,
            story:this.state.story,
            date: firebase.firestore.Timestamp.now().toDate()
        })
      this.setState({
          title: '',
          author: '',
          story: ''
      })
     ToastAndroid.show("Your story has been submitted.");
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container}>

        <View style={styles.inputView}>
        <TextInput 
          style={styles.inputBoxsmall}
          placeholder="Story Title"
          onChangeText={(text)=>
            this.setState({
              title:text
            })
          }
          value={this.state.title}
        />
        </View>
        
        <View style={styles.inputView}>
        <TextInput 
          style={styles.inputBoxsmall}
          placeholder="Author"
          onChangeText={(text)=>
            this.setState({
              author:text
            })
          }
          value={this.state.author}
        />
        </View>

        <View style={styles.inputView}>
        <TextInput 
          style={styles.inputBoxbig}
          placeholder="Write your story"
          multiline={true}
          onChangeText={(text)=>
            this.setState({
              story:text
            })
          }
          value={this.state.story}
        />
        </View>
        
        <TouchableOpacity
          style={styles.submitButton}
          onPress={()=>{this.submitStory()}}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFAEFA',
    padding: 8,
    paddingBottom:50,
    backgroundImage:"url('https://img4.goodfon.com/wallpaper/nbig/2/10/vector-abstract-background-design-wavy.jpg')"
  },
  buttonText:{
    fontSize: 15,
    textAlign: 'center',
  },
  inputView:{
    flexDirection: 'row',
    margin: 20,
    alignSelf:"center",
    marginTop:10,
  },
  inputBoxsmall:{
    width: 300,
    height: 50,
    borderWidth: 1.5,
    fontSize: 20,
    padding:10,
  },
  inputBoxbig:{
    width: 300,
    height: 200,
    borderWidth: 1.5,
    fontSize: 20,
    padding:10,
  },
  submitButton:{
    backgroundColor: 'orange',
    width:120,
    height:30,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
  },

});
