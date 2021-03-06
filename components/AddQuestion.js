import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {addNewQuestion} from '../actions';
import {connect} from 'react-redux';
class AddQuestion extends Component{
    constructor(){
        super()
        this.state ={
            question: '',
            answer: ''
        }
    }
    submit = () => {
        let{ question, answer }= this.state;
        let deckId = this.props.navigation.state.params.deckId;
        let addNewQuestion = this.props.addNewQuestion;
        if (question.length&&answer.length){
            addNewQuestion(deckId, {question, answer});
            this.setState({
                question: '',
                answer: ''
            })
            this.props.navigation.goBack();
        }
    }
    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={{justifyContent: 'center', flex: 1, backgroundColor: 'green'}}>
                <View>
                <Text style={{color: 'white', fontSize: 20}}> Question: </Text>
                <TextInput style={{padding: 15, backgroundColor: '#fff', borderRadius: 5}}value={this.state.question} placeholder={'Question'} onChangeText={text=>{
                    this.setState({
                        question: text
                    })
                }}/>
                 <Text style={{color: 'white', fontSize: 20}}> Answer: </Text>
                <TextInput style={{padding: 15, backgroundColor: '#fff', borderRadius: 5}}value={this.state.answer} placeholder={'Answer'} onChangeText={text=>{
                    this.setState({
                        answer: text
                    })
                }}/>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.submit} style={{padding: 15, backgroundColor:'white', margin: 5}}>
                        <Text> Add Question </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    addNewQuestion: (deckId, {question, answer}) => {dispatch(addNewQuestion(deckId, {question, answer}))}
})
export default connect(null, mapDispatchToProps)(AddQuestion);