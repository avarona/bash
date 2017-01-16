let commands = require('./commands');
process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
  let userCommand;
  let cmd = data.toString().trim();
  let cmdArray = cmd.split(' ');
  console.log(cmdArray);

  if (cmdArray[0] === 'echo') userCommand = 'echo';
  else if (cmdArray[0] === 'cat') userCommand = 'cat';
  else if (cmdArray[0] === 'head') userCommand = 'head';
  else if (cmdArray[0] === 'tail') userCommand = 'tail';
  else if (cmdArray[0] === 'curl') userCommand = 'curl';
  else userCommand = data.toString().trim();

  function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  }

  commands[userCommand](cmd, done);

});
