import React from 'react';
import moment from 'moment';
import { shallow, mount, render } from 'enzyme';
import data from '../../../database/testData';
import styles from '../components/TourSchedule/TourSchedule.css';

import TourSchedule from '../components/TourSchedule/TourSchedule.jsx';

describe('MainViewer', () => {
  const wrapper = render(<TourSchedule home={data[0]} />);

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render Calendar Component', () => {
    expect(wrapper.find('Calendar').exists()).toBe(true);
  });

  // it('Should dynamically render Calendar Data', () => {
  //   expect(wrapper.find('#calendarDay')[0].children[0].data).toBe(moment().format('ddd'));
  //   expect(wrapper.find('.calendarDate')[0].children[0].data).toBe(moment().format('D'));
  //   expect(wrapper.find('#calendarMonth')[0].children[0].data).toBe(moment().format('MMM'));
  // });

  // it('Should change state', () => {
  //   shallowRend.setState({ page: 1 });
  //   expect(shallowRend.find('.calendarScrolled')).toHaveLength(1);
  // });
});
