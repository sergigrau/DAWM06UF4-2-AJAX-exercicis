/*
 * Servidor HTTP que genera un JSON amb les dades simulades d'una cotització
 * @author  sergi.grau@fje.edu
 * @version 1.0
 * date 31.1.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 31.1.2017
 * - Servidor HTTP que enera un JSON amb les dades simulades d'una cotització
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
        
        if (pathname == '/E05_stocks') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./E05_stocks.html', function (err, sortida) {
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
        else if (pathname == '/js/E05_stocks.js') {
            response.writeHead(200, {
                "Content-Type": "application/javascript; charset=utf-8"
            });

            fs.readFile('./js/E05_stocks.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });

                response.write(sortida);
                response.end();
            });

        }

        else if (pathname == '/generarJSON') {
            response.writeHead(200, {
                "Content-Type": "application/json charset=utf-8"
            });
         var dades = {
"cols":[
    {"type":"string"},{"type":"number"}
    ],
"rows":[
    {"c": [{ "v": "20-01-17"},{"v":35} ]},
    {"c": [{ "v": "21-01-17"},{"v":30} ]},
    {"c": [{ "v": "22-01-17"},{"v":35} ]},
    {"c": [{ "v": "23-01-17"},{"v":36} ]},
    {"c": [{ "v": "24-01-17"},{"v":28} ]},
    {"c": [{ "v": "25-01-17"},{"v":25} ]},
    ]
};

            response.write(JSON.stringify(dades));
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
