import React, { useState, useEffect } from 'react';

const App = () => {
  const [name, setName] = useState('Mary');
  const [surname, setSurname] = useState('Poppins');
  const fullName = name + ' ' + surname;

  useEffect(() => { document.title = fullName; });

  return (
    <div>
      <h1>Hooks Demo</h1>
      <div>Name: <input value={name} onChange={e => setName(e.target.value)} /></div>
      <div>Surname: <input value={surname} onChange={e => setSurname(e.target.value)} /></div>
      <div>Full Name: {fullName}</div>
    </div>
  );
}

export default App;
