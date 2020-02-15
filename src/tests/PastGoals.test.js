import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom';
import Enzyme from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import PastGoals from "../PastGoals/PastGoals";

Enzyme.configure({adapter: new Adapter()});

describe(`Past Goals Component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <PastGoals/>
            </BrowserRouter>,
            div);
        ReactDOM.unmountComponentAtNode(div)
    })
});