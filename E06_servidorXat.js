/*
 * Servidor HTTP que implementa un xat
 * @author  sergi.grau@fje.edu
 * @version 1.0
 * date 13.02.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 13.02.2017
 * - Servidor HTTP que implementa un xat
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var darreraEntrada = '';
function iniciar() {
    function onRequest(request, response) {
        var sortida;
        var pathname = url.parse(request.url).pathname;
        var consulta = url.parse(request.url, true).query;

        console.log("Petició per a  " + pathname + " rebuda.");

        if (pathname == '/E06_xat') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./E06_xat.html', function (err, sortida) {
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
        else if (pathname == '/js/E06_xat.js') {
            response.writeHead(200, {
                "Content-Type": "application/javascript; charset=utf-8"
            });

            fs.readFile('./js/E06_xat.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        }

        else if (pathname == '/enviar') {
            response.writeHead(201, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            if (consulta['missatge'] != undefined)
                darreraEntrada = consulta['missatge'];
            response.end();
        }

        else if (pathname == '/consultar') {
            response.writeHead(200, {
                "Content-Type": "text/plain; charset=utf-8"
            });
            response.write(darreraEntrada);
            response.end();
        }
        else {
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
