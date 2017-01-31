/*
 * programa inverteix una cadena utilitzant AJAX i NodeJS
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 23.01.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 23.01.2017
 * - programa inverteix una cadena utilitzant AJAX i NodeJS
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */

window.onload = function () {
    var xhr;

    document.getElementById("entrada").onkeyup = function () {
            cridarAJAX('/convertir?caracter=' + document.getElementById("entrada").value);
    }
            function cridarAJAX(url) {
                xhr = new XMLHttpRequest();

                if (!xhr) {
                    alert('problemes amb XHR');
                    return false;
                }
                xhr.onreadystatechange = rebreDades;
                xhr.open('GET', url);
                xhr.send(null);
            }

            function rebreDades() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        document.getElementById('resultats').style.color = '#F00';
                        var xmlDoc = xhr.responseXML.documentElement;
                        var decimal = xmlDoc.getElementsByTagName('decimal')[0].firstChild.data;
                        var binari = xmlDoc.getElementsByTagName('binari')[0].firstChild.data;
                        var hexadecimal = xmlDoc.getElementsByTagName('hexadecimal')[0].firstChild.data;
                        var octal = xmlDoc.getElementsByTagName('octal')[0].firstChild.data;
                        document.getElementById("resultats").innerHTML = decimal + " " + binari + " " + hexadecimal + " " + octal;

                    } else {
                        console.log('problemes amb l\'AJAX');
                    }
                }
            }
        };
