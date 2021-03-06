const { PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE } = require('../src/constants');

import { assert } from 'chai';
import { diff, patch, render } from '../src/index';
import { JSDOM } from 'jsdom';

describe('patch', () => {
    const element = { type: "h1", props: { className: "title", id: 'theid', children: ["text1", "text2"] } };
    const _document = (new JSDOM(`<div id="app"></div>`)).window.document;
    const containerApp = _document.getElementById('app');

    it('text changes', () => {
        global.document = _document;
        render(element, containerApp);
        let newElement = JSON.parse(JSON.stringify(element));
        newElement.props.children[0] = 'something1';
        newElement.props.children[1] = 'something2';
        const patches = diff(element, newElement);
        patch(containerApp, patches);
        assert.equal(containerApp.childNodes[0].childNodes[0].textContent, 'something1');
        assert.equal(containerApp.childNodes[0].childNodes[1].textContent, 'something2');
    });
    it('props changes', () => {
        global.document = _document;
        render(element, containerApp);
        let newElement = JSON.parse(JSON.stringify(element));
        newElement.props.className = 'something1';
        newElement.props.id = 'something2';
        const patches = diff(element, newElement);
        patch(containerApp, patches);
        assert.equal(containerApp.childNodes[0].className, 'something1');
        assert.equal(containerApp.childNodes[0].id, 'something2');
    });
    it('deep text, props and children changes', () => {
        global.document = _document;
        containerApp.innerHTML = '';
        render(element, containerApp);
        let newElement = JSON.parse(JSON.stringify(element));
        newElement.props.className = 'something1';
        newElement.props.id = 'something2';
        newElement.props.children = [
            'Hello, ', { type: "span", props: { className: "subtitle", children: ["Mr. Cat"] } }, ' !',
        ];
        const patches = diff(element, newElement);
        patch(containerApp, patches);
        assert.equal(containerApp.innerHTML, `<h1 class="something1" id="something2">Hello, <span class="subtitle">Mr. Cat</span> !</h1>`);
    });
});
