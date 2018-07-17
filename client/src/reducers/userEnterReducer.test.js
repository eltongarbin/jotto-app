import { actionTypes } from '../actions';
import userEnterReducer from './userEnterReducer';

it('returns default initial state of `null` when no action is passed', () => {
  const newState = userEnterReducer(undefined, {});
  expect(newState).toBeNull();
});

it('returns state of "inProgress" upon receiving an action of type `USER_ENTERING`', () => {
  const newState = userEnterReducer(undefined, {
    type: actionTypes.USER_ENTERING
  });
  expect(newState).toBe('inProgress');
});

it('returns state of "done" upon receiving an action of type `USER_ENTERED`', () => {
  // state is most likely to be 'inProgress' at this point
  const newState = userEnterReducer('inProgress', {
    type: actionTypes.USER_ENTERED
  });
  expect(newState).toBe('done');
});

it('returns state of `null` upon receiving an action of type `RESET_GAME`', () => {
  // state is most likely to be 'done' at this point
  const newState = userEnterReducer('done', { type: actionTypes.RESET_GAME });
  expect(newState).toBeNull();
});
