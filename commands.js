let fs = require('fs');
let request = require('./node_modules/request');

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
        process.stdout.write(file.toString() + '\n');
      });
      process.stdout.write('prompt > ');
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
  },
  cat: function(cmd) {
    let args = argsSplit(cmd);
    args.forEach(function(el) {
      fs.readFile(el, function(err, contents) {
        if (err) throw err;
        process.stdout.write(contents);
      });
    })
      process.stdout.write('\nprompt > ');
  },
  head: function(cmd) {
    let args = argsSplit(cmd);
    fs.readFile(args[0], function(err, contents) {
      if (err) throw err;
      var arr = contents.toString().split('\n');
      for (let i = 0; i < 5; i++) {
        process.stdout.write(arr[i] + '\n');
      }
      process.stdout.write('prompt > ');
    })
  },
  tail: function(cmd) {
    let args = argsSplit(cmd);
    fs.readFile(args[0], function(err, contents) {
      if (err) throw err;
      let arr = contents.toString().split('\n');
      let length = arr.length;
      for (let i = length - 5 ; i < length; i++) {
        process.stdout.write(arr[i] + '\n');
      }
      process.stdout.write('prompt > ');
    })
  },
  // TODO: Complete sort, wc & uniq functions
//   sort: function(cmd) {
//
//   },
//   wc: function(cmd) {
//
//   },
//   uniq: function(cmd) {
//
//   }
  curl: function(cmd) {
    let args = argsSplit(cmd);
    // need to handle for when http:// is not included
    request(args[0], function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body) // Show the HTML for the Google homepage.
      }
    })
  }
}
