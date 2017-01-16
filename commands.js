let fs = require('fs');
let request = require('./node_modules/request');

let argsSplit = function(cmd) {
  let cmdArray = cmd.split(' ');
  let args = cmdArray.slice(1);
  return args;
}

module.exports = {
  pwd: function(cmd, done) {
    let pwd = process.cwd();
    done(pwd);
  },
  date: function(cmd, done) {
    let date = new Date().toString().trim();
    done(date);
  },
  ls: function(cmd, done) {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      let finalString = [];
      files.forEach(function(file) {
        finalString.push(file.toString());
      });
      done(finalString.join('\n'));
    });
  },
  echo: function(cmd, done) {
    let args = argsSplit(cmd);
    if (args[0] === '$PATH') {
      done(process.execPath);
    } else {
      let finalString = [];
      args.forEach(function(str) {
        finalString.push(str);
      });
      done(finalString.join(' '));
    }
  },
  cat: function(cmd, done) {
    let args = argsSplit(cmd);
    args.forEach(function(el) {
      fs.readFile(el, function(err, contents) {
        if (err) throw err;
        done(contents);
      });
    })
  },
  head: function(cmd, done) {
    let args = argsSplit(cmd);
    fs.readFile(args[0], function(err, contents) {
      if (err) throw err;
      let arr = contents.toString().split('\n');
      let finalString = [];
      for (let i = 0; i < 5; i++) {
        finalString.push(arr[i]);
      }
      done(finalString.join('\n'));
    })
  },
  tail: function(cmd, done) {
    let args = argsSplit(cmd);
    fs.readFile(args[0], function(err, contents) {
      if (err) throw err;
      let arr = contents.toString().split('\n');
      let length = arr.length;
      let finalString = [];
      for (let i = length - 5 ; i < length; i++) {
        finalString.push(arr[i]);
      }
      done(finalString.join('\n'));
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
  curl: function(cmd, done) {
    let args = argsSplit(cmd);
    // need to handle for when http:// is not included
    request(args[0], function (error, response, body) {
      if (!error && response.statusCode === 200) {
        done(body); // Show the HTML for the Google homepage.
      }
    })
  }
}
