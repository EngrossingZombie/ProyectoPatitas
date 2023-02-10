let $departemento = document.getElementById('departamento')
  let $provincia = document.getElementById('provincia')

  let departamentos = ['Región Metropolitana', 'Región de Valparaíso', 'Región de Coquimbo']
  let provincias = ['Santiago', 'Conchalí', 'Huechuraba', 'Independencia', 'Quilicura', 'Recoleta', 'Renca',
    'Las Condes', 'Lo Barnechea', 'Providencia', 'Vitacura', 'La Reina', 'Macul', 'Peñalolén', 'La Florida',
    'La Granja', 'El Bosque', 'La Cisterna', 'La Pintana', 'San Ramón', 'Lo espejo', 'Pedro Aguirre Cerda',
    'San Joaquín', 'San Miguel', 'Cerrillos', 'Estación Central', 'Maipú', 'Cerro Navia', 'Lo Prado', 'Pudahuel',
    'Puente Alto', 'Quinta Normal', 'Isla de Pascua', 'Los Andes', 'Marga Marga', 'Petorca', 'Quillota',
    'San Antonio', 'San Felipe de Aconcagua', 'Valparaíso', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca',
    'La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paihuano', 'Vicuña', 'Ovalle', 'Combarbalá', 'Monte Patria',
    'Punitaqui', 'Río Hurtado'
  ]

  function mostrarLugares(arreglo, lugar) {
    let elementos = '<option selected disables>--Seleccione--</option>'

    for (let i = 0; i < arreglo.length; i++) {
      elementos += '<option value="' + arreglo[i] + '">' + arreglo[i] + '</option>'
    }

    lugar.innerHTML = elementos
  }

  mostrarLugares(departamentos, $departemento)

  function recortar(array, inicio, fin, lugar) {
    let recortar = array.slice(inicio, fin)
    mostrarLugares(recortar, lugar)
  }

  $departemento.addEventListener('change', function () {
    let valor = $departemento.value

    switch (valor) {
      case 'Región Metropolitana':
        recortar(provincias, 0, 32, $provincia)
        break
      case 'Región de Valparaíso':
        recortar(provincias, 33, 40, $provincia)
        break
      case 'Región de Coquimbo':
        recortar(provincias, 40, 55, $provincia)
        break
    }

    $distrito.innerHTML = ''

    

  });

  console.log('FUNCIONANDO >>>>>> ');