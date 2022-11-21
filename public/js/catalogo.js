
/*function getProducts() {
    fetch('http://localhost:3000/catalogo/ObtenerProductos')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.Success) {
                let products = data.Data;
                let template = '';
                products.forEach(product => {
                    template += `
                        <tr>
                            <td>${product.idproducto}</td>
                            <td>${product.nombre}</td>
                            <td>${product.descripcion}</td>
                            <td>${product.precio}</td>
                            <td>${product.cantidad}</td>
                            <td>${product.idtipo}</td>
                            <td>
                                <button class="btn btn-primary btn-sm">Editar</button>
                                <button class="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    `
                });
                document.getElementById('products').innerHTML = template;
            }
        })
}*/




function init() {
    var url = "/catalogo/ObtenerProductos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    console.log(datos);
    solicitudAjax(url, function () {
        $.ajax({
            Success: function (data) {
                console.log(data);
                if (data.Success) {
                    let products = data.Data;
                    let template = '';
                    products.forEach(product => {
                        template += `
                        <tr>
                            <td>${product.idproducto}</td>
                            <td>${product.nombre}</td>
                            <td>${product.descripcion}</td>
                            <td>${product.precio}</td>
                            <td>${product.cantidad}</td>
                            <td>${product.idtipo}</td>
                            <td>
                                <button class="btn btn-primary btn-sm">Editar</button>
                                <button class="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    `
                    });
                    document.getElementById('products').innerHTML = template;
                }
            }
        });

    }, datos, tipoDatos, tipo);
}
//function to show a modal
function showModal() {
    var modal = document.getElementById("modal");
    $('#modal').modal('show');
}



$(document).ready(function () {
    init();
    $('#agregarTipo').click(function () {
        showModal();
    });
});