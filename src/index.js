// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { worker } from './mocks/browser';

worker.start();
worker.printHandlers();
ReactDOM.render(<App />, document.getElementById('root'));
