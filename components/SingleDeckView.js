import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
class SingleDeckView extends Component{
    render(){
        let deckId = this.props.navigation.state.params.deckId;
        let currentDeck = this.props.decks[deckId];
        return(
            <View style={styles.singleDeckContainer}>
                <Text style={styles.singleDeckTitle} >{currentDeck.title}</Text>
                <Text> {currentDeck.questions.length} Questions in this Deck </Text>
                <ScrollView style={styles.questionsView}>
                {currentDeck.questions.map((question, idx)=>(
                    <View key={idx} style={styles.questionSingle}>
                        <Text style={styles.questionLabel}> Question: </Text>
                        <Text style={styles.questionValue}> {question.question} </Text>
                        <Text style={styles.questionLabel}> Answer: </Text>
                        <Text style={styles.questionValue}> {question.answer} </Text>
                    </View>
                ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}onPress={()=>{this.props.navigation.navigate('AddQuestion', {deckId})}}>
                    <Text style={styles.buttonText}>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}onPress={()=>{this.props.navigation.navigate('Quizz', {deckId})}}>
                    <Text style={styles.buttonText}>Start Quizz</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    singleDeckContainer:{
        flex: 1
    },
    singleDeckTitle:{
        textAlign: 'center',
        padding: 6,
        fontSize: 20,
        backgroundColor: 'skyblue',
        borderBottomWidth: 0.5,
    },
    questionsView:{
        padding: 12,
        backgroundColor: '#ddd',
    },
    questionSingle:{
        margin: 5,
        padding: 5,
        borderWidth: 0.5
    },
    questionLabel:{
        backgroundColor: '#333',
        color: '#fff',
        padding: 7
    },
    questionValue:{

    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button:{
        flex: 1,
        padding: 15,
        margin: 2,
        backgroundColor: 'skyblue'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
})
const mapStateToProps = (state)=>({
    decks: state.decks
})
export default connect(mapStateToProps)(SingleDeckView);