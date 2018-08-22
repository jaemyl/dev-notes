import * as React from 'react';

import './App.css';

import DiaryScreen from './DiaryScreen'
import EditScreen from './EditScreen'
import HomeScreen from './HomeScreen'
import Util from './Util'

interface Note {
  date: string,
  entry: string
}

type ScreenType = 'home' | 'edit' | 'diary' | 'loading' | 'saving'

interface AppState {
  currentScreen: ScreenType
  currentDate: string
  currentEntry: string
}

class App extends React.Component<any, AppState> {
  constructor(props:any) {
    super(props)

    this.onCreateNewNote = this.onCreateNewNote.bind(this)
    this.onEditNote = this.onEditNote.bind(this)
    this.onClickLeftButton = this.onClickLeftButton.bind(this)
    this.onClickRightButton = this.onClickRightButton.bind(this)
    this.onClickHomeButton = this.onClickHomeButton.bind(this)
    this.onSaveNote = this.onSaveNote.bind(this)

    this.state = {
      currentScreen: 'home',
      currentDate: '',
      currentEntry: ''
    }
  }

  /////////////////////////////////////////////////////////////
  
  public render() {
    console.log('App render()')
    this.dumpState()

    let screen = null
    if(this.state.currentScreen === 'home') {
      screen = <HomeScreen onCreateNewNote={this.onCreateNewNote}/>
    }
    else if (this.state.currentScreen === 'diary') {
      screen =
        <DiaryScreen
          date={this.state.currentDate}
          entry={this.state.currentEntry}
          onEditNote={this.onEditNote}
          onClickLeftButton={this.onClickLeftButton}
          onClickRightButton={this.onClickRightButton}
          onClickHomeButton={this.onClickHomeButton}
        />
    }
    else if (this.state.currentScreen === 'edit') {
      screen =
        <EditScreen
          date={this.state.currentDate}
          entry={this.state.currentEntry}
          onSaveNote={this.onSaveNote}
        />
    }
    else if (this.state.currentScreen === 'loading') {
      screen = <div>Loading...</div>
    }
    else if (this.state.currentScreen === 'saving') {
      screen = <div>Saving...</div>
    }
    else {
      screen = <div>Unexpected screen:{this.state.currentScreen}</div>
    }

    return (
      <div className="app">
        {screen}
      </div>
    );
  }

  /////////////////////////////////////////////////////////////
  // callback for home screen
  private onCreateNewNote() {
    console.log('onCreateNewNote()')
    const date = Util.getDate()
    this.loadNoteFromServer(date)
    this.setState({
      currentScreen: 'loading'
    })
  }

  ///////////////////////////////////////////////////////////////
  // callback for diary screen
  private onEditNote() {
    console.log('onEditNote')
    this.setState({
      currentScreen: 'edit'
    })
  }

  private onClickLeftButton() {
    console.log('onClickLeftButton')
    const date = Util.getPrevDate(this.state.currentDate)
    this.loadNoteFromServer(date)
    this.setState({
      currentScreen: 'loading'
    })
  }

  private onClickRightButton() {
    console.log('onClickRightButton')
    const date = Util.getNextDate(this.state.currentDate)
    this.loadNoteFromServer(date)
    this.setState({
      currentScreen: 'loading'
    })
  }
  private onClickHomeButton() {
    console.log('onClickHomeButton')
    const date = Util.getDate()
    this.loadNoteFromServer(date)
    this.setState({
      currentScreen: 'loading'
    })
  }

  ////////////////////////////////////////////////////////////////
  // callback for edit screen
  private onSaveNote(date:string, entry:string) {
    console.log('onSaveNote(' + date + ',' + entry + ')')
    this.saveNoteToServer(date, entry)
    this.setState({
      currentScreen: 'saving'
    })
  }

  ////////////////////////////////////////////////////////////////

  private async loadNoteFromServer(date:string) {
    console.log('loadNoteFromServer()')
    const resp = await fetch(`/load/${date}`)
    const note = await resp.json()
    console.log('note:' + JSON.stringify(note))
    this.setState({
      currentScreen: 'diary',
      currentDate: note ? note.date : date,
      currentEntry: note ? note.entry : ''
    })
  }

  private async saveNoteToServer(date:string, entry:string) {
    console.log('saveNoteToServer()')
    const note:Note = {
      'date': date,
      'entry': entry,
    };
    const response = await fetch("/save", {
      method: "POST",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(note)
    });
    const json = await response.json();
    console.log(json)
    this.setState({
      currentScreen: 'diary',
      currentDate: date,
      currentEntry: entry
    })
  }

  ///////////////////////////////////////////////////////////////////

  private dumpState() {
    console.log('---- state ----')
    console.log(JSON.stringify(this.state))
    console.log('---------------')
  }
}

export default App;
