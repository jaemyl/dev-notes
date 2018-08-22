import * as React from 'react';
import './HomeScreen.css';

interface HomeScreenProps {
    onCreateNewNote: () => void
}

class HomeScreen extends React.Component<HomeScreenProps, any> {
    public render() {
        return (
            <div className='homescreen'>
                <div className='title'>
                    Create a Dev Note
                </div>
                <div className='alert'>
                    Alert: Your notes are accesible by anyone with the link
                </div>
                <div className='createbutton' onClick={this.props.onCreateNewNote}>
                    CREATE A NEW NOTE
                </div>
            </div>
        )
    }
}
export default HomeScreen;