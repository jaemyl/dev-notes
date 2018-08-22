import * as React from 'react';

import { mount, shallow } from 'enzyme';

import App from './App';

describe('app', () => {
  let shallowWrapper:any = null
  let mountWrapper:any = null

  beforeEach(() => {
    shallowWrapper = shallow(<App/>)
    mountWrapper = mount(<App/>)
  })

  describe('when starts', () => {
    it('should display home screen', () => {
      expect(shallowWrapper.find('HomeScreen')).toHaveLength(1)
    })
  
    it('should switch to diary screen when "create a new journal" clicked on home screen', () => {
      expect(mountWrapper.find('HomeScreen')).toHaveLength(1)
  
      const button = mountWrapper.find('.button')
      button.simulate('click')
  
      expect(mountWrapper.find('DiaryScreen')).toHaveLength(1)
    })
  })
  
  describe('when in diary screen', () => {
    it('should switch from diary screen to edit screen when entry is clicked', () => {
      expect(mountWrapper.find('HomeScreen')).toHaveLength(1)
  
      const button = mountWrapper.find('.button')
      button.simulate('click')
  
      expect(mountWrapper.find('DiaryScreen')).toHaveLength(1)
      
      const entry = mountWrapper.find('.entry')
      entry.simulate('click')
  
      expect(mountWrapper.find('EditScreen')).toHaveLength(1)
    })
  
    it('should display same entry content when switching from diary screen to edit screen', () => {
      expect(mountWrapper.find('HomeScreen')).toHaveLength(1)
  
      const button = mountWrapper.find('.button')
      button.simulate('click')
  
      expect(mountWrapper.find('DiaryScreen')).toHaveLength(1)
  
      const entryInDiaryScreen = mountWrapper.find('.entry').text()
      
      const entry = mountWrapper.find('.entry')
      entry.simulate('click')
  
      expect(mountWrapper.find('EditScreen')).toHaveLength(1)
  
      const entryInEditScreen = mountWrapper.find('.entry').text()
  
      expect(entryInEditScreen).toEqual(entryInDiaryScreen)
    })
  })
  
  describe('when in edit screen', () => {
    it('should switch from edit screen to diary screen when confirm button is clicked', () => {
      expect(mountWrapper.find('HomeScreen')).toHaveLength(1)
  
      const button = mountWrapper.find('.button')
      button.simulate('click')
  
      expect(mountWrapper.find('DiaryScreen')).toHaveLength(1)
      
      const entry = mountWrapper.find('.entry')
      entry.simulate('click')
  
      expect(mountWrapper.find('EditScreen')).toHaveLength(1)
  
      const confirm = mountWrapper.find('.confirm')
      confirm.simulate('click')
  
      expect(mountWrapper.find('DiaryScreen')).toHaveLength(1)
    })
  })
})
