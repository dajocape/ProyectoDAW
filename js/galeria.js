var ancho, lista, estilo;

function establecerAltura(){
	lista = document.getElementsByClassName("imagen");
	for(var i = 0; i < lista.length; i++){
		estilo = window.getComputedStyle(lista[i]);
		ancho = estilo.getPropertyValue("width");
		lista[i].style.heigth = ancho;
		window.alert("elemento: "+i+"altura: " + lista[i].style.heigth+ "ancho: "+ancho);
	}
}

window.onload = function() {
	establecerAltura();
};