import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Header} from 'react-native-elements';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './Screens/LoginScreen';
import ReadStoryScreen from './Screens/readStoryScreen';
import WriteStoryScreen from './Screens/writeStoryScreen';
import { ScrollView } from 'react-native';

export default class App extends React.Component{
  render(){
    return (
      <SafeAreaProvider style={styles.container}>

      <Header
      backgroundColor={"#000000" }
      centerComponent={{text:"Story Hub", style:{color:"white", fontSize:24,}}} 
      />    
        <AppContainer />
      </SafeAreaProvider>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Write : {screen:WriteStoryScreen, 
    navigationOptions:{tabBarIcon:({tintColor})=>(
      <Image 
      source={require('./assets/write.png')}
      resizeMode='contain'
      style={{width:30, height:30}} />
    )}},
  Read : {screen:ReadStoryScreen, 
    navigationOptions:{tabBarIcon:({tintColor})=>(
      <Image 
      source={require('./assets/read.png')}
      resizeMode='contain'
      style={{width:30, height:30}} />
    )}},
})

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: {screen: LoginScreen},
  TabNavigator: {screen: TabNavigator},
})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8, 
    backgroundImage:"url('https://getwallpapers.com/wallpaper/full/3/5/2/348580.jpg')"
  },
});
