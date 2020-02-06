import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom';

import Enzyme from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import Login from "../Login/Login";

Enzyme.configure({adapter: new Adapter()});

describe(`App component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div)
    })
});