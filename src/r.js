import React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';

const App = ({ name, setName, surname, setSurname, fullName }) =>
  <div>
    <h1>Recompose Demo</h1>
    <div>Name: <input value={name} onChange={e => setName(e.target.value)} /></div>
    <div>Surname: <input value={surname} onChange={e => setSurname(e.target.value)} /></div>
    <div>Full Name: {fullName}</div>
  </div>

export default compose(
  withState('name', 'setName', 'Mary'),
  withState('surname', 'setSurname', 'Poppins'),
  withProps(p => ({ fullName: p.name + ' ' + p.surname })),
  lifecycle({
    componentDidMount() { document.title = this.props.fullName; },
    componentDidUpdate() { document.title = this.props.fullName; }
  }),
)(App);