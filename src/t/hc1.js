import React, { createContext } from 'react';
import { compose, withState, withEffect, withEventHandler, withWindowEventHandler, withInterval, withMemo, withRef, withReducer, withContext, withRedux } from 'hookompose';
import myReducer from './reducer';

const MyContext = createContext();

const _Counter = ({ count, dispatch }) =>
  <div>
    Reducer count: {count}
    <button onClick={() => dispatch({ type: 'inc' })}>+</button>
    <button onClick={() => dispatch({ type: 'dec' })}>-</button>
  </div>;

const Counter = compose(
  withRedux(s => s.count, 'count')
)(_Counter);

const App = ({ name, setName, surname, setSurname, fullName, width, counter, inputEl, state, dispatch }) =>
  <div>
    <div>Name: <input ref={inputEl} value={name} onChange={e => setName(e.target.value)} /></div>
    <div>Surname: <input value={surname} onChange={e => setSurname(e.target.value)} /></div>
    <div>Full Name: {fullName}</div>
    <div>Width: {width}</div>
    <div><button id="btn1">Add</button> Counter: {counter}</div>
    <button onClick={() => inputEl.current.focus()}>Focus</button>
    <Counter />
  </div>

export default compose(
  withState('name', 'Mary'),
  withState('surname', 'Poppins'),
  withMemo(p => ({ fullName: p.name + ' ' + p.surname }), p => [p.name, p.surname]),
  withEffect(p => document.title = p.fullName),
  withState('width', window.innerWidth),
  withWindowEventHandler('resize', p => p.setWidth(window.innerWidth)),
  withState('counter', 0),
  withEventHandler('#btn1', 'click', p => p.setCounter(c => c + 2), []),
  withInterval(p => p.setCounter(c => c + 3), 1000, []),
  withRef('inputEl')
)(App);
