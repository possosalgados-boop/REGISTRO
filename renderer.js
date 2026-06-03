const btnMatricular = document.getElementById('matricular');
const cuerpoTabla = document.getElementById('cuerpoTabla');

const inputNombre = document.getElementById('nombre');
const inputCuenta = document.getElementById('cuenta');
const inputCarrera = document.getElementById('carrera');
const inputAsignatura = document.getElementById('asignatura');

let estudiantes = [];
let idEditar = null;

function actualizarTabla() {
    cuerpoTabla.innerHTML = '';

    estudiantes.forEach((estudiante, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.cuenta}</td>
            <td>${estudiante.carrera}</td>
            <td>${estudiante.asignatura}</td>
            <td>
                <button onclick="cargarFormulario(${index})">Editar</button>
                <button onclick="eliminarEstudiante(${index})" style="background-color: #ff4d4d; color: white;">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

btnMatricular.addEventListener('click', function() {
    if (!inputNombre.value || !inputCuenta.value || !inputCarrera.value || !inputAsignatura.value) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const datosEstudiante = {
        nombre: inputNombre.value,
        cuenta: inputCuenta.value,
        carrera: inputCarrera.value,
        asignatura: inputAsignatura.value
    };

    if (idEditar !== null) {
        estudiantes[idEditar] = datosEstudiante;
        idEditar = null;
        btnMatricular.innerText = 'Matricular';
    } else {
        estudiantes.push(datosEstudiante);
    }

    limpiarFormulario();
    actualizarTabla();
});

window.cargarFormulario = function(index) {
    const estudiante = estudiantes[index];

    inputNombre.value = estudiante.nombre;
    inputCuenta.value = estudiante.cuenta;
    inputCarrera.value = estudiante.carrera;
    inputAsignatura.value = estudiante.asignatura;

    idEditar = index;
    btnMatricular.innerText = 'Actualizar Registro';
};

window.eliminarEstudiante = function(index) {
    const estudiante = estudiantes[index];
    const longitudAntes = estudiantes.length;
    const confirmacion = confirm(`¿Desea eliminar este registro?\n\nREGISTRO:\nCuenta: ${estudiante.cuenta}\nNombre: ${estudiante.nombre}`);
    
    if (confirmacion) {
        estudiantes.splice(index, 1);
            btnMatricular.innerText = 'Matricular';
            limpiarFormulario();
        } else if (idEditar > index) {
            idEditar--;
        }

        actualizarTabla();
    };

function limpiarFormulario() {
    inputNombre.value = '';
    inputCuenta.value = '';
    inputCarrera.value = '';
    inputAsignatura.value = '';
}