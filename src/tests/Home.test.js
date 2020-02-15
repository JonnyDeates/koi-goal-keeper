import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom';
import Enzyme from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import Home from "../Home/Home";

Enzyme.configure({adapter: new Adapter()});

describe(`Home Component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Home/>
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div)
    })
});