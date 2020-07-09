import React from 'react';
import { shallow, mount, render } from 'enzyme';
import data from '../../../database/testData';
import styles from '../components/Modal/Modal.css';

import Modal from '../components/Modal/Modal.jsx';

describe('MainViewer', () => {
  const wrapper = shallow(<Modal home={data[0]} />);

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should fully render TourSchedule', () => {
    expect(wrapper.find('TourSchedule').exists()).toBe(true);
  });

  it('Should cycle through images', () => {
    wrapper.find('.cycleButton').at(1).simulate('click');
    expect(wrapper.state('image')).toEqual(1);
  });

  it('Should cycle through images backwards', () => {
    wrapper.find('.cycleButton').at(0).simulate('click');
    wrapper.find('.cycleButton').at(0).simulate('click');
    wrapper.find('.cycleButton').at(1).simulate('click');
    wrapper.find('.cycleButton').at(0).simulate('click');
    expect(wrapper.state('image')).toEqual(48);
  });
});