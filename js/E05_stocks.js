/*
 * programa fa la gràfica d'una acció
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 23.01.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 23.01.2017
 * - programa inverteix una cadena utilitzant AJAX
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */

window.onload = function () {
    var xhr;
    var dades;
    cridarAJAX('/generarJSON');

    function cridarAJAX(url) {
        xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('problemes amb XHR');
            return false;
        }
        xhr.onreadystatechange = rebreDades;
        xhr.open('POST', url, true); // el 3r paràmetre indica que és asíncron 
        xhr.send(null);
    }

    function rebreDades() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                dades = xhr.response;
            } else {
                console.log('problemes amb l\'AJAX');
            }
        }
    }


    function dibuixarGrafic() {

        var data = new google.visualization.DataTable(dades);
        var options = {
            'title': 'cotització setmanal',
            'width': 800,
            'height': 400
        };

        var chart = new google.charts.Line(document.getElementById('grafic'));
        chart.draw(data, options);
    }

    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(dibuixarGrafic);


};
