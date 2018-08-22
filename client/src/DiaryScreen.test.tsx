import * as React from 'react';

import { shallow } from 'enzyme';

import DiaryScreen from './DiaryScreen';
import Util from './Util';

describe('diary screen', () => {
  let mockOnEditNote:any = null
  let mockOnClickLeftButton:any = null
  let mockOnClickRightButton:any = null
  let mockOnClickHomeButton:any = null
  let wrapper:any = null
  
  beforeEach(() => {
    mockOnEditNote = jest.fn()
    mockOnClickLeftButton = jest.fn()
    mockOnClickRightButton = jest.fn()
    mockOnClickHomeButton = jest.fn()

    wrapper = shallow(
      <DiaryScreen
        date={Util.getDate()}
        entry={'test entry'}
        onEditNote={mockOnEditNote}
        onClickLeftButton={mockOnClickLeftButton}
        onClickRightButton={mockOnClickRightButton}
        onClickHomeButton={mockOnClickHomeButton}
      />)
  })
  
  it('should have journal date to be today in format "May/26"', () => {
    const date = wrapper.find('.date')
    expect(date).toHaveLength(1)

    const todayInFormatMay26 = Util.getDate()
    expect(date.text()).toEqual(todayInFormatMay26)
  })

  it('should have prompt string', () => {
    const prompt = wrapper.find('.prompt')
    expect(prompt).toHaveLength(1)
  })

  it('should have a home button', () => {
    const homeBtn = wrapper.find('.homebutton')
    expect(homeBtn).toHaveLength(1)

    expect(homeBtn.text()).toEqual('HOME')
  })

  it('should have a clickable left button', () => {
    const leftBtn = wrapper.find('.leftbutton')
    expect(leftBtn).toHaveLength(1)

    leftBtn.simulate('click')

    expect(mockOnClickLeftButton).toHaveBeenCalledTimes(1)
  })

  it('should have a clickable right button', () => {
    const rightBtn = wrapper.find('.rightbutton')
    expect(rightBtn).toHaveLength(1)

    rightBtn.simulate('click')

    expect(mockOnClickRightButton).toHaveBeenCalledTimes(1)
  })
})