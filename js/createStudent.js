document.addEventListener('DOMContentLoaded', function () {
    const APIInsertarEstudiante = 'https://paginas-web-cr.com/Api/apis/InsertarEstudiantes.php';
    const createForm = document.getElementById('createForm');

    createForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Función para obtener el valor de un elemento por su ID
        const getValueById = (id) => document.getElementById(id).value;

        // Obtener los valores del formulario utilizando desestructuración
        const datosenviar = {
            cedula: getValueById("cedula"),
            correoelectronico: getValueById("correoelectronico"),
            telefono: getValueById("telefono"),
            telefonocelular: getValueById("telefonocelular"),
            fechanacimiento: getValueById("fechanacimiento"),
            sexo: getValueById("sexo"),
            direccion: getValueById("direccion"),
            nombre: getValueById("nombre"),
            apellidopaterno: getValueById("apellidopaterno"),
            apellidomaterno: getValueById("apellidomaterno"),
            nacionalidad: getValueById("nacionalidad"),
            idCarreras: getValueById("grupo"),
            usuario: getValueById("usuario")
        };



        // Función para manejar la respuesta de la API
        const handleApiResponse = (datos) => {
            console.log('Respuesta de la API:', datos);
            window.location.href = "index.html";
        };

        // Función para manejar errores en la solicitud
        const handleApiError = (error) => {
            console.error('Error al enviar los datos a la API:', error);
        };

        // Realizar la solicitud a la API
        fetch(APIInsertarEstudiante, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosenviar),
        })
            .then(response => response.json())
            .then(handleApiResponse)
            .catch(handleApiError);
    });
});