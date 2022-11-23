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
        getResultadoExitoso(response);
    }
        , datos, tipoDatos, tipo);
    //window.location.href = "/";
}
function getResultadoExitoso(resultado) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "2000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    if (resultado.Success) {
        toastr.success("BIENVENIDO");
    } else {
        toastr.error("Usuario o contraseña incorrectos");
        //
    }
}

//create a function to disable the button when its not valid
function disableButton() {

}

$(document).ready(function () {
    $("#btnLogin").click(function () {

        $('#btnLogin').attr('disabled', true);

        login();
        //getUsuarioExitoso();
    });
});