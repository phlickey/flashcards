import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {clearLocalNotification} from '../utils';
class Quiz extends Component{
    constructor(){
        super();
        this.state = {
            deck: {
                title: '',
                questions : [{
                    question: '',
                    answer: ''
                }]
            },
            showAnswer: false,
            currentQuestion : 0,
            score: {
                correct: 0,
                incorrect: 0
            },
            quizEnded: false,
        }
    }
    answerQuestion = (correct) => {
        this.setState((state)=>{
            let {score, currentQuestion, showAnswer, quizEnded, deck} = state;

            if (correct){
                score.correct++;
            }else{
                score.incorrect++;
            }
            currentQuestion++;
            showAnswer = false;
            quizEnded = (currentQuestion >= deck.questions.length)? true: false;
            return {...state, score: {...score}, currentQuestion, showAnswer, quizEnded}
        })
    }
    revealAnswer = () =>{
        this.setState({showAnswer: true});
    }
    resetQuiz = () =>{
        this.setState({
            score: {
                correct: 0,
                incorrect: 0
            },
            quizEnded: false,
            currentQuestion: 0
        })
    }
    componentDidMount(){
        let deck = this.props.decks[this.props.navigation.state.params.deckId];
        this.setState({deck});
        clearLocalNotification();
    }
    render(){
        let {deck, score, currentQuestion, showAnswer, quizEnded} = this.state;
        let deckId = this.props.navigation.state.params.deckId;
        return(
            <View>
                {(deck.questions.length===0)&&(
                    <View>
                        <Text> You need to add some questions first! </Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SingleDeck', {deckId})}}>
                            <Text> View Deck </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!quizEnded&&(deck.questions.length!==0)&&(
                    <View>
                        <Text>Quiz on {deck.title}</Text>
                        <Text> Question {currentQuestion+1} of {deck.questions.length} </Text> 
                        <View>
                            <Text>{deck.questions[currentQuestion].question}</Text>
                            {showAnswer&&(
                                <Text>{ deck.questions[currentQuestion].answer} </Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={()=>{this.revealAnswer()}}>
                            <Text> Reveal Answer </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.answerQuestion(true)}}>
                            <Text> Answer Correct </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.answerQuestion(false)}}>
                            <Text> Answer Incorrect </Text>
                        </TouchableOpacity>
                        <Text> Current score: {score.correct} right answers and {score.incorrect} wrong answers </Text>
                    </View>
                )}
                {quizEnded&&(
                    <View>
                        <Text> Quiz over. You got {score.correct} right answers and {score.incorrect} wrong answers </Text>
                        <TouchableOpacity onPress={this.resetQuiz}>
                            <Text> Reset Quiz </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.goBack();
                        }}>
                            <Text> Go Back </Text> 
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}
const mapStateToProps = (state)=>({
    decks : state.decks
});
export default connect(mapStateToProps)(Quiz);

