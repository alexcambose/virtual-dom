import diff from './diff';
import patch from './patch';
import render from './render';
import h from './h';

if(typeof window !== 'undefined') {
    window.diff = diff;
    window.patch = patch;
    window.render = render;
    window.h = h;
}
export {
    diff, patch, render, h
}
