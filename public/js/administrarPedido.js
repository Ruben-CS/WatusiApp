let _datosProductos;


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
        toastr.success("Consulta exitosa", "Éxito");
        //location.reload();
        //console.log(resultado);
        //mostrarProductos();
    } else {
        toastr.error("Ups.. algo salió mal");
    }
}

function changeStatus(id) {
    console.log(_datosProductos);
    _datosProductos.Data.forEach(function (item) {
        if (item.idpedido == id) {
            var url = "/administrarPedido/ChangeStatus";
            var tipo = 'POST';
            var datos = {
                idpedido: item.idpedido,
                estado: 2,
            };
            var tipoDatos = 'JSON';
            solicitudAjax(url, function (response) {
                //getResultadoExitoso(response);
            }, datos, tipoDatos, tipo);
            console.log(_datosProductos);
            location.reload();
        }
    });
}

function getAllProducts() {
    $.ajax({
        url: "/administrarPedido/ObtenerPedidos",
        type: 'GET',
        //datos: {},
        dataType: 'JSON',
        success: function (data) {
            _datosProductos = data;
            $.each(data.Data, function (i, item) {
                $("#tblProducto").append(
                    `
                        <tr>
                        <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>${item.idpedido}</p></div></td>

                            <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>${item.fechasolicitud}</p></div></td>

                            <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>${'Bs.' + item.precioenvio}</p></div></td>
                            
                            <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm><div class='class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>${'Bs. ' + item.preciototal}</p></div></td>

                            ${item.estado == 2 ? `<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <span class='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class='relative'>Aceptado</span>
                            </span>
                            </td>`: `<td class='px-5 py-5 bg-white text-sm'>
                            <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span aria-hidden class='absolute inset-0 bg-red-200 opacity-50 rounded-full'></span>
                            <span class="relative">Pendiente</span>
                             </span>`}
                            
                             <td class=' py-5 border-b border-gray-200 bg-white text-sm'><div class='ml-3'><p class='text-gray-900 whitespace-no-wrap'>
                            <button id='btnCambiarEstado' class='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800' onclick='changeStatus(${item.idpedido})'>status</button>
                            </p></div></td>

                        </tr >`);

                _datosProductos = data;
                //$("#tblProducto>tbody").append(row);
                //console.log(_datosProductos.Data.nombre);
            });
            console.log(_datosProductos);
        }
    });
}



$(document).ready(function () {
    getAllProducts();

    $("#btnGenerarReporte").click(function () {
        //show a pdf report
        var doc = new jsPDF();

        $.each(_datosProductos.Data, function (i, item) {
            doc.text(20, 20, 'ID Pedido: ' + item.idpedido);
            doc.text(20, 30, 'Fecha Solicitud: ' + item.fechasolicitud);
            doc.text(20, 40, 'Precio Envio: ' + item.precioenvio);
            doc.text(20, 50, 'Precio Total: ' + item.preciototal);
            item.estado == 2 ? doc.text(20, 60, 'Estado: Aceptado') : doc.text(20, 60, 'Estado: Pendiente');
            doc.text(20, 70, '---------------------------------------------------------------------------');
            //add a break point
            doc.addPage();
        });

        doc.save('Reporte.pdf');
    });
});
