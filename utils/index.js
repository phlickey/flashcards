import {AsyncStorage} from 'react-native';
import uuid from 'uuid/v4';
export const FLASHCARD_STORAGE_KEY = 'Flashcards:flashcards'
// getDecks: return all of the decks along with their titles, questions, and answers.
export async function getDecks(){
    //AsyncStorage.clear()
    let decks = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
    return JSON.parse(decks);
}
// getDeck: take in a single id argument and return the deck associated with that id. 
export async function getDeck(deckId){
    let deck = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY+`:${deckId}`);
    return JSON.parse(deck);
}

// saveDeckTitle: take in a single title argument and add it to the decks. 
export function saveDeckTitle(title) {
    let id = uuid();
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [id]:{title, questions: []}
    }))
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export async function addCardToDeck(deckId, {question, answer}){
    let decks = await getDecks();
    let deck = decks[deckId];
    deck.questions.push({
        question, answer
    });
    let newDecks = {
        ...decks,
        [deckId]:{
            ...deck
        }
    }
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newDecks));
}

export async function initDecks(decks){
    return await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));  
}


