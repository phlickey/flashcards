import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
class SingleDeckView extends Component{
    render(){
        let deckId = this.props.navigation.state.params.deckId;
        let currentDeck = this.props.decks[deckId];
        return(
            <View>
                <Text>{currentDeck.title}</Text>
                <ScrollView>
                {currentDeck.questions.map((question, idx)=>(
                    <View key={idx}>
                        <Text> Question: </Text>
                        <Text> {question.question} </Text>
                        <Text> Answer: </Text>
                        <Text> {question.answer} </Text>
                    </View>
                ))}
                </ScrollView>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddQuestion', {deckId})}}>
                    <Text>Add Question</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = (state)=>({
    decks: state.decks
})
export default connect(mapStateToProps)(SingleDeckView);