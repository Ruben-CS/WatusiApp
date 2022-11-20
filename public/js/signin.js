var _datosUsuario;
function login() {
    var url = "/signin/Login";
    var tipo = 'POST';
    var datos = {
        name: $("#name").val(),
        password: $("#password").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) {
        //loginExitoso(response);

    }
        , datos, tipoDatos, tipo);
    window.location.href = "/";
}
/*loginExitoso = function (response) {
    if (respuesta.Success) {
        toastr.success("Bienvenido");

        window.location.href = "/";
    } else {
        toastr.error("response.Mensaje");
    }
}*/


//function to login user


/*function loginExitoso(respuesta) {
    if (respuesta.Success) {
        window.location.href = "/index";
    } else {
        toastr.error(respuesta.Mensaje);
    }
}}*/

//consume a get method to login user


$(document).ready(function () {
    $("#btnLogin").click(function () {
        login();
        //getUsuarioExitoso();
    });
});