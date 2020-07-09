import React from 'react';
import moment from 'moment';
import { shallow, mount, render } from 'enzyme';
import data from '../../../database/testData';
import styles from '../components/Calendar/Calendar.css';

import Calendar from '../components/Calendar/Calendar.jsx';
import CalendarElement from '../components/Calendar/Calendar.jsx';

describe('MainViewer', () => {
  const wrapper = render(<Calendar home={data[0]} />);
  const shallowRend = shallow(<Calendar home={data[0]} />, {disableLifecycleMethods: true});
  // console.log(moment().format('ddd D MMM'));

  it('Should render Date Elements', () => {
    expect(wrapper.find('.calendarElement')).toHaveLength(8);
  });

  it('Should dynamically render Calendar Data', () => {
    expect(wrapper.find('#calendarDay')[0].children[0].data).toBe(moment().format('ddd'));
    expect(wrapper.find('.calendarDate')[0].children[0].data).toBe(moment().format('D'));
    expect(wrapper.find('#calendarMonth')[0].children[0].data).toBe(moment().format('MMM'));
  });

  it('Should change state', () => {
    shallowRend.setState({ page: 1 });
    expect(shallowRend.find('.calendarScrolled')).toHaveLength(1);
  });
});
