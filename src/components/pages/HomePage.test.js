import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { isTSAnyKeyword } from '@babel/types';

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<div></div>, div)
})