'use strict';

import React from 'react';

import {Link} from 'react-router';

export default class Code extends React.Component {
    render() {
        return (
            <div>
                <h1>Coding Page</h1>
                <ul>
                    <li><Link to="app">Home</Link></li>
                </ul>
            </div>
        );
    }
}

