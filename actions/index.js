import {addCardToDeck, getDecks, initDecks, saveDeckTitle} from '../utils/index';
import defaultData from '../utils/defaultData.json';
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const ADD_NEW_DECK = "ADD_NEW_DECK";
export const GET_DATA = "LOAD_DATA";
export const INIT_DATA = "INIT_DATA";


export function addNewQuestion(deckId, {question, answer}){
    return (dispatch)=>{
        addCardToDeck(deckId, {question, answer}).then(res=>{
            dispatch({
                type: ADD_NEW_QUESTION,
                payload: {
                    deckId,
                    newQuestion:{
                        question,
                        answer
                    }
                }
            })
        });
    }
}

export function initAppState(){
    return (dispatch)=>{
        getDecks().then(async (decks)=>{
            if (decks === null ){
                await initDecks(defaultData);
            }
            let payload = decks!==null ? decks:  defaultData;
            dispatch({
                type: INIT_DATA,
                payload
            });
            
        })
    }
};


export function addNewDeck(deckTitle) {
    return (dispatch) => {
        saveDeckTitle(deckTitle)
            .then(getDecks).then(decks=>{
                dispatch({
                    type: ADD_NEW_DECK,
                    payload: decks
                })
            });
    }
}