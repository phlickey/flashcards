import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import {connect} from 'react-redux';

class DeckList extends Component {
    render (){
        let {decks} = this.props;
        return(
            <ScrollView style={styles.list}>
                <Text style={styles.titleText}>Your Decks</Text>
                {Object.keys(decks).map((deckId, idx)=>{
                    let {title, questions }= decks[deckId];
                    return (<View key={idx} style={styles.deckSummaryContainer}>
                        <Text style={styles.deckHeader}>{title}: {questions.length} Questions </Text>
                        <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('Quizz', {deckId})}}>
                            <Text style={styles.center}>Go To Quizz </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('AddQuestion', {deckId})}}>
                            <Text style={styles.center}>Add Question</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('SingleDeck', {deckId})}}>
                            <Text style={styles.center}>View Deck</Text>
                        </TouchableHighlight>
                        </View>
                        </View>)
                })}
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    button : {
        backgroundColor: 'lightgreen',
        padding: 5,
        margin: 6,
        flex: 1,
    },
    center:{
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    deckSummaryContainer:{
        backgroundColor: '#5e5e5e',
        marginBottom: 25
    },
    deckHeader:{
        backgroundColor: '#333',
        color: '#fff',
        padding: 25
    },
    titleText:{
        backgroundColor: 'green',
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        padding: 6
    },
    list:{
        backgroundColor: '#444'
    }
});

function mapStateToProps(state){
    return {
        decks: state.decks    
    }
}
export default connect(mapStateToProps)(DeckList);