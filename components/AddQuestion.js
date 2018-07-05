import React, {Component} from 'react';
import {View, Text} from 'react-native';

class AddQuestion extends Component{
    render(){
        return(
            <View>
                <Text>Add Question to {this.props.navigation.state.params.deckId}</Text>
            </View>
        )
    }
}

export default AddQuestion;