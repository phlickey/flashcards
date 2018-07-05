import React from 'react';
import Flashcards from './components/Flashcards';
import reducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {setLocalNotification} from './utils';
let store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
       <Flashcards />
      </Provider>
    );
  }
}

