'use strict';

import React from 'react';
import Router from 'react-router';
import FluxComponent from '../../../node_modules/flummox/component';

import AppFlux from './../../AppFlux';
import AppStore from './../../AppStore';
import Code from '../Code/Code';
import App from './../../app';

var {DefaultRoute, Route, Link, RouteHandler} = Router;

// simple test to ensure babel is working
let foo = 'foo',
    bar = 'bar';
let obj = {foo, bar};
window.console.log(`loaded main.js with Babel ES6, ${JSON.stringify(obj)}`);
// end simple test

const flux = new AppFlux();

