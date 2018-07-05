import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import {connect} from 'react-redux';

class DeckList extends Component {
    render (){
        let {decks} = this.props;
        return(
            <ScrollView >
                <Text style={styles.titleText}>Your Decks</Text>
                {Object.keys(decks).concat(Object.keys(decks)).map((deckId, idx)=>{
                    let title = decks[deckId].title;
                    return (<View key={idx} style={styles.deckSummaryContainer}>
                        <Text style={styles.deckHeader}>{title}</Text>
                        <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('Quizz', {deckId})}}>
                            <Text>Go To Quizz </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('AddQuestion', {deckId})}}>
                            <Text>Add AddQuestion</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('SingleDeck', {deckId})}}>
                            <Text>View Single Deck</Text>
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
        flex: 1
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
    }
});

function mapStateToProps(state){
    return {
        decks: state.decks    
    }
}
export default connect(mapStateToProps)(DeckList);