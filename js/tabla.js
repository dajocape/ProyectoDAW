function llenarTabla(){
	$.ajax({
		url:'json/datos.json',
		data:{format:'json'},
		error:function(){window.alert('No se pudo cargar el json');},
		dataType:'jsonp',
		success:function(data){
			var $fila, $cabecera, $elemento, $fecha, $objeto, $lugar, $link, $cont;
			$cabecera = $('<thead>');
			$fila = $('<tr>');
			$elemento = $('<td>').text('Fecha');
			$fila.append($elemento);
			$elemento = $('<td>').text('Objeto');
			$fila.append($elemento);
			$elemento = $('<td>').text('Lugar');
			$fila.append($elemento);
			$elemento = $('<td>').text('Detalles');
			$fila.append($elemento);
			$cabecera.append($fila);
			$('#tabla').append($cabecera);
			$.each(data, function(){
				$fila = $('<tr>');
				$fecha = $('<td>').text(data.fecha);
				if(data.objeto.lenght > 1){
					for(var i = 0; i < data.objeto.lenght; i++){
						$objeto = $('<td>').text(data.objeto[i]);
						$lugar = $('<td>').text(data.lugar[i]);
						$cont = $('<td>');
						$link = $('<a>');
						$link.text('Ver detalles');
						$link.setAttribute('href',data.link[i]);
						$cont.append($link);
						$fila.append($fecha);
						$fila.append($objeto);
						$fila.append($lugar);
						$fila.append($cont);
						$('#tabla').append($fila);
					}
				} else {
					$objeto = $('<td>').text(data.objeto[0]);
					$lugar = $('<td>').text(data.lugar[0]);
					$cont = $('<td>');
					$link = $('<a>');
					$link.text('Ver detalles');
					$link.setAttribute('href',data.link[0]);
					$cont.append($link);
					$fila.append($fecha);
					$fila.append($objeto);
					$fila.append($lugar);
					$fila.append($cont);
					$('#tabla').append($fila);
				}
			});
		},
		type:'GET'
	});
}

window.onload = function(){
	llenarTabla();
}