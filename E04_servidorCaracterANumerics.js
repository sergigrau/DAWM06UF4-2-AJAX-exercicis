/*
 * Servidor HTTP que converteix el format d'un caràcter
 * @author  sergi.grau@fje.edu
 * @version 1.0
 * date 31.1.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 31.1.2017
 * - Servidor HTTP que converteix el format d'un caràcter
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
        var consulta = url.parse(request.url, true).query;
        var nombre = consulta['caracter'];
        if (nombre != undefined )
            nombre = nombre.charCodeAt(0);
        console.log("Petició per a  " + pathname + " rebuda.");
        
        if (pathname == '/E04_caracterANumerics') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./E04_caracterANumerics.html', function (err, sortida) {
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
        else if (pathname == '/js/E04_caracterANumerics.js') {
            response.writeHead(200, {
                "Content-Type": "application/javascript; charset=utf-8"
            });

            fs.readFile('./js/E04_caracterANumerics.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        }

        else if (pathname == '/convertir') {
            response.writeHead(200, {
                "Content-Type": "text/xml; charset=utf-8"
            });
            
            var xml = '<resultats><decimal>' + nombre + '</decimal>' +
                '<binari>' +  (nombre >>> 0).toString(2) + '</binari>' +
                '<hexadecimal>' + (nombre >>> 0).toString(16) + '</hexadecimal>' +
                '<octal>' + (nombre >>> 0).toString(8) + '</octal></resultats>';

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
