import { ADD_NEW_QUESTION, INIT_DATA, ADD_NEW_DECK } from "../actions";


export default reducer = (state = {decks : {}}, action) =>{
    let decks = {...state.decks}
    switch (action.type){
        case ADD_NEW_QUESTION:
            let deckId = action.payload.deckId;
            let {question, answer} = action.payload.newQuestion;
            let deckToUpdate = decks[deckId];
            deckToUpdate.questions.push({question, answer});
        return {
            decks: {
                ...decks,
            [deckId]: deckToUpdate
            }
        }
        case ADD_NEW_DECK: 
            let newDecks = {...action.payload};
            return {
                decks: {
                    ...decks,
                    ...newDecks
                }
            }
        case INIT_DATA:
            let decksData = action.payload;
            return {
                decks: {
                   ...decksData
                }
            }
        default:
            return state;
    }
}