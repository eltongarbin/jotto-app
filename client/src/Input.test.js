import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import InputContainer, { Input } from './Input';

/**
 * Factory function to create a ShallowWrapper for the InputContainer component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<InputContainer store={store} />).dive();
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });

    it('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    it('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });

    it('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });

    it('renders "give up" button', () => {
      const submitButton = findByTestAttr(wrapper, 'give-up-button');
      expect(submitButton.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });

    it('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    it('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });

    it('does not render submit button', () => {
      const submit = findByTestAttr(wrapper, 'submit-button');
      expect(submit.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  it('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  it('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

it('calls `giveUp` prop upon "Give Up" button click', () => {
  // create a mock function so we can see whether it's called on click
  const giveUpMock = jest.fn();
  // set up InputContainer, with giveUpMock as a prop
  const wrapper = shallow(<Input giveUp={giveUpMock} />);

  // simulate click on giveUp button
  const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
  giveUpButton.simulate('click', { preventDefault() {} });

  // expect the mock to have been called once
  expect(giveUpMock.mock.calls.length).toBe(1);
});

describe('`guessWord` action creator', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';

  beforeEach(() => {
    // create a mock function for `guessWord`
    guessWordMock = jest.fn();
    // set up InputContainer, with guessWordMock as a prop
    wrapper = shallow(<Input guessWord={guessWordMock} />);
    // simulate the input
    wrapper.instance().inputBox.current = { value: guessedWord };

    // simulate click on submit button
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click', { preventDefault() {} });
  });

  it('`guessWord` was called once', () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  it('`guessWord` was called with input value as argument', () => {
    const guessedWordArg = guessWordMock.mock.calls[0][0];
    expect(guessedWordArg).toBe(guessedWord);
  });

  it('input box clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  });
});
