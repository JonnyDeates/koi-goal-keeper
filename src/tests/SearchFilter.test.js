import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom';
import Enzyme from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import SearchFilter from "../SearchFilter/SearchFilter";

Enzyme.configure({adapter: new Adapter()});

describe(`Search Filter Component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <SearchFilter/>
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div)
    })
});