
document.addEventListener('DOMContentLoaded', function () {
    var apiUrl = 'https://paginas-web-cr.com/Api/apis/ListaEstudiantes.php';
    var APIBorrarEstudiante = 'https://paginas-web-cr.com/Api/apis/BorrarEstudiantes.php';
    var APIActualizarEstudiante = 'https://paginas-web-cr.com/Api/apis/ActualizarEstudiantes.php';
    var updateForm = document.getElementById('updateForm');
    var modal = new bootstrap.Modal(document.getElementById('Update'));
    var modalConfirm = new bootstrap.Modal(document.getElementById('Confirm'));
    var table = new Tabulator('#tabla-estudiantes', {

        layout: "fitColumns",
        height: "100%",
        minHeight: 300,
        minWidth: 150,
        rowHeight: 40,
        columnDefaults: {
            width: 200, //set the width on all columns to 200px

        },
        pagination: "local",
        paginationSize: 10,
        paginationCounter: "rows",
    });
    fetch(apiUrl)
        .then(response => response.json())

        .then(data => {

            var columns = [
                { title: "ID", field: "id", visible: false, resizable: false, hozAlign: "center", sorter: "number" },
                {
                    title: "Personal Info",
                    columns: [
                        { title: "Document", field: "cedula", headerFilter: "input", hozAlign: "center", sorter: "string", width: 150 },
                        { title: "Name", field: "nombre", hozAlign: "center", sorter: "string", width: 130 },
                        { title: "Last Name", field: "apellidopaterno", hozAlign: "center", sorter: "string", width: 115 },
                        { title: "Apellido Materno", field: "apellidomaterno", visible: false, hozAlign: "center", sorter: "string" },
                        { title: "Date of Birth", field: "fechanacimiento", visible: false, hozAlign: "center", sorter: "date" },
                        { title: "Gender", field: "sexo", hozAlign: "center", sorter: "string", width: 100 },
                        { title: "Address", field: "direccion", hozAlign: "center", sorter: "string" },
                        { title: "Citizenship", field: "nacionalidad", hozAlign: "center", sorter: "string", width: 120 },
                        { title: "ID Carreras", field: "idCarreras", visible: false, hozAlign: "center", sorter: "number" },

                    ]
                },
                {
                    title: "Work Info",
                    columns: [

                        { title: "Email", field: "correoelectronico", hozAlign: "center", sorter: "string", },
                        { title: "Phone", field: "telefono", hozAlign: "center", sorter: "number", width: 100 },
                        { title: "User", field: "usuario", hozAlign: "center", sorter: "string", width: 100 },
                        { title: "Teléfono Celular", visible: false, field: "telefonocelular", hozAlign: "center", sorter: "number" },
                    ]
                },

                {
                    title: "Actions", field: "accion", formatter: function (cell, formatterParams, onRendered) {
                        return '<button class="btn btn-primary btn-sm btn-edit" ")">Editar</button> <button id="btn-eliminar" class="btn btn-danger btn-sm btn-delete">Eliminar</button>';
                    }, hozAlign: "center", headerSort: false, width: 200
                }

            ];
            table.setColumns(columns);
            table.setData(data.data);
            // Agrega un evento clic al elemento con el ID 'tabla-estudiantes'
            document.getElementById('tabla-estudiantes').addEventListener('click', function (event) {
                // Obtiene el elemento que disparó el evento clic
                var target = event.target;

                // Verifica si el elemento tiene la clase 'btn-delete'
                if (target.classList.contains('btn-delete')) {
                    // Obtiene la fila asociada al botón de eliminación
                    var row = table.getRow(target.closest('.tabulator-row'));

                    // Verifica que la fila existe antes de continuar
                    if (row) {
                        // Llama a la función para eliminar el estudiante con los datos de la fila
                        deleteStudent(row, row.getData());
                    }
                }

                // Verifica si el elemento tiene la clase 'btn-edit'
                if (target.classList.contains('btn-edit')) {
                    // Obtiene la fila asociada al botón de edición
                    var row = table.getRow(target.closest('.tabulator-row'));

                    // Verifica que la fila existe antes de continuar
                    if (row) {
                        // Obtiene los datos de la fila
                        var rowData = row.getData();

                        // Llama a la función para mostrar el modal con los datos de la fila
                        showUpdateModal(rowData);
                    }
                }
            });

            updateForm.addEventListener('submit', function (event) {
                event.preventDefault();
                // Obtiene la fila actualizada desde la tabla
                var row = table.getRows().find(row => row.getData().id === document.getElementById('id').value);
                // Verifica que la fila existe antes de continuar
                if (row) {
                    // Obtiene los datos actualizados del formulario
                    var updatedData = {
                        id: document.getElementById('id').value,
                        cedula: document.getElementById('cedula').value,
                        correoelectronico: document.getElementById('correoelectronico').value,
                        telefono: document.getElementById('telefono').value,
                        telefonocelular: document.getElementById('telefonocelular').value,
                        fechanacimiento: document.getElementById('fechanacimiento').value,
                        sexo: document.getElementById('sexo').value,
                        direccion: document.getElementById('direccion').value,
                        nacionalidad: document.getElementById('nacionalidad').value,
                        nombre: document.getElementById('nombre').value,
                        apellidopaterno: document.getElementById('apellidopaterno').value,
                        apellidomaterno: document.getElementById('apellidomaterno').value,
                        idCarreras: document.getElementById('grupo').value,
                        usuario: document.getElementById('usuario').value,
                    };
                    // Envía los datos al servidor
                    updateStudent(row, updatedData);
                }
            });
        })

        .catch(error => console.error('Error al cargar los datos desde la API', error));

    function deleteStudent(row, rowData) {

        fetch(APIBorrarEstudiante, {
            method: 'POST',
            body: JSON.stringify({ id: rowData.id }),
        })
            .then(response => response.json())
            .then(result => {
                //console.log('Server Response:', result);

                if (result.data) {

                    row.delete();
                    console.log('Estudiante eliminado correctamente');
                    window.location.reload();

                } else {
                    console.log('Error al eliminar el estudiante desde el api');
                }
            })
            .catch(error => console.error('Error en la solicitud de eliminación', error));
    }

    function updateStudent(row, rowData) {
        fetch(APIActualizarEstudiante, {
            method: 'POST',
            body: JSON.stringify(rowData),
        })
            .then(response => response.json())
            .then(result => {

                row.update();
                showConfirmUpdate();
                setTimeout(function () {
                    window.location.reload();
                }, 2000);

                console.log('Estudiante actualizado correctamente');

            })
            .catch(error => console.error('Error en la solicitud de actualización', error));
    }
    // Modifica la función showUpdateModal
    function showUpdateModal(data) {
        document.getElementById('id').value = data.id;
        document.getElementById('cedula').value = data.cedula;
        document.getElementById('correoelectronico').value = data.correoelectronico;
        document.getElementById('telefono').value = data.telefono;
        document.getElementById('telefonocelular').value = data.telefonocelular;
        document.getElementById('fechanacimiento').value = data.fechanacimiento;
        document.getElementById('sexo').value = data.sexo;
        document.getElementById('direccion').value = data.direccion;
        document.getElementById('nacionalidad').value = data.nacionalidad;
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('apellidopaterno').value = data.apellidopaterno;
        document.getElementById('apellidomaterno').value = data.apellidomaterno;
        document.getElementById('grupo').value = data.idCarreras;
        document.getElementById('usuario').value = data.usuario;

        // Abrir el modal
        modal.show();
    }

    function showConfirmUpdate() {
        modal.hide();
        modalConfirm.show();
    }

    document.getElementById("download-json").addEventListener("click", function () {
        table.download("json", "data.json");
    });
    //trigger download of data.pdf file
    document.getElementById("download-pdf").addEventListener("click", function () {
        table.download("pdf", "data.pdf", {
            orientation: "landscape", //set page orientation to portrait
            title: "Example Report", //add title to repor

        });
    });

});



