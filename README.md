# virtual-dom

[![Build Status](https://travis-ci.org/alexcambose/virtual-dom.svg?branch=master)](https://travis-ci.org/alexcambose/virtual-dom)

A Virtual DOM algorithm implementation that improves front end performance by updating only changed nodes in the DOM.

### [**DEMO**](https://alexcambose.github.io/virtual-dom/)

## Installation
As [npm](https://www.npmjs.com/package/@alexcambose/virtual-dom) package
```bash
npm i -S @alexcambose/virtual-dom
```
Standalone script file
```html
<script src="dist/virtual-dom.js"></script>
```

## Usage
```javascript
let newContent = null;

// function thet will create virtual-dom object
const createDom = title => (
    h('div', null,
        h('h1', { className: 'header' }, title),
        h('p', null , 'Lorem ipsum'),
        h('footer', { className: 'footer' }, 'The footer'),
    )
);

// create virtual-dom object
let content = createDom('Some title');

// render the virtual dom object into the real dom
render(content, document.getElementById('app'));

const rerender = () => {

    // create the virtual-dom object again but with dfferent properties
    newContent = createDom('Some other title');

    // patches object that will be used to modify changed elements
    const patches = diff(content, newContent);

    //appy patches
    patch(appContainer, patches);

    // update content
    content = newContent;
};
```


## API
* `h(tagName, props, ...children)` - Function to define virtual-dom using hyperscript style
```js
h('div', { className: 'section' },
    h('h1', { style: {color: 'red'} }, 'Section title'),
))
```
will output
```js
{
   type: "div",
   props: {
      className: "section",
      children: [
         {
            type: "h1",
            props: {
               style: {
                  color: "red"
               },
               children: [
                  "Section title"
               ]
            }
         }
      ]
   }
}
```

* `render(VDOM, domElement)` - renders the virtual dom object into a specified element in dom
```js
// content = h(..., h(...))
render(content, document.getElementById('app'))
```
* `diff(oldVDOM, newVDOM)` - create a *patches object* that contains all the differences between two virtual-dom objects, should be used with `patch`
```js
const oldVDOM = h('h1', null, 'Hello title');
const newVDOM = h('h1', { className: 'header' }, 'Hello new class');
const patches = diff(oldVDOM, newVDOM);
```
`patches` will look something like this
```js
{
   0:{
      childrenPatches: {
         0: {
            selfPatch: {
               type: PATCH_TEXT_NODE,
               payload: "Hello new class"
            }
         }
      }
   }
}
```

* `patch(domElement, patches)` - updates the dom based on the patches produced by `diff`
```js
const patches = diff(oldVDOM, newVDOM);
patch(document.getElementById('app'), patches);
```

## License
MIT
