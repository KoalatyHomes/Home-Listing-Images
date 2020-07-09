import React from 'react';
import { shallow, mount, render } from 'enzyme';
import data from '../../../database/testData';
import styles from '../components/SaveButton/SaveButton.css';

import SaveButton from '../components/SaveButton/SaveButton.jsx';

describe('MainViewer', () => {
  const wrapper = shallow(<SaveButton />);

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should cycle through images', () => {
    wrapper.find('.headerbtn').at(0).simulate('click');
    expect(wrapper.state('saved')).toEqual(true);
  });
});
