/*
 * Servidor HTTP que suma dos nombres pasats com a paràmetre
 * @author  sergi.grau@fje.edu
 * @version 1.0
 * date 31.1.2017
 * format del document UTF-8
 *
 * CHANGELOG
 *  31.1.2017
 * - Servidor HTTP que suma dos nombres pasats com a paràmetre
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require('fs');

function iniciar() {
	function onRequest(request, response) {
		var sortida;
		var pathname = url.parse(request.url).pathname;
		console.log("Petició per a  " + pathname + " rebuda.");
		if (pathname == '/E03_llegirXMLNode') {
			response.writeHead(200, {
				"Content-Type": "text/html; charset=utf-8"
			});

			fs.readFile('./E03_llegirXMLNode.html', function (err, sortida) {
				response.writeHead(200, {
					'Content-Type': 'text/html'
				});

				response.write(sortida);
				response.end();
			});

		}
		else if (pathname == '/css/estils.css') {
			response.writeHead(200, {
				"Content-Type": "text/html; charset=utf-8"
			});

			fs.readFile('./css/estils.css', function (err, sortida) {
				response.writeHead(200, {
					'Content-Type': 'text/css'
				});

				response.write(sortida);
				response.end();
			});

		}
		else if (pathname == '/js/E03_llegirXMLNode.js') {
			response.writeHead(200, {
				"Content-Type": "text/html; charset=utf-8"
			});

			fs.readFile('./js/E03_llegirXMLNode.js', function (err, sortida) {
				response.writeHead(200, {
					'Content-Type': 'text/css'
				});

				response.write(sortida);
				response.end();
			});

		}

		else if (pathname == '/llegirXML') {
			response.writeHead(200, {
				"Content-Type": "text/xml; charset=utf-8"
			});
			var xml = `<xml>
					<missatge>
						<text>
							Sergi
						</text>
					</missatge>
					<missatge>
						<text>
							Joan
						</text>
					</missatge>
				</xml>
			`;

			response.write(xml);
			response.end();
		} else {
			response.writeHead(404, {
				"Content-Type": "text/html; charset=utf-8"
			});
			sortida = "404 NOT FOUND";
			response.write(sortida);
			response.end();
		}

	}


	http.createServer(onRequest).listen(8888);
	console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;
