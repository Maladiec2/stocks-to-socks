import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './Converter';
import { isTSAnyKeyword } from '@babel/types';

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<div></div>, div)
})