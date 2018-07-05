import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { addNewDeck } from '../actions';
//import {connect} from 'react-redux';

class NewDeck extends Component {
    constructor(){
        super();
        this.state = {
            title: ''
        }
    }
    addDeck = () => {
        let title = this.state.title;
        this.props.addNewDeck(title);
        this.setState({
            title: ''
        })
        this.props.navigation.goBack();
    }
    render (){
        return(
            <KeyboardAvoidingView behavior='padding' style={{flex:1, backgroundColor:'purple', justifyContent: 'center'}}>
                <Text> New Deck </Text>
                <TextInput value={this.state.title} placeholder='New Deck Title' onChangeText={(title)=>{
                    this.setState({
                        title
                    })
                }}/>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity onPress={this.addDeck} style={{padding: 15, backgroundColor:'white', margin: 5}}>
                    <Text> Add Deck </Text>
                </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const mapDispatchToProps = (dispatch)=>({
    addNewDeck:  (title) => {dispatch(addNewDeck(title))}
});
export default connect(null, mapDispatchToProps)(NewDeck);