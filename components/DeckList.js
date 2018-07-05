import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
//import {connect} from 'react-redux';

class DeckList extends Component {
    render (){
        return(
            <View>
                <Text> Deck List </Text>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Quizz')}}>
                    <Text>Go To Quizz </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('AddQuestion')}}>
                    <Text>Add AddQuestion</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('SingleDeck')}}>
                    <Text>View Single Deck</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default DeckList;