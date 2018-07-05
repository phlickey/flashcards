import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Quizz extends Component{
    render(){
        return(<View>
            <Text>Quizz view for {this.props.navigation.state.params.deckId}</Text>
        </View>)
    }
}

export default Quizz;