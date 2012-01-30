# ATOK - async tokenizer

## Overview

Atok is a fast, easy and flexible tokenizer designed for use with [node.js](http://nodejs.org). It is based around the [Stream](http://nodejs.org/docs/latest/api/streams.html) concept and is implemented as one.

It was originally inspired by [node-tokenizer](https://github.com/floby/node-tokenizer), but quickly grew into its own form as I wanted it to be RegExp agnostic so it could be used on node Buffer intances and more importantly *faster*. As of the first release, it does not support Buffer instances (yet!) but it is planned to be the next major feature.


## Download

It is published on node package manager (npm). To install, do:

    npm install atok


## Quick example

Given the following json to be parsed:

    ["Hello world!"]

The following code would be a very simple JSON parser for it.

``` javascript
var Tokenizer = require('..')
var tok = new Tokenizer

// Define the parser rules
// By default it will emit data events when a rule is matched
tok
    // Define the quiet property for the following rules (quiet=dont tokenize but emit/trigger the handler)
    // Only used to improve performance
    .quiet(true)
        // first argument is a match on the current position in the buffer
        .addRule('[', 'array-start')
        .addRule(']', 'array-end')
    .quiet() // Turn the quiet property off
    // The second pattern will only match if it is not escaped (default escape character=\)
    .escaped(true)
        .addRule('"', '"', 'string')
    .escaped()
    // Array item separator
    .addRule(',', 'separator')
    // Skip the match, in this case whitespaces
    .ignore(true)
        .addRule([' ','\n', '\t','\r'], 'whitespaces')
    .ignore()
    // End of the buffer reached
    // This is usually only needed when implementing synchronous parsers
    .addRule(0, 'end')

// Setup some variables
var stack = []
var inArray = false

// Attach listeners to the tokenizer
tok.on('data', function (token, idx, type) {
    // token=the matched data
    // idx=when using array of patterns, the index of the matched pattern
    // type=string identifiers used in the rule definition
    switch (type) {
        case 'array-start':
            stack.push([])
            inArray = true
        break
        case 'array-end':
            inArray = false
        break
        case 'string':
            if (inArray)
                stack[ stack.length-1 ].push(token)
            else
                throw new Error('only Arrays supported')
        break
        case 'separator':
        break
        case 'end':
            console.log('results is of type', typeof stack[0], 'with', stack[0].length, 'item(s)')
            console.log('results:', stack[0])
            stack = []
        break
        default:
            throw new Error('Unknown type: ' + type)
    }
})

// Send some data to be parsed!
tok.write('[ "Hello", "world!" ]')
```

__Output__

    results is object with 1 item(s)
    results: [ 'Hello world!' ]

## Documentation

Cf. the doc folder. More to come.

## Testing

Atok has a fairly extended set of tests written for [mocha](https://github.com/visionmedia/mocha).

## Performance

Atok performance was tested by writing a JSON parser and comparing its results to the excellent Douglas Crockford's [](). It currently scores slower on data sets containing small items, but much faster on large ones.

The JSON parser based on atok will be published soon as well as the benchmarks for it.

There are plans to increase performance, as listed in the TODO document.

## License

[Here](LICENSE)