import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';

class DeckList extends Component {
    render (){
        let {decks} = this.props;
        return(
            <View>
                <Text> Deck List </Text>
                {Object.keys(decks).map((deckId, idx)=>{
                    let title = decks[deckId].title;
                    return (<View key={idx}>
                        <Text>{title}</Text>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Quizz')}}>
                            <Text>Go To Quizz </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('AddQuestion')}}>
                            <Text>Add AddQuestion</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('SingleDeck')}}>
                            <Text>View Single Deck</Text>
                        </TouchableHighlight>
                        </View>)
                })}
                
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
        decks: state.decks    
    }
}
export default connect(mapStateToProps)(DeckList);