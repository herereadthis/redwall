'use strict';

import 'static_sites/less/code.less';

// simple test to ensure babel is working
let foo = 'foo',
    bar = 'bar';
let obj = {foo, bar};
window.console.log(`loaded main.js with Babel ES6, ${JSON.stringify(obj)}`);
// end simple test
