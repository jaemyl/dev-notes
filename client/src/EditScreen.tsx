import * as React from 'react';

import './EditScreen.css';

interface EditScreenProps {
    date: string
    entry: string
    onSaveNote: (date:string, entry:string) => void
}

class EditScreen extends React.Component<EditScreenProps> {
    private entry: string

    constructor(props:EditScreenProps) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSaveNote = this.onSaveNote.bind(this)

        this.entry = this.props.entry
    }

    public render() {
        return (
            <div className='editscreen'>
                <textarea className='editentry' onChange={this.onChange}>
                    {this.props.entry}
                </textarea>
                <div className='savebutton' onClick={this.onSaveNote}/>
            </div>
        )
    }

    private onChange(event:React.ChangeEvent<HTMLTextAreaElement>) {
        console.log('onChange() ' + event.target.value)
        this.entry = event.target.value
    }

    private onSaveNote() {
        this.props.onSaveNote(this.props.date, this.entry)
    }
}
export default EditScreen;