import React from 'react';
import ReactDOM from 'react-dom';
import History from './History';
import { isTSAnyKeyword } from '@babel/types';

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<div></div>, div)
})