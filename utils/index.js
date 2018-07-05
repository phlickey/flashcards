import {AsyncStorage} from 'react-native';
import data from './sampledata.json';
export const FLASHCARD_STORAGE_KEY = 'Flashcards:flashcards'
export async function initialiseAsyncStorage(){
    return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
}
// getDecks: return all of the decks along with their titles, questions, and answers.
export async function getDecks(){
    let decks = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
    if (decks===null) {
        return {}
    }else {
        return decks;
    }
}
// getDeck: take in a single id argument and return the deck associated with that id. 
export async function getDeck(deckId){
    let deck = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY+`:${deckId}`);
    return deck;
}

// saveDeckTitle: take in a single title argument and add it to the decks. 
export function saveDeckTitle({deckId, title}) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deckId]:{title, questions: []}
    }))
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export async function addCardToDeck(deckId, {question, answer}){
    let deck = await getDeck(deckId);
    deck.questions.push({
        question, answer
    });
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY+`:${deckId}`, JSON.stringify(deck));
}