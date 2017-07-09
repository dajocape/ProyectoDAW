var SVG_NS = 'http://www.w3.org/2000/svg';

function supportsSvg() {
    return document.implementation &&
        (
            document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.0') ||
            document.implementation.hasFeature('SVG', '1.0')
        );
}

function getDataFromDefinitionList(linea) { 
  	var hijos = linea.children;
    var fechaIndex = {};
  	var data = [];
  	var fechaActual = null;
    console.log(hijos.length);
  	for (var indiceHijo = 0; indiceHijo < hijos.length; indiceHijo++) {
    	var hijo = hijos[indiceHijo];
    	if (hijo.nodeName == 'DT') {
      		fechaActual = hijo.textContent;
    	} else if (hijo.nodeName == 'DD' && fechaActual !== null) {
      		if (!fechaIndex[fechaActual]) {
        		fechaIndex[fechaActual] = data.length;
        		data.push({
          			fecha: +fechaActual,
          			values: []
        		});
      		}
      		data[fechaIndex[fechaActual]].values.push(hijo.textContent);
    	}
  	}
    return data;
}

function createSvgElement() {
  	var element = document.createElementNS(SVG_NS, 'svg');
  	element.setAttribute('width', '100%');
  	element.setAttribute('height', '250px');
  	element.classList.add('timeline-visualization');
  	return element;
}

function drawTimeline(svgElement, data) {
  	var paper = Snap(svgElement);
    var canvasSize = parseFloat(getComputedStyle(paper.node)["width"]);
    var start = +data[0].fecha;
    var end = +data[data.length - 1].fecha;
    start--;
    end++; 
    end++;
    var range = end - start;
    paper.line(0, 200, canvasSize, 200).attr({
        'stroke': 'black',
        'stroke-width': 2
    });
    data.forEach(function(datum) {
        var x = canvasSize * (datum.fecha - start) / range;
        paper.circle(x, 200, 6);
        paper.text(x, 230, (datum.fecha + "/06")).attr({
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

if (supportsSvg()) {
  	var linea = document.querySelector('#linea');
  	linea.style.display = 'none';
  	var data = getDataFromDefinitionList(linea);
    console.log(data);
  	var svgElement = createSvgElement();
  	linea.parentNode.insertBefore(svgElement, linea);
  	drawTimeline(svgElement, data);
}