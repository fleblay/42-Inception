let http = require('http');
let fs = require('fs');

http.createServer((request, response) => {
	fs.readFile('index.html', 'utf-8', (err, data) => {
		if (err) {
			response.writeHead(404, {
				'Content-type' : 'text/html; charset=utf-8'
			});
			response.write("Oupsie, impossible de lire le fichier\n");
		} else {

			response.writeHead(200, {
				'Content-type' : 'text/html; charset=utf-8'
			});
			/*
			fs.readFile('index.js', 'utf-8', (err2, data2) => {
				if (err) throw err;
				else {
					data = data.replace("/<script>.*$/", data2);
					console.log(data2);
				}
			});
			*/
			response.write(data);
		}
		response.end();
	});
}).listen(8080);
