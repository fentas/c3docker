var c3docker = require('../')

//c3docker.c3io.r2d2.kill

c3docker({Cmd: ['/data/simple.js']}).then(function(container) {
  container.c3io
    .on('message', function(msg) {
      if ( msg.stdin ) {
        this.stdin = 'Hello World'
      }
      else if ( msg.stderr ) {
        console.log('stderr', msg.toString('utf8'))
      }
      else {
        console.log('stdout', msg.toString('utf8'))
      }

    })

  container.start({Binds: [__dirname+':/data']}, function(err, exec) {
    //console.log(exec)
    //setTimeout(function() {
    //  container.kill(function(err) {})
    //}, 15000)
  })
}).done()
