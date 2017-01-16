/* eslint-disable */

let commands = require('./commands');

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
  // let pwd = process.cwd();
  // let date = new Date().toString().trim();
  // if (cmd === 'pwd') process.stdout.write(pwd);
  // if (cmd === 'date') process.stdout.write(date);

  let userCommand;
  let cmd = data.toString().trim();
  let cmdArray = cmd.split(' ');

  if (cmdArray[0] === 'echo') userCommand = 'echo';
  else if (cmdArray[0] == 'cat') userCommand = 'cat';
  else userCommand = data.toString().trim();

  commands[userCommand](cmd);
});
