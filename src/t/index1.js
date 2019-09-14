import React from 'react';
import ReactDOM from 'react-dom';
import App from './hc';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import myReducer from './reducer';

const store = createStore(myReducer, { count: 0 });

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
