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