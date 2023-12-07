// Función para hacer una solicitud GET y recuperar datos
async function obtenerDatos() {
    try {
        const response = await fetch('https://users-17459-default-rtdb.firebaseio.com/usuarios.json');

        if (!response.ok) {
            throw new Error('No se pudo obtener los datos');
        }

        const datosRecuperados = await response.json();

        // Llenar la tabla con los datos recuperados
        llenarTabla(datosRecuperados);
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

// Función para llenar la tabla con los datos
function llenarTabla(datos) {
    const tabla = document.getElementById('tablaDatos');
    const tbody = tabla.getElementsByTagName('tbody')[0];

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

// Llamar a la función para obtener y mostrar los datos
obtenerDatos();
