﻿var SVG_NS = 'http://www.w3.org/2000/svg';

function supportsSvg() {
    return document.implementation &&
        (
            document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.0') ||
            document.implementation.hasFeature('SVG', '1.0')
        );
}

function getDataFromDefinitionList(linea) { 
  	var children = linea.children;
  	var yearIndex = {};
  	var data = [];
  	var currentYear = null;
  	for (var childIndex = 0; childIndex < children.length; childIndex++) {
    	var child = children[childIndex];
    	if (child.nodeName == 'DT') {
      		currentYear = child.textContent;
    	} else if (child.nodeName == 'DD' && currentYear !== null) {
      		if (!yearIndex[currentYear]) {
        		yearIndex[currentYear] = data.length;
        		data.push({
          			year: +currentYear,
          			values: []
        		});
      		}
      		data[yearIndex[currentYear]].values.push(child.textContent);
    	}
  	}
  	return data;
}

function createSvgElement() {
  	var element = document.createElementNS(SVG_NS, 'svg');
  	element.setAttribute('width', '100%');
  	element.setAttribute('height', '250px');
  	// Improvement... 
  	// you should set a viewBox so that when the page scales 
  	// the whole timeline is still viewable.
  	element.classList.add('timeline-visualization');
  	return element;
}

function drawTimeline(svgElement, data) {
  	var paper = Snap(svgElement);
  	var canvasSize = parseFloat(getComputedStyle(paper.node)["width"]);
  	var start = +data[0].year;
  	var end = +data[data.length - 1].year;
  	// add some padding
  	start--;
  	end++; end++;
  	var range = end - start;
  	paper.line(0, 200, canvasSize, 200).attr({
    	'stroke': 'black',
    	'stroke-width': 2
  	});
  	data.forEach(function(datum) {
    	var x = canvasSize * (datum.year - start) / range;
    	paper.circle(x, 200, 6);
    	paper.text(x, 230, datum.year).attr({
      		'text-anchor': 'middle'
    	});    
    	var averageIndex = (datum.values.length - 1) / 2;
    	var xOffsetSize = 24;
    	datum.values.forEach(function(value, index) {
      		var offset = (index - averageIndex) * xOffsetSize;
            paper.text(x + offset, 180, value).attr({
          		'text-anchor': 'start'
        	})
        	.transform('r -45 ' + (x + offset) + ' 180');
    	});
  	});
}

function cargarLineaTiempo(){
	if (supportsSvg()) {
	  	var linea = document.querySelector('#linea');
	  	linea.style.display = 'none';
	  	var data = getDataFromDefinitionList(linea);
	  	var svgElement = createSvgElement();
	  	linea.parentNode.insertBefore(svgElement, linea);
	  	drawTimeline(svgElement, data);
	}
}

function llenarTabla(){
	$.ajax({
		url:'json/datos.json',
		data:{format:'Json'},
		error:function(){
	        alert("No se pudo cargar el archivo JSON");
	    },
		dataType:'Json',
		success:function(data){
			var $fila, $cabecera, $elemento, $fecha, $objeto, $lugar, $link, $cont;
			$cabecera = $('<thead>');
			$fila = $('<tr>');
			$elemento = $('<th>').text('Fecha');
			$fila.append($elemento);
			$elemento = $('<th>').text('Objeto');
			$fila.append($elemento);
			$elemento = $('<th>').text('Lugar');
			$fila.append($elemento);
			$elemento = $('<th>').text('Detalles');
			$fila.append($elemento);
			$cabecera.append($fila);
			$('#tabla').append($cabecera);
			$.each(data, function(){
				for(var i = 0; i < this.objeto.length; i++){
					$fila = $('<tr>');
					$fecha = $('<td>').text(this.fecha);
					$objeto = $('<td>').text(this.objeto[i]);
					$lugar = $('<td>').text(this.lugar[i]);
					$cont = $('<td>');
					$link = $('<a>');
					$link.text('Ver detalles');
					$link.attr('href',this.link[i]);
					$cont.append($link);
					$fila.append($fecha);
					$fila.append($objeto);
					$fila.append($lugar);
					$fila.append($cont);
					$('#tabla').append($fila);
				}
			});
		},
		type:'GET',
	});
}

window.onload = function(){
	llenarTabla();
}