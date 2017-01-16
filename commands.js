/* eslint-disable */
let fs = require('fs');

let argsSplit = function(cmd) {
  let cmdArray = cmd.split(' ');
  let args = cmdArray.slice(1);
  return args;
}

module.exports = {
  pwd: function() {
    let pwd = process.cwd();
    process.stdout.write(pwd);
    process.stdout.write('\nprompt > ');
  },
  date: function() {
    let date = new Date().toString().trim();
    process.stdout.write(date);
    process.stdout.write('\nprompt > ');
  },
  ls: function() {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      });
      process.stdout.write("prompt > ");
    });
  },
  echo: function(cmd) {
    let args = argsSplit(cmd);
    if (args[0] === '$PATH') {
      process.stdout.write(process.execPath);
    } else {
      args.forEach(function(str) {
        process.stdout.write(str + ' ');
      });
    }
    process.stdout.write('\nprompt > ');
    process.stdout.write("");
  },
  cat: function(cmd) {
    let args = argsSplit(cmd);
    fs.readFile
    // if (args[0] === '') {
    //
    // }
  },
  head: function() {

  },
  tail: function() {

  }
}
