var c3io          = require('c3io'),
    dockerode     = require('dockerode'),
    Q             = require('q')
    fs            = require('fs'),
    extend        = require('extend'),
    util          = require('util'),
    socket        = process.env.DOCKER_SOCKET || '/var/run/docker.sock'


if ( !fs.statSync(socket).isSocket() )
  throw new Error('Are you sure the docker is running?')


function docker(args) {
  //if ( !(this instanceof docker) ) return docker

  var docker = new dockerode({ socketPath: socket }),
      optsc = extend(
  {
    'Hostname': '',
    'User': '',
    'Entrypoint': '/usr/bin/casperjs',
    'Env': null,
    'Cmd': ['--help'],
    //'Dns': ['8.8.8.8', '8.8.4.4'],
    'Image': 'fentas/phantomjs',
    'Volumes': {'/data': {}},
    'VolumesFrom': ''
  },
  args,
  {
    'AttachStdin': true,
    'AttachStdout': true,
    'AttachStderr': true,
    'Tty': true,
    'OpenStdin': true,
    'StdinOnce': false
  })


  return Q.Promise(function(resolve, reject, notify) {
    docker.createContainer(optsc, function(err, container) {
      if ( err ) return reject(err)

      container.c3io = new c3io
      container.attach({stream: true, stdin: true, stdout: true, stderr: true}, function handler(err, stream) {
        if ( err ) reject(err)
        //console.log(stream)
        container.c3io.stdin.pipe(stream)
        //container.modem.demuxStream(stream, container.c3io.stdout, container.c3io.stderr)
        stream.pipe(container.c3io.stdout)
        //stream.pipe(sio.stderr)

        resolve(container)
      })
    })
  })

}

module.exports = exports = docker
