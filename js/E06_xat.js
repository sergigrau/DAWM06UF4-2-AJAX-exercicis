/*
 * programa que permet tenir un xat amb AJAX
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 13.02.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 13.02.2017
 * - programa  permet tenir un xat amb AJAX
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */

window.onload = function () {


    var id_interval = setInterval(function () {
        cridarAJAX('/consultar');
    }, 1000);

    var xhr;
    var darreraResposta = '';
    document.getElementById("missatge").onkeyup = function (e) {
        var codi = (e.keyCode ? e.keyCode : e.which);
        if (codi == 13) {
            cridarAJAX('/enviar?missatge=' + 
            document.getElementById("nom").value + ':'+
            document.getElementById("missatge").value);

        }
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
                var li = document.createElement('li');
                var resposta = xhr.response;
                if (resposta != darreraResposta) {
console.log(darreraResposta);
                    li.innerText = resposta;
                    darreraResposta = resposta;

                    document.getElementById('xat').appendChild(li);
                }
            } else {
                console.log('problemes amb l\'AJAX');
            }
        }
    }
};
