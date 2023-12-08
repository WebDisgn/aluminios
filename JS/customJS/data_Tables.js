$(document).ready(function() {
  var tabla = $('#tablaDatos').DataTable({
    paging: true,
    searching: true,
    ordering: true,
    autoWidth: false, // Deshabilita el ajuste automático del ancho de las columnas
    responsive: true, // Habilita la responsividad de las columnas
    columnDefs: [
      { responsivePriority: 1, targets: 0 }, // Prioriza la primera columna en la responsividad
      { responsivePriority: 2, targets: -1 } // Prioriza la última columna en la responsividad
    ],
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  });

  $('#tablaDatos tbody').on('click', 'tr', function() {
    if ($(this).hasClass('resaltada')) {
      $(this).removeClass('resaltada');
    } else {
      tabla.$('tr.resaltada').removeClass('resaltada');
      $(this).addClass('resaltada');
      var rowData = tabla.row(this).data();
      //$('#datos').text(JSON.stringify(rowData));
      //$("#desc").val(rowData[1]); 
    }
  });
});
