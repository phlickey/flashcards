import React from 'react';
import {View, StatusBar } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import NewDeck from './components/NewDeck';
import DeckList from './components/DeckList';
import Quizz from './components/Quizz';
import CustomStatusBar from './components/CustomStatusBar';
import AddQuestion from './components/AddQuestion';
import SingleDeckView from './components/SingleDeckView';
const TabNavigator = createMaterialBottomTabNavigator({
  DeckList :{
    screen: DeckList,
    navigationOptions:{
      title: 'Deck List'
    }
  },
  NewDeck :{
    screen: NewDeck,
    navigationOptions:{
      title: 'Add a new deck!'
    }
  },
},{
  labelStyle: {
    fontSize: 12,
  },
  tabStyle: {
    width: 100,
  },
  style: {
    backgroundColor: 'blue',
  },
});

const StackNavigator = createStackNavigator({
  default:{
    screen: TabNavigator,
  },
  Quizz: {
    screen: Quizz,
    navigationOptions:{
      title: 'Quizz Yourself'
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions:{
      title: 'Add A Question'
    }
  },
  SingleDeck: {
    screen: SingleDeckView,
    navigationOptions:{
      title: 'Single Deck View'
    }
  },
}, {

})
export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
          <CustomStatusBar backgroundColor={'lightgreen'} barStyle="light-content" />
          <StackNavigator />
      </View>
    );
  }
}

