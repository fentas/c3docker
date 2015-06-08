var system = require('system')

var casper = require("casper").create();

system.stdout.write('Hello, system.stdout.write!\n');
system.stdout.writeLine("c3io!req");
var line = system.stdin.read(4);
system.stdout.writeLine(line); //JSON.stringify()

//system.stderr.writeLine("foo");

//system.stdout.writeLine("c3io!stp");

casper.exit();
