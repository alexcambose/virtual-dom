const { PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE } = require('../src/constants');

const assert = require('chai').assert;
const { diff, patch } = require('../src/index');


describe('diff', () => {
    describe('props', () => {
        it('detects props changes', () => {
            const A = {
                type: 'div',
                props: {className: 'header', id: 'main'},
            };
            const B = {
                type: 'div',
                props: {className: 'footer', id: 'main'},
            };
            const patches = diff(A, B);
            assert.deepEqual(patches, { '0': { type: PATCH_PROPS_NODE, payload: { className: 'footer', id: 'main' } } });
        });
    });
    describe('props.children', () => {
        it('detects text changes', () => {
            const A = {
                type: 'div',
                props: {children: ['Hello World!']},
            };
            const B = {
                type: 'div',
                props: {children: ['Hello people!']},
            };
            const patches = diff(A, B);    
            assert.deepEqual(patches.patches, { '0': { type: PATCH_TEXT_NODE, payload: 'Hello people!' } });
        })
        it('detects text element added', () => {
            const A = {
                type: 'div',
                props: {children: ['Hello World!']},
            };
            const B = {
                type: 'div',
                props: {children: ['Hello people!', 'HEEELLO']},
            };
            const patches = diff(A, B);
            assert.deepEqual(patches.patches, { 
                '0': { type: PATCH_TEXT_NODE, payload: 'Hello people!' },
                '1': { type: PATCH_INSERT_NODE, payload: 'HEEELLO' },
            });
        })
        it('detects object element added', () => {
            const newElement = {type: 'h1',props: {className: 'title'}};
            const A = {
                type: 'div',
                props: {children: ['Hello World!']},
            };
            const B = {
                type: 'div',
                props: {children: ['Hello people!', newElement]},
            };
            const patches = diff(A, B);
            assert.deepEqual(patches.patches, { 
                '0': { type: PATCH_TEXT_NODE, payload: 'Hello people!' },
                '1': { type: PATCH_INSERT_NODE, payload: newElement },
            });
        })
        it('detects element removed', () => {
            const A = {
                type: 'div',
                props: {children: ['Hello World!', 'delete me']},
            };
            const B = {
                type: 'div',
                props: {children: ['Hello people!']},
            };
            const patches = diff(A, B);
            assert.deepEqual(patches.patches, { 
                '0': { type: PATCH_TEXT_NODE, payload: 'Hello people!' },
                '1': { type: PATCH_REMOVE_NODE, payload: 'delete me' },
            });
        })
    });
});
