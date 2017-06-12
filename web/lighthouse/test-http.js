var http = require('http');

var options = {
    host: 'hooks.zapier.com',
    path: '/hooks/catch/87314/9mex4p',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'POST'
};

callback = function (response) {
    var str = ''
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        console.log(str);
    });
}

var req = http.request(options, callback)
req.write(`{"repo_name":"Bryan","git_hash":"Helmig","age":27}`)
req.end()