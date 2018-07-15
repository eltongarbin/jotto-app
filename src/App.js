import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSecretWord } from './actions';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWord} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => {
  return { success, guessedWords, secretWord };
};

export default connect(
  mapStateToProps,
  { getSecretWord }
)(App);
