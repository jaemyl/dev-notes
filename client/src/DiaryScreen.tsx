import * as React from 'react';

import './DiaryScreen.css';

// import Util from './Util';

interface IDiaryScreenProps {
    date: string
    entry: string
    onEditNote: () => void
    onClickLeftButton: () => void
    onClickHomeButton: () => void
    onClickRightButton: () => void    
}

class DiaryScreen extends React.Component<IDiaryScreenProps> {
    constructor(props:IDiaryScreenProps) {
        super(props)
        this.onEditNote = this.onEditNote.bind(this)
    }

    public render() {
        return (
            <div className='diaryscreen'>
                <div className='date'>
                    {this.props.date}
                </div>
                <div className='entry' onClick={this.onEditNote}>
                    <pre>
                        {this.props.entry}
                    </pre>
                </div>
                <footer className='footer'>
                    <div className='leftbutton' onClick={this.props.onClickLeftButton}/>
                    <div className='homebutton' onClick={this.props.onClickHomeButton}>HOME</div>
                    <div className='rightbutton' onClick={this.props.onClickRightButton}/>
                </footer>

            </div>
        )
    }

    private onEditNote() {
        this.props.onEditNote()
    }
}
export default DiaryScreen;