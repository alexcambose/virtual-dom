import diff from './diff';
import patch from './patch';
import render from './render';

if(!module) {
    window.diff = diff;
    window.patch = patch;
    window.render = render;
}

export {
    diff, patch, render
}
