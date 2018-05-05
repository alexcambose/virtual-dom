const {
    PATCH_INSERT_NODE,
    PATCH_REPLACE_NODE,
    PATCH_REMOVE_NODE,
    PATCH_TEXT_NODE,
    PATCH_PROPS_NODE
} = require('../src/constants');

const assert = require('chai').assert;
const { diff } = require('../src/index');

describe('diff', () => {
    describe('props', () => {
        it('detects props changes', () => {
            const A = {
                type: 'div',
                props: { className: 'header', id: 'main' }
            };
            const B = {
                type: 'div',
                props: { className: 'footer', id: 'main' }
            };
            assert.deepEqual(diff(A, B), {
                0: {
                    selfPatch: {
                        type: PATCH_PROPS_NODE,
                        payload: { className: 'footer', id: 'main' }
                    }
                }
            });
        });
    });
    describe('props.children', () => {
        it('detects text changes', () => {
            const A = {
                type: 'div',
                props: { children: ['Hello World!'] }
            };
            const B = {
                type: 'div',
                props: { children: ['Hello people!'] }
            };
            assert.deepEqual(diff(A, B), {
                0: {
                    childrenPatches: {
                        0: {
                            selfPatch: {
                                type: PATCH_TEXT_NODE,
                                payload: 'Hello people!'
                            }
                        }
                    }
                }
            });
        });
        it('detects text element added', () => {
            const A = {
                type: 'div',
                props: { children: ['Hello World!'] }
            };
            const B = {
                type: 'div',
                props: { children: ['Hello people!', 'HEEELLO'] }
            };
            assert.deepEqual(diff(A, B), {
                0: {
                    childrenPatches: {
                        0: {
                            selfPatch: {
                                type: PATCH_TEXT_NODE,
                                payload: 'Hello people!'
                            }
                        },
                        1: {
                            selfPatch: {
                                type: PATCH_INSERT_NODE,
                                payload: 'HEEELLO'
                            }
                        }
                    }
                }
            });
        });
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
            assert.deepEqual(diff(A, B), {
                0: {
                    childrenPatches: {
                        0: {
                            selfPatch: {
                                type: PATCH_TEXT_NODE,
                                payload: 'Hello people!'
                            }
                        },
                        1: {
                            selfPatch: {
                                type: PATCH_INSERT_NODE,
                                payload: newElement
                            }
                        }
                    }
                }
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
            assert.deepEqual(diff(A, B), {
                0: {
                    childrenPatches: {
                        0: {
                            selfPatch: {
                                type: PATCH_TEXT_NODE,
                                payload: 'Hello people!'
                            }
                        },
                        1: {
                            selfPatch: {
                                type: PATCH_REMOVE_NODE,
                                payload: 'delete me'
                            }
                        }
                    }
                }
            });
        })
    });
});
