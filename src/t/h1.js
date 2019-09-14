import React, { useState, useEffect, useMemo, useRef, useReducer, createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MyContext = createContext();

const Counter = () => {
  const count = useSelector(s => s.count);
  const dispatch = useDispatch();
  return (
    <div>
      Reducer count: {count}
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      <button onClick={() => dispatch({ type: 'dec' })}>-</button>
    </div>
  );
}

const App = () => {
  const [name, setName] = useState('Mary');
  const [surname, setSurname] = useState('Poppins');
  const fullName = useMemo(() => { console.log('memo'); return name + ' ' + surname; });

  useEffect(() => { document.title = fullName; });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h);
    return () => { console.log('cleanup'); window.removeEventListener('resize', h); }
  }, []);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const btn1 = document.getElementById('btn1');
    const h = () => setCounter(c => c + 1);
    btn1.addEventListener('click', h);
    return () => btn1.removeEventListener('click', h);
  }, []);
  
  useEffect(() => {
    const id = setInterval(() => {
      setCounter(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const inputEl = useRef(null);

  //const [state, dispatch] = useReducer(myReducer, { count: 0 });

  return (
    <div>
      <h1>Hooks Demo</h1>
      <div>Name: <input ref={inputEl} value={name} onChange={e => setName(e.target.value)} /></div>
      <div>Surname: <input value={surname} onChange={e => setSurname(e.target.value)} /></div>
      <div>Full Name: {fullName}</div>
      <div>Width: {width}</div>
      <div><button id="btn1">Add</button> Counter: {counter}</div>
      <button onClick={() => inputEl.current.focus()}>Focus</button>
      <Counter />
    </div>
  );
}

export default App;
