var getLista = function () {
    var url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('Personas')/items";
        //?$filter=Nombre eq 'Luis' and edad lt 40";
    $.ajax({
        url: url,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function (res) {
            var html = "<ul>";
            $.each(res.d.results, function (i, result) {
                html += "<li>" + result.Nombre + " " + result.Edad + "</li>";
            });
            html += "</ul>";
            $("#lista").html(html);

        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });

}
var guardarItem = function () {
    var url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('Personas')/items";
    var digest = $("#__REQUESTDIGEST").val();

    var obj = {
        '__metadata': { 'type': 'SP.Data.PersonasListItem' },
        'Nombre': $("#input-nombre").val(),
        'Edad': parseInt($("#input-edad").val())
    };

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(obj),
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest':digest
        },
        success: function () {
            getLista();
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });

}

$(document).ready(function () {
    
    $("#button-add").click(guardarItem);
    getLista();

});