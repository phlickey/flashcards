import {AsyncStorage} from 'react-native';
import uuid from 'uuid/v4';
import { Notifications, Permissions } from 'expo'
export const FLASHCARD_STORAGE_KEY = 'Flashcards:flashcards';
export const FLASHCARD_NOTIFICATION_KEY = 'Flashcards:notifications';
// getDecks: return all of the decks along with their titles, questions, and answers.
export async function getDecks(){
    // AsyncStorage.clear()
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


export function clearLocalNotification () {
    return AsyncStorage.removeItem(FLASHCARD_NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => ({
    title: "Don't forget to study",
    body: "Quiz yourself today, to keep your skills sharp!",
    ios: {
    sound: true,
    },
    android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
    }
});

  
export function setLocalNotification () {
    AsyncStorage.getItem(FLASHCARD_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()
                            .then(()=>{
                                let tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(21);
                                tomorrow.setMinutes(0);
                                tomorrow.setSeconds(0);
                                return Notifications.scheduleLocalNotificationAsync(
                                    createNotification(),
                                    {
                                    time: tomorrow,
                                    repeat: 'day',
                                    }
                                )
                            }).then(()=>{
                                AsyncStorage.setItem(FLASHCARD_NOTIFICATION_KEY, JSON.stringify({timeSet:true}))
                            })
                    }
                })
            }
        })
}