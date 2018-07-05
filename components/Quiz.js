import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
            <View style={styles.quizView}>
                {(deck.questions.length===0)&&(
                    <View style={styles.noQuestionsView}>
                        <Text style={styles.noQuestionsText}> You need to add some questions first! </Text>
                        <TouchableOpacity style={styles.noQuestionsButton} onPress={()=>{this.props.navigation.navigate('SingleDeck', {deckId})}}>
                            <Text style={styles.noQuestionsText} > View Deck </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!quizEnded&&(deck.questions.length!==0)&&(
                    <View style={styles.quizLiveView}>
                        <Text style={styles.quizLiveTitle} >Quiz on {deck.title}</Text>
                        <Text style={styles.quizLiveRemaining}> Question {currentQuestion+1} of {deck.questions.length} </Text> 
                        <View style={styles.quizLiveCurrentQuestion}>
                            <Text style={styles.quizLiveCurrentQuestionQ}>{deck.questions[currentQuestion].question}</Text>
                            {showAnswer&&(
                                <Text style={styles.quizLiveCurrentQuestionA}>{ deck.questions[currentQuestion].answer} </Text>
                            )}
                        </View>
                        <View style={styles.quizLiveButtons}>
                        {(!showAnswer)&&
                            (<TouchableOpacity style={styles.quizLiveButton} onPress={()=>{this.revealAnswer()}}>
                                <Text style={styles.quizLiveViewButtonText}> Reveal Answer </Text>
                            </TouchableOpacity>)
                        }
                        {(showAnswer)&&(
                            <View>
                                <Text> Did you get it right? </Text>
                                <TouchableOpacity style={styles.quizLiveButton} onPress={()=>{this.answerQuestion(true)}}>
                                    <Text style={styles.quizLiveViewButtonText}> Answer Correct </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quizLiveButton} onPress={()=>{this.answerQuestion(false)}}>
                                    <Text style={styles.quizLiveViewButtonText}> Answer Incorrect </Text>
                                </TouchableOpacity>
                            </View>
                        )

                        }
                        
                        
                        
                        </View>
                        <Text style={styles.quizLiveViewScore}> Current score: {score.correct} right answers and {score.incorrect} wrong answers </Text>
                    </View>
                )}
                {quizEnded&&(
                    <View style={styles.endedView}>
                        <Text style={styles.endedViewText}> Quiz over. You got {score.correct} right answers and {score.incorrect} wrong answers </Text>
                        <View style={styles.endedViewButtons}>
                        <TouchableOpacity style={styles.endedViewButton} onPress={this.resetQuiz}>
                            <Text> Reset Quiz </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.endedViewButton}onPress={()=>{
                            this.props.navigation.goBack();
                        }}>
                            <Text> Go Back </Text> 
                        </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    quizView:{
        padding: 10,
        flex: 1
    }, noQuestionsView:{
        flex: 1,
        padding: 50,
        backgroundColor: 'yellow',
        justifyContent: 'center'
    }, noQuestionsText:{
        fontSize: 25,
        textAlign: 'center'
    },
    noQuestionsButton:{
        padding: 10,
        borderWidth: 0.5,
        backgroundColor: 'white',
        margin: 15
    }, quizLiveView:{
        flex: 1,
        backgroundColor: 'fuchsia'
    }, quizLiveTitle:{
        textAlign: 'center',
        padding: 5,
        fontSize: 20
    }, quizLiveRemaining: {
        textAlign: 'right',
        fontStyle: 'italic'
    }, quizLiveCurrentQuestion:{
        borderWidth: 0.5,
        padding: 15,
        margin: 5,
        backgroundColor: 'rgba(255,255,255,0.5)'
    }, quizLiveCurrentQuestionQ:{
        textAlign: "center",
        marginBottom: 5
    }, quizLiveCurrentQuestionA:{
        fontStyle: 'italic',
        padding: 10,
        fontSize: 20
    }, quizLiveButtons:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    }, quizLiveButton:{
        margin: 6,
        padding: 15,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.75)'
    }, endedView:{
        flex: 1,
        padding: 25,
        justifyContent:'center',
        backgroundColor: 'skyblue'
    }, endedViewText:{
        fontSize: 22,
        textAlign: 'center',
        margin: 10
    } , endedViewButtons:{
        flexDirection: 'row',
        justifyContent: 'center'
    }, endedViewButton:{
        padding: 15,
        margin: 6,
        backgroundColor: 'rgba(255,255,255,0.85)'
    }
});
const mapStateToProps = (state)=>({
    decks : state.decks
});
export default connect(mapStateToProps)(Quiz);

