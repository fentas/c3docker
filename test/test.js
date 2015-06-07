var c3docker = require('../')

c3docker({Cmd: ['/data/simple.js']}).then(function(container) {
  container.c3io.on('message', function(msg) {
    console.warn('here', msg.toString())
  })

  container.start({Binds: [__dirname+':/data']}, function(err) {

    setTimeout(function() {
      container.kill(function(err) {})
    }, 5000)
  })
}).done()
