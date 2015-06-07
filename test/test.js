var c3docker = require('../')

c3docker().then(function(container) {
  container.c3io.on('message', function(msg) {

  })
  container.start({bind: [__dirname+':/data']}, function(err) {

    setTimeout(function() {
      container.kill(function(err) {})
    }, 2000)
  })
}).done()
