import React, {Component} from 'react'
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import CustomStatusBar from './CustomStatusBar';
import {createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import NewDeck from './NewDeck';
import DeckList from './DeckList';
import Quiz from './Quiz';
import AddQuestion from './AddQuestion';
import SingleDeckView from './SingleDeckView';
import { initAppState } from '../actions';


const Home = createMaterialBottomTabNavigator({
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
    initialRouteName: 'DeckList',
    activeTintColor: '#fff',
    inactiveTintColor: '#bbb',
    barStyle: { backgroundColor: 'green' },
  });
  
const StackNavigator = createStackNavigator({
Home:{
    screen: Home,
    navigationOptions:{
        title: 'Flashcards'
    }
},
Quiz: {
    screen: Quiz,
    navigationOptions:{
    title: 'Quiz Yourself'
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


class Flashcards extends Component{
    componentDidMount(){
        this.props.initAppState();
    }
    render(){
        return(
        <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
            <CustomStatusBar backgroundColor={'lightgreen'} barStyle="light-content" />
            <StackNavigator />
        </View>
        )
    }
}
const mapStateToProps = (state)=>({
    state: state.decks
});
const mapDispatchToProps = (dispatch) =>({
    initAppState: ()=>{dispatch(initAppState())}
})
export default connect(mapStateToProps, mapDispatchToProps)(Flashcards);