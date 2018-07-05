import React, {Component} from 'react';
import {View, Text} from 'react-native';

class SingleDeckView extends Component{
    render(){
        return(
            <View>
                <Text>Single Deck for {this.props.navigation.state.params.deckId}</Text>
            </View>
        )
    }
}
export default SingleDeckView;