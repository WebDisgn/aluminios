class Usuario {
    constructor(id, nombres, apellidos, correo, direccion, telefono) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    // Método para crear un nuevo usuario
    static crearUsuario(id, nombres, apellidos, correo, direccion, telefono) {
        return new Usuario(id, nombres, apellidos, correo, direccion, telefono);
    }

    // Método estático para obtener datos de la API y llenar la tabla
    static obtenerYMostrarDatos() {
        $.ajax({
            url: 'https://users-17459-default-rtdb.firebaseio.com/usuarios.json',
            method: 'GET',
            dataType: 'json',
            success: function (datosRecuperados) {
                Usuario.llenarTabla(datosRecuperados);

                // Inicializar DataTables después de llenar la tabla
                $('#tablaDatos').DataTable({
                    paging: true,
                    searching: true,
                    ordering: true,
                    autoWidth: false,
                    responsive: true,
                    columnDefs: [
                        { responsivePriority: 1, targets: 0 },
                        { responsivePriority: 2, targets: -1 }
                    ],
                    dom: 'Bfrtip',
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
                });
            },
            error: function (error) {
                console.error('Error al obtener los datos:', error.message);
            }
        });
    }

    // Método para llenar la tabla con los datos
    static llenarTabla(datos) {
        const tabla = document.getElementById('tablaDatos');
        const tbody = tabla.getElementsByTagName('tbody')[0];

        // Limpiar el contenido actual de la tabla
        tbody.innerHTML = '';

        for (const id in datos) {
            const dato = datos[id];
            const fila = `
                <tr>
                    <td>${id}</td>
                    <td>${dato.apellidos}</td>
                    <td>${dato.correo}</td>
                    <td>${dato.direccion.calle_principal}</td>
                    <td>${dato.direccion.calle_secundaria}</td>
                    <td>${dato.nombres}</td>
                    <td>${dato.telefono}</td>
                </tr>
            `;
            tbody.innerHTML += fila;
        }
    }

    // Método para capturar los datos de la fila al hacer clic
    static capturarDatos(id) {
        const fila = document.getElementById(`fila-${id}`);
        const celdas = fila.getElementsByTagName('td');

        const datosCapturados = {
            id: celdas[0].textContent,
            apellidos: celdas[1].textContent,
            correo: celdas[2].textContent,
            calle_principal: celdas[3].textContent,
            calle_secundaria: celdas[4].textContent,
            nombres: celdas[5].textContent,
            telefono: celdas[6].textContent,
        };

        console.log('Datos capturados:', datosCapturados);

        // Puedes hacer lo que necesites con los datos capturados aquí
    }

    // Resto de la clase (otros métodos, etc.)
}

// Llamar al método estático para obtener y mostrar los datos
Usuario.obtenerYMostrarDatos();
