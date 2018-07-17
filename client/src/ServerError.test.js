import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import ServerError from './ServerError';

// no need for setup function here: no props or state
it('renders without error', () => {
  const wrapper = shallow(<ServerError />);
  const component = findByTestAttr(wrapper, 'component-server-error');
  expect(component.length).toBe(1);
});

it('renders non-empty text', () => {
  const wrapper = shallow(<ServerError />);
  const component = findByTestAttr(wrapper, 'component-server-error');
  expect(component.text().length).not.toBe(0);
});
