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
    var dadesJSON;
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
                document.getElementById("cadenaInvertida").innerHTML = xhr.response;
                dadesJSON=[
            ['Year', 'Acció1', 'Acció2'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ];
            } else {
                console.log('problemes amb l\'AJAX');
            }
        }
    }


    function dibuixarGrafic() {

        var data = google.visualization.arrayToDataTable([
            ['Year', 'Acció1', 'Acció2'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ]);


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
