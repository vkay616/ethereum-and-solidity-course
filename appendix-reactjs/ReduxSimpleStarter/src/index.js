require('dotenv').config({ path: __dirname + '/settings.env' });
import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';

const API_KEY = process.env.API_KEY;

// create a new component which will produce some HTML
const App = () => {
    return (
        <div>
            <SearchBar />
        </div>
    );
}
// take this component's generated HTML and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));