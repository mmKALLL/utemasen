const http = require('http');
const server = http.createServer();

server.on('request', (request, response) => {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

	console.log(`==== ${request.method} ${request.url}`);
	console.log('> Headers');
        console.log(request.headers);

	console.log('> Body');
	console.log(body);
	response.writeHead(200, {
                'Transfer-Encoding': 'chunked',
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'text/plain;charset=UTF-8',
		'Connection': 'close',
        });
        if (request.headers['user-agent'].includes('curl')) {
		response.write('打てます\r\n')
	} else {
		response.write('打てません\r\n')
	}
        response.end();
    });
}).listen(8083);
