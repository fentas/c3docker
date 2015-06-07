# c3io-docker

The aim of c3po-casperjs is to give a simple means of communication from nodejs
to [casperjs](http://casperjs.org/) and vise versa. It will _not_ fork all the
casperjs functionality to nodejs. c3po is just there for talking.

c3io-docker uses c3io to transfer data from docker to node.


## Basic usage

There are several ways to use c3po-casperjs including docker support.
Have a look bellow.

### casperjs

__NOTE__

c3po-casperjs works only with [phatomjs](http://phantomjs.org/) as engine for casperjs.
As long [slimerjs](https://slimerjs.org/) has not implemented (see [issue](https://github.com/laurentj/slimerjs/issues/188))
`system.stdin` this module will only be able to communicate one way, casper -> node!

_Notice_: First run could be slow if its necessary to pull image

```node
var c3po = require('c3po-casperjs')

// starts docker
c3po.docker()
  // do your ussal stuff
  .on('message', function(msg) {})
```
