/*
 * programa inverteix una cadena utilitzant AJAX
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

window.onload=function () {
     var xhr;
    document.getElementById("mostrarDades").onclick = function () { cridarAJAX('E02_llegirXML.xml'); };

    function cridarAJAX(url) {
        xhr = new XMLHttpRequest();

        if (!xhr) {
            alert('problemes amb XHR');
            return false;
        }
        xhr.onreadystatechange = rebreDades;
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.open('GET', url, true); // el 3r paràmetre indica que és asíncron 
        xhr.send(null);
    }

    function rebreDades() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              var xmlDoc= xhr.responseXML.documentElement;
	
					for (i=0; i< xmlDoc.getElementsByTagName('missatge').length;i++){
						var elementText= xmlDoc.getElementsByTagName('text')[i].firstChild.data;
						document.getElementById("missatge").innerHTML+=elementText+"<br/>";
					}	
            } else {
                console.log('problemes amb l\'AJAX');
            }
        }
    }
};
