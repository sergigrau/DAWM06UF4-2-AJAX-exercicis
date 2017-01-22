/**
 * Funcions per a realitzar crides AJAX i processar les dades XML rebudes
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 06.12.2015
 * format del document UTF-8
 * 
 * CHANGELOG
 * 06.12.2015
 * -Creació de les funcions per realitzar crides AJAX
 * 
 * NOTES
 * ORIGEN
 * Funcions per a resoldre l'exercici 5 de les pràctiques de DAW2. Jesuïtes del Clot
 */

/*
 * Utilitzem tècniques de codi discret (unobtrubsive).
 */

window.onload = function () {
	document.getElementById('entrada').onkeyup = ajax;
};
/*
 * funció que realitza les crides AJAX
 */
function ajax(){

	xhr=creaObjecteXHR();
    xhr.onreadystatechange = callback;
	xhr.open("GET", "Exercici6.php?caracter="+document.getElementById('entrada').value);
    xhr.send(null);	
}
/*
 * funció callback
 */
function callback(){
	if (xhr.readyState == 4) {
		document.getElementById('resultats').style.color = '#F00';
		var xmlDoc = xhr.responseXML.documentElement;
		var decimal = xmlDoc.getElementsByTagName('decimal')[0].firstChild.data;
		var binari = xmlDoc.getElementsByTagName('binari')[0].firstChild.data;
		var hexadecimal = xmlDoc.getElementsByTagName('hexadecimal')[0].firstChild.data;
		var octal = xmlDoc.getElementsByTagName('octal')[0].firstChild.data;
		document.getElementById("resultats").innerHTML =decimal+" "+binari+" "+hexadecimal+" "+octal;
	}	
}
/*
 * funció que crear i retorna l'objecte XHR o el component ActiveX d'IE
 */
 function creaObjecteXHR(){
	var xhrobj;
	try {
		xhrobj = new XMLHttpRequest;
	}
	catch(e) {
		var msxml = ['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'];
		for (var i=0, len = msxml.length; i < len; ++i) {
			try {
				xhrobj = new ActiveXObject(msxml[i]);
			break;
			}
			catch(e) {
				onAjaxError(1,'Error al crear el XHR',e);
			}
		}
	}
	return xhrobj;	
}
 