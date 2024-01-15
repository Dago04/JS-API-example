
document.addEventListener('DOMContentLoaded', function () {


    var apiUrl = 'https://paginas-web-cr.com/Api/apis/ListaEstudiantes.php';
    var APIBorrarEstudiante = 'https://paginas-web-cr.com/Api/apis/BorrarEstudiantes.php'


    var table = new Tabulator('#tabla-estudiantes', {

        layout: "fitColumns",
        height: "100%",
        minHeight: 300,
        minWidth: 150,
        rowHeight: 40,
        columnDefaults: {
            width: 200, //set the width on all columns to 200px

        },
        cellPadding: 8,  // Ajusta el espaciado interno de las celdas
        cellMargin: 4,

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
                    title: "Actions", field: "accion", formatter: function () {
                        return '<button class="btn btn-primary btn-sm btn-edit">Editar</button> <button id="btn-eliminar" class="btn btn-danger btn-sm btn-delete">Eliminar</button>';
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



