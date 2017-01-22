/**
 * Funcions per a realitzar crides AJAX i processar les dades XML rebudes
 * @author sergi grau
 * @version 1.0
 * date 08/02/2009
 * format del document UTF-8
 *
 * CHANGELOG
 * 08/01/2009
 * -Creació de les funcions per realitzar crides AJAX
 *
 * NOTES
 * ORIGEN
 * Funcions per a resoldre l'exercici 5 de les pràctiques de DAI2 de l'ETPC
 */

/*
 * Utilitzem tècniques de codi discret (unobtrubsive).
 */

window.onload = function() {
	document.getElementById('entrada').onkeyup = ajax;
};
/*
 * funció que realitza les crides AJAX
 */
function ajax() {
	xhr = creaObjecteXHR();
	xhr.onreadystatechange = callback;
	var resultats = document.getElementById('resultats');
	var divs = resultats.getElementsByTagName('div');

	var ultim = divs[divs.length - 1].innerHTML;

	xhr.open("GET", "Exercici8.php?ultim=" + ultim);
	xhr.send(null);
}

/*
 * funció callback
 */
function callback() {
	if(xhr.readyState == 4) {
		var resultats = document.getElementById('resultats');
		resultats.style.color = '#F00';
		var resposta = xhr.responseXML;
		if(resposta != null) {
			var xmlDoc = resposta.documentElement;
			var data = xmlDoc.getElementsByTagName('data')[0].firstChild.data;
			var dades = xmlDoc.getElementsByTagName('dades')[0].firstChild.data;

			var div = document.createElement("div");
			div.innerHTML = data + "_" + dades;
			resultats.appendChild(div);
		}

	}
}

/*
 * funció que crear i retorna l'objecte XHR o el component ActiveX d'IE
 */
function creaObjecteXHR() {
	var xhrobj;
	try {
		xhrobj = new XMLHttpRequest;
	} catch(e) {
		var msxml = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
		for(var i = 0, len = msxml.length; i < len; ++i) {
			try {
				xhrobj = new ActiveXObject(msxml[i]);
				break;
			} catch(e) {
				onAjaxError(1, 'Error al crear el XHR', e);
			}
		}
	}
	return xhrobj;
}