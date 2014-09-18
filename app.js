var express = require('express');

var request = require('request');

var app = express();
app.configure(function(){
  app.use(express.static(path.join(application_root, "StaticPages")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/',function(req,res){
    res.sendfile(path, {root: './public'});
})

app.post('/login',function(req,res){
    var header = req.headers;
    console.log(header);
})

app.listen(80);