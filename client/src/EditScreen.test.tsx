import * as React from 'react';

import { shallow } from 'enzyme';

import EditScreen from './EditScreen';
import Util from './Util';

describe('edit screen', () => {
  let mockFn:any = null
  let wrapper:any = null
  
  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = shallow(
        <EditScreen
            date={Util.getDate()}
            entry={''}
            onSaveNote={mockFn}
        />)
  })
  
  it('should have editable entry content', () => {
    const entry = wrapper.find('textarea.entry')
    expect(entry).toHaveLength(1)
  })

  it('should have button to save entry content', () => {
      const button = wrapper.find('.confirm')
      expect(button).toHaveLength(1)

      button.simulate('click')

      expect(mockFn).toHaveBeenCalledTimes(1)
  })
})