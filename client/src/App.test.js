import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory } from '../test/testUtils';
import AppContainer, { App } from './App';

/**
 * @function setup
 * @param {object} state - State for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<AppContainer store={store} />).dive();
  return wrapper;
};

describe('redux properties', () => {
  let wrapper;
  const success = false;
  const gaveUp = false;
  const secretWord = 'party';
  const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];

  beforeEach(() => {
    wrapper = setup({
      success,
      gaveUp,
      secretWord,
      guessedWords
    });
  });

  it('has access to `success` state', () => {
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  it('has access to `gaveUp` state', () => {
    const gaveUpProp = wrapper.instance().props.gaveUp;
    expect(gaveUpProp).toBe(gaveUp);
  });

  it('has access to `secretWord` state', () => {
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });

  it('has access to `guessedWords` state', () => {
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });

  it('`getSecretWord` action creator is a function on the props', () => {
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });

  it('`resetGame` action creator is a function on the props', () => {
    const resetGameProp = wrapper.instance().props.resetGame;
    expect(resetGameProp).toBeInstanceOf(Function);
  });
});

it('`getSecretWord` runs on AppContainer mount', () => {
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    gaveUp: false,
    secretWord: 'party',
    guessedWords: []
  };

  const wrapper = shallow(<App {...props} />);
  wrapper.instance().componentDidMount();

  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});
