# c3docker

The aim of c3docker is to give a simple means of communication from nodejs
to [docker](https://github.com/docker/docker/) and vise versa. It will _not_ fork all the
docker functionality to nodejs. c3docker is just there for talking.

c3docker uses [c3io](https://github.com/fentas/c3io) to transfer data from docker to node
and back.


## Basic usage

```node
var c3docker = require('c3docker')

c3docker({Cmd: ['/data/simple.js']}).then(function(container) {
  container.c3io
    .on('message', function(msg) {
      // input request
      if ( msg.stdin ) {
        // send message [string]
        this.stdin = 'Hello World'
      }
      // stderr stream
      else if ( msg.stderr ) {
        console.log('stderr', msg.toString('utf8'))
      }
      // stdout stream
      else {
        console.log('stdout', msg.toString('utf8'))
      }
    })

  container.start({Binds: [__dirname+':/data']}, function(err, exec) {
    // do stuff
  })
}).done()
```

* [dokerode](https://github.com/apocas/dockerode) is used to remote control docker.
Please refer there for more information to control docker.
* How the communication works between c3docker and the docker itself please visit
[c3io](https://github.com/fentas/c3io).

Firstly `c3docker` takes some options (see [dockerode - createContainer](https://github.com/apocas/dockerode)).
Then it returns a promise. If successful the requested container will be passed over.
With that you can do stuff. Hopefully.

If you want to extend c3docker range of commands you just can do that as this.

```node
c3io.r2d2.kil = function(_data) {
  this.container.kill(function(err) {
    // container killed
  })
}
```

### use case: casperjs

__NOTE__

c3io works only with [phatomjs](http://phantomjs.org/) as engine for [casperjs](http://casperjs.org/).
As long [slimerjs](https://slimerjs.org/) has not implemented (see [issue](https://github.com/laurentj/slimerjs/issues/188))
`system.stdin`, this module will only be able to communicate one way, casper to node!

_Notice_: First run could be slow if its necessary to pull image

... see latter example
