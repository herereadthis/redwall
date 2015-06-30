var jsdom = require('mocha-jsdom');
var assert = require("assert");
var expect = require('chai').expect;

describe('baseline mocha tests', function () {

    jsdom();

    it('has document', function () {
        var elemID = 'new_element';
        var elemText = 'Hello World';

        var elem = document.createElement('div');
        elem.id = elemID;
        elem.innerHTML = elemText;
        document.body.appendChild(elem);
        assert.equal('DIV', elem.nodeName);
        assert.equal(elemText, document.getElementById(elemID).innerHTML);
    });
});

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        })
    })
});
