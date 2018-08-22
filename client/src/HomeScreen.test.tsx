import * as React from 'react';

import { shallow } from 'enzyme';

import HomeScreen from './HomeScreen';

describe('home screen', () => {
  let wrapper:any = null
  let mockFn:any = null
  
  beforeEach(() => {
    mockFn = jest.fn()
    wrapper = shallow(<HomeScreen onCreateNewNote={mockFn}/>)
  })
  
  it('should have a title with "Create a Daily Journal"', () => {
    const title = wrapper.find('.title')
    expect(title).toHaveLength(1)
    expect(title.text()).toEqual('Create a Daily Journal')
  })

  it('should have a message with "DANGER: Your journal is accesible by anyone with the link"', () => {
    const note = wrapper.find('.note')
    expect(note).toHaveLength(1)
    expect(note.text()).toEqual('DANGER: Your journal is accesible by anyone with the link')
  })

  it('should have a button with "CREATE A NEW JOURNAL"', () => {
    const button = wrapper.find('.button')
    expect(button).toHaveLength(1)
    expect(button.text()).toEqual('CREATE A NEW JOURNAL')

    button.simulate('click')

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
  