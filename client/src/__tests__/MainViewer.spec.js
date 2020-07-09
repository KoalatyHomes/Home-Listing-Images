import React from 'react';
import { shallow, mount, render } from 'enzyme';
import data from '../../../database/testData';
import styles from '../components/MainViewer/MainViewer.css';

import MainViewer from '../components/MainViewer/MainViewer.jsx';

describe('MainViewer', () => {
  const wrapper = shallow(<MainViewer home={data[0]} />);

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should dynamically inital image', () => {
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('Should dynamically render image count', () => {
    let text = wrapper.find('.imgCount').text();
    expect(text).toEqual('48');
  });
});
