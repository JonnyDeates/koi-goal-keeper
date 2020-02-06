import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom';
import App from '../App'
import Enzyme from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';

Enzyme.configure({adapter: new Adapter()});

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div)
    })
});