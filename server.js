var express = require('express');
var app = express();

app.use(function(req,res){
    var head = req.headers;
    var reg1 = /[,:\s]/,reg2 = /(\(.*?\))/;
    var ipAdd = head['x-forwarded-for']?head['x-forwarded-for']:'unknown',lang = head['accept-language'];
    var ua = head['user-agent'];
    var l = reg1.exec(lang);
    var userLang = lang.slice(0,l.index);
    var os = reg2.exec(head['user-agent']);
    //console.log(userLang);
    //console.log(ipAdd);
    var userOs = os[0].slice(1,-1);
    var result = {
        'IP Address':ipAdd,
        'OS':userOs,
        'language':userLang
    }
    res.end(JSON.stringify(result));
})

app.listen(8080);